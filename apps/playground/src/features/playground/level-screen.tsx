'use client';

import { Button } from '@taksu/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@taksu/ui/components/dialog';
import { Play, RotateCcw, Square, Undo2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useLocale, useMessages, useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import type { CompileResult } from '../blocks/compile';
import type { WorkspaceApi } from '../blocks/blockly-workspace';
import { runProgram } from '../sim/run';
import type { Level, Outcome, Program } from '../sim/types';
import { usePlayback } from '../stage/playback';
import { Stage } from '../stage/stage';
import { CodePanel } from './code-panel';

const BlocklyWorkspace = dynamic(() => import('../blocks/blockly-workspace'), {
  ssr: false,
  loading: () => <div aria-busy className="bg-surface-muted h-full w-full animate-pulse" />,
});

export function LevelScreen({
  level,
  track,
  hasNext,
  onSolved,
  onNext,
}: {
  level: Level;
  track: 'sd' | 'smp';
  hasNext: boolean;
  onSolved: () => void;
  onNext: () => void;
}) {
  const t = useTranslations('Playground');
  const levelText = useTranslations('Levels');
  const locale = useLocale();
  const messages = useMessages();
  const { resolvedTheme } = useTheme();
  const apiRef = useRef<WorkspaceApi | null>(null);
  const playback = usePlayback(level);
  const [program, setProgram] = useState<Program | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const handleProgramChange = (result: CompileResult) => {
    setProgram(result.ok && result.program.body.length > 0 ? result.program : null);
  };

  const run = () => {
    const compiled = apiRef.current?.compile();
    if (!compiled) return;
    if (!compiled.ok) {
      setError(t('errors.noStart'));
      return;
    }
    setError(null);
    playback.play(runProgram(compiled.program, level), {
      onEvent: (event) => apiRef.current?.highlight(event.blockId ?? null),
      onDone: (result) => {
        apiRef.current?.highlight(null);
        if (result === 'success') onSolved();
        setOutcome(result);
      },
    });
  };

  return (
    <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:p-6">
      <section className="border-border order-2 h-[62vh] min-h-[26rem] overflow-hidden rounded-xl border lg:order-1 lg:h-[calc(100dvh-8.5rem)]">
        <BlocklyWorkspace
          locale={locale}
          dark={resolvedTheme === 'dark'}
          messages={messages.Blocks}
          storageKey={`taksu-playground:${level.id}`}
          starter={level.starter}
          apiRef={apiRef}
          onProgramChange={handleProgramChange}
          label={t('workspaceLabel')}
        />
      </section>

      <section className="order-1 flex flex-col gap-4 lg:order-2 lg:max-h-[calc(100dvh-8.5rem)] lg:overflow-y-auto [&>*]:shrink-0">
        <div>
          <h2 className="text-2xl font-semibold [font-stretch:90%]">
            {levelText(`${level.id}.title`)}
          </h2>
          <p className="mt-1">
            <span className="font-semibold">{t('goal')}: </span>
            {levelText(`${level.id}.goal`)}
          </p>
          <details className="text-muted-foreground mt-2 text-sm">
            <summary className="text-foreground cursor-pointer font-semibold">{t('hint')}</summary>
            <p className="mt-1">{levelText(`${level.id}.hint`)}</p>
          </details>
        </div>

        <Stage level={level} visual={playback.visual} label={t('stageLabel')} />

        <ul className="text-muted-foreground flex flex-wrap gap-x-5 gap-y-1 text-xs">
          <li>{t('legend.robot')}</li>
          {level.line.length > 0 ? <li className="text-[#2f7fb0]">{t('legend.water')}</li> : null}
          {level.obstacles.length > 0 ? <li>{t('legend.duck')}</li> : null}
          <li className="text-[#8b5a2b] dark:text-[#d9a55a]">{t('legend.jineng')}</li>
        </ul>

        <div className="flex flex-wrap gap-2">
          {playback.running ? (
            <Button size="lg" onClick={playback.stop}>
              <Square aria-hidden />
              {t('stop')}
            </Button>
          ) : (
            <Button size="lg" onClick={run}>
              <Play aria-hidden />
              {t('run')}
            </Button>
          )}
          <Button size="lg" variant="outline" onClick={playback.reset} disabled={playback.running}>
            <RotateCcw aria-hidden />
            {t('reset')}
          </Button>
          <Button
            size="lg"
            variant="ghost"
            disabled={playback.running}
            onClick={() => {
              apiRef.current?.restoreStarter();
              playback.reset();
            }}
          >
            <Undo2 aria-hidden />
            {t('restoreStarter')}
          </Button>
        </div>
        {error ? (
          <p role="alert" className="text-danger text-sm font-semibold">
            {error}
          </p>
        ) : null}

        <CodePanel program={program} track={track} />
      </section>

      <Dialog open={outcome !== null} onOpenChange={(open) => !open && setOutcome(null)}>
        {outcome ? (
          <DialogContent closeLabel={t('close')}>
            <DialogHeader>
              <DialogTitle>{t(`results.${outcome}.title`)}</DialogTitle>
              <DialogDescription>{t(`results.${outcome}.body`)}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {outcome === 'success' && hasNext ? (
                <Button
                  onClick={() => {
                    setOutcome(null);
                    onNext();
                  }}
                >
                  {t('nextLevel')}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setOutcome(null);
                    playback.reset();
                  }}
                >
                  {outcome === 'success' ? t('close') : t('tryAgain')}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
}
