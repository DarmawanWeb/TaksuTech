/**
 * Rule-based Latin → Aksara Bali transliteration.
 *
 * Built for names and short phrases shown on kiosks and signage previews. It follows
 * common modern orthography (adeg-adeg for clusters, cecek/surang/bisah for final
 * ng/r/h, glides between vowels) but it is not a dictionary-aware converter:
 * official signage should still be reviewed by a Balinese language expert.
 *
 * Pronunciation hint: plain `e` is read as pepet (ə, as in "Ketut"); write `é` for
 * the taling sound (é, as in "Madé"). A small lexicon covers common names.
 */

type Vowel = 'a' | 'i' | 'u' | 'e' | 'E' | 'o';
type Consonant =
  | 'h'
  | 'n'
  | 'c'
  | 'r'
  | 'k'
  | 'd'
  | 't'
  | 's'
  | 'w'
  | 'l'
  | 'm'
  | 'g'
  | 'b'
  | 'ng'
  | 'p'
  | 'j'
  | 'y'
  | 'ny';
type Token = { kind: 'vowel'; value: Vowel } | { kind: 'consonant'; value: Consonant };

const CONSONANTS: Record<Consonant, string> = {
  h: '\u1B33',
  n: '\u1B26',
  c: '\u1B18',
  r: '\u1B2D',
  k: '\u1B13',
  d: '\u1B24',
  t: '\u1B22',
  s: '\u1B32',
  w: '\u1B2F',
  l: '\u1B2E',
  m: '\u1B2B',
  g: '\u1B15',
  b: '\u1B29',
  ng: '\u1B17',
  p: '\u1B27',
  j: '\u1B1A',
  y: '\u1B2C',
  ny: '\u1B1C',
};

/** Dependent vowel signs (sandhangan suara). `a` is inherent. */
const VOWEL_SIGNS: Record<Vowel, string> = {
  a: '',
  i: '\u1B36', // ulu
  u: '\u1B38', // suku
  e: '\u1B42', // pepet
  E: '\u1B3E', // taling
  o: '\u1B40', // taling tedung
};

/** Word-initial vowels (aksara suara). Pepet has no independent letter, so it rides on ha. */
const INDEPENDENT_VOWELS: Record<Vowel, string> = {
  a: '\u1B05',
  i: '\u1B07',
  u: '\u1B09',
  e: '\u1B33\u1B42',
  E: '\u1B0F',
  o: '\u1B11',
};

const ADEG_ADEG = '\u1B44';
const CECEK = '\u1B02';
const SURANG = '\u1B03';
const BISAH = '\u1B04';
const CARIK = '\u1B5E';
const CARIK_PARERAN = '\u1B5F';
const BALINESE_DIGIT_ZERO = 0x1b50;

/** Words whose `e` is taling. Keys are lowercase, values use `E` for taling. */
const LEXICON: Record<string, string> = {
  made: 'madE',
  gede: 'gedE',
  kadek: 'kadEk',
  desak: 'dEsak',
  dewa: 'dEwa',
  dewi: 'dEwi',
  desa: 'dEsa',
  eka: 'Eka',
  denpasar: 'dEnpasar',
  tech: 'tEk',
  demo: 'dEmo',
};

/** Spelling rewrites applied before tokenizing (loanwords and old Indonesian spelling). */
const REWRITES: ReadonlyArray<readonly [RegExp, string]> = [
  [/oe/g, 'u'],
  [/dj/g, 'j'],
  [/tj/g, 'c'],
  [/kh/g, 'k'],
  [/dh/g, 'd'],
  [/th/g, 't'],
  [/ph/g, 'p'],
  [/ch/g, 'c'],
  [/sh|sy/g, 's'],
  [/x/g, 'ks'],
  [/f/g, 'p'],
  [/v/g, 'w'],
  [/z/g, 'j'],
  [/q/g, 'k'],
];

const VOWELS = new Set<string>(['a', 'i', 'u', 'e', 'E', 'o']);
const DIGRAPHS = new Set<string>(['ng', 'ny']);

function normalizeWord(raw: string): string {
  const lower = raw.toLowerCase();
  const lexical = LEXICON[lower];
  if (lexical) return lexical;

  const withTaling = lower.replace(/[éèê]/g, 'E');
  const plain = withTaling.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return REWRITES.reduce(
    (word, [pattern, replacement]) => word.replace(pattern, replacement),
    plain,
  );
}

function tokenize(word: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;
  while (index < word.length) {
    const pair = word.slice(index, index + 2);
    const char = word.charAt(index);
    if (DIGRAPHS.has(pair)) {
      tokens.push({ kind: 'consonant', value: pair as Consonant });
      index += 2;
    } else if (VOWELS.has(char)) {
      tokens.push({ kind: 'vowel', value: char as Vowel });
      index += 1;
    } else if (char in CONSONANTS) {
      tokens.push({ kind: 'consonant', value: char as Consonant });
      index += 1;
    } else {
      index += 1; // drop characters the script cannot represent
    }
  }
  return tokens;
}

function syllableFinal(consonant: Consonant): string {
  if (consonant === 'ng') return CECEK;
  if (consonant === 'r') return SURANG;
  if (consonant === 'h') return BISAH;
  return CONSONANTS[consonant] + ADEG_ADEG;
}

/** Glide used when a vowel directly follows another vowel (e.g. "ia" → i-ya). */
function hiatusCarrier(previous: Vowel): string {
  if (previous === 'i' || previous === 'E') return CONSONANTS.y;
  if (previous === 'u' || previous === 'o') return CONSONANTS.w;
  return CONSONANTS.h;
}

function transliterateWord(raw: string): string {
  const tokens = tokenize(normalizeWord(raw));
  let output = '';
  let previousVowel: Vowel | null = null;

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (!token) continue;

    if (token.kind === 'consonant') {
      const next = tokens[index + 1];
      if (next?.kind === 'vowel') {
        output += CONSONANTS[token.value] + VOWEL_SIGNS[next.value];
        previousVowel = next.value;
        index += 1;
      } else {
        output += syllableFinal(token.value);
        previousVowel = null;
      }
      continue;
    }

    output +=
      previousVowel === null && index === 0
        ? INDEPENDENT_VOWELS[token.value]
        : hiatusCarrier(previousVowel ?? 'a') + VOWEL_SIGNS[token.value];
    previousVowel = token.value;
  }

  return output;
}

export function toBalineseDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (digit) =>
    String.fromCharCode(BALINESE_DIGIT_ZERO + Number(digit)),
  );
}

/**
 * Transliterates Latin text into Aksara Bali. Words keep their spaces for legibility,
 * digits become Balinese numerals, and `,` / `.` become carik / carik pareren.
 */
export function transliterate(text: string): string {
  return text
    .split(/(\s+|[,.!?;:]|\d+)/)
    .filter((part) => part.length > 0)
    .map((part) => {
      if (/^\s+$/.test(part)) return ' ';
      if (/^\d+$/.test(part)) return toBalineseDigits(part);
      if (part === ',' || part === ';' || part === ':') return CARIK;
      if (part === '.' || part === '!' || part === '?') return CARIK_PARERAN;
      return transliterateWord(part);
    })
    .join('')
    .trim();
}

/** True when the string contains at least one character from the Balinese Unicode block. */
export function containsAksara(text: string): boolean {
  return /[\u1B00-\u1B7F]/.test(text);
}
