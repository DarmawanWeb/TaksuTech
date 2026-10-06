import { Suspense } from 'react';
import { Playground } from '@/features/playground/playground';
import { resolveLocale } from '@/lib/locale';

export default async function PlaygroundPage({ params }: { params: Promise<{ locale: string }> }) {
  await resolveLocale(params);
  return (
    <Suspense fallback={<div aria-busy className="min-h-dvh" />}>
      <Playground />
    </Suspense>
  );
}
