'use client';

import { Button } from '@taksu/ui/components/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@taksu/ui/components/tabs';
import { Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { toCpp, toPython } from '../codegen/codegen';
import type { Program } from '../sim/types';

function CodeBlock({ code }: { code: string }) {
  const t = useTranslations('Playground.code');
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative">
      <pre className="bg-ink text-ink-foreground max-h-80 overflow-auto rounded-lg p-4 text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
      <Button
        size="sm"
        variant="secondary"
        className="absolute top-2 right-2"
        onClick={() => {
          void navigator.clipboard?.writeText(code).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
          });
        }}
      >
        {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
        {copied ? t('copied') : t('copy')}
      </Button>
    </div>
  );
}

export function CodePanel({ program, track }: { program: Program | null; track: 'sd' | 'smp' }) {
  const t = useTranslations('Playground.code');
  const cpp = useMemo(() => (program ? toCpp(program) : ''), [program]);
  const python = useMemo(() => (program ? toPython(program) : ''), [program]);

  return (
    <section
      aria-labelledby="code-title"
      className="border-border bg-surface rounded-xl border p-4"
    >
      <h2 id="code-title" className="mb-3 font-semibold">
        {t('title')}
      </h2>
      <Tabs defaultValue={track === 'smp' ? 'cpp' : 'blocks'}>
        <TabsList>
          <TabsTrigger value="blocks">{t('blocks')}</TabsTrigger>
          <TabsTrigger value="cpp">{t('cpp')}</TabsTrigger>
          <TabsTrigger value="python">{t('python')}</TabsTrigger>
        </TabsList>
        <TabsContent value="blocks" className="text-muted-foreground pt-3 text-sm">
          {t('blocksNote')}
        </TabsContent>
        <TabsContent value="cpp" className="pt-3">
          {program ? (
            <CodeBlock code={cpp} />
          ) : (
            <p className="text-muted-foreground text-sm">{t('empty')}</p>
          )}
        </TabsContent>
        <TabsContent value="python" className="pt-3">
          {program ? (
            <CodeBlock code={python} />
          ) : (
            <p className="text-muted-foreground text-sm">{t('empty')}</p>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
