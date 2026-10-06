import { describe, expect, it } from 'vitest';
import { containsAksara, toBalineseDigits, transliterate } from './aksara';

describe('transliterate', () => {
  it('writes clusters with adeg-adeg so the font can stack them (gantungan)', () => {
    expect(transliterate('taksu')).toBe('\u1B22\u1B13\u1B44\u1B32\u1B38');
  });

  it('handles open syllables and vowel signs', () => {
    expect(transliterate('Bali')).toBe('\u1B29\u1B2E\u1B36');
    expect(transliterate('Nyoman')).toBe('\u1B1C\u1B40\u1B2B\u1B26\u1B44');
  });

  it('uses surang for final r and independent vowels at the start of a word', () => {
    expect(transliterate('Agus Darmawan')).toBe(
      '\u1B05\u1B15\u1B38\u1B32\u1B44 \u1B24\u1B03\u1B2B\u1B2F\u1B26\u1B44',
    );
  });

  it('uses cecek for final ng and pepet for plain e', () => {
    expect(transliterate('rahajeng')).toBe('\u1B2D\u1B33\u1B1A\u1B42\u1B02');
    expect(transliterate('Ketut')).toBe('\u1B13\u1B42\u1B22\u1B38\u1B22\u1B44');
  });

  it('reads é and lexicon names with taling', () => {
    expect(transliterate('Made')).toBe('\u1B2B\u1B24\u1B3E');
    expect(transliterate('médé')).toBe('\u1B2B\u1B3E\u1B24\u1B3E');
  });

  it('inserts a glide between vowels', () => {
    expect(transliterate('ia')).toBe('\u1B07\u1B2C');
  });

  it('converts digits and punctuation', () => {
    expect(transliterate('Bali 2026.')).toBe('\u1B29\u1B2E\u1B36 \u1B52\u1B50\u1B52\u1B56\u1B5F');
  });

  it('ignores characters the script cannot represent', () => {
    expect(transliterate('  ')).toBe('');
    expect(transliterate('@#')).toBe('');
  });
});

describe('digits', () => {
  it('maps every Arabic digit to the Balinese block', () => {
    expect(toBalineseDigits(1234567890)).toBe(
      '\u1B51\u1B52\u1B53\u1B54\u1B55\u1B56\u1B57\u1B58\u1B59\u1B50',
    );
    expect(toBalineseDigits('A-007')).toBe('A-\u1B50\u1B50\u1B57');
  });
});

describe('containsAksara', () => {
  it('detects Balinese characters', () => {
    expect(containsAksara(transliterate('taksu'))).toBe(true);
    expect(containsAksara('taksu')).toBe(false);
  });
});
