'use client';

import { cn } from '@taksu/ui/lib/utils';
import { useState } from 'react';
import type { PostTopic } from '@/content/blog/types';
import { Link } from '@/i18n/navigation';

export interface PostListItem {
  slug: string;
  title: string;
  summary: string;
  date: string;
  dateLabel: string;
  readingTime: string;
  topic: PostTopic;
}

/** The post list with topic filters. Every post is in the server HTML; filters only hide rows. */
export function PostList({
  items,
  topics,
  labels,
}: {
  items: PostListItem[];
  topics: { id: PostTopic; label: string }[];
  labels: { all: string; filter: string };
}) {
  const [topic, setTopic] = useState<PostTopic | null>(null);
  const shown = topic ? items.filter((item) => item.topic === topic) : items;
  const label = new Map(topics.map((entry) => [entry.id, entry.label]));
  const chip = (active: boolean) =>
    cn(
      'h-9 rounded-full border px-4 text-sm font-medium transition-colors',
      active
        ? 'border-primary bg-primary text-primary-foreground'
        : 'border-border hover:border-foreground/40',
    );

  return (
    <>
      <fieldset aria-label={labels.filter} className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={topic === null}
          className={chip(topic === null)}
          onClick={() => setTopic(null)}
        >
          {labels.all}
        </button>
        {topics.map((entry) => (
          <button
            key={entry.id}
            type="button"
            aria-pressed={topic === entry.id}
            className={chip(topic === entry.id)}
            onClick={() => setTopic(entry.id)}
          >
            {entry.label}
          </button>
        ))}
      </fieldset>
      <ol className="border-border mt-8 border-t">
        {shown.map((item) => (
          <li key={item.slug} className="border-border border-b">
            <article className="grid gap-2 py-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10">
              <p className="text-muted-foreground text-[0.9375rem]">
                <time dateTime={item.date}>{item.dateLabel}</time>
              </p>
              <div>
                <p className="text-muted-foreground text-sm font-semibold">
                  {label.get(item.topic)}
                </p>
                <h2 className="mt-1 text-2xl leading-snug font-semibold">
                  <Link
                    href={`/blog/${item.slug}`}
                    className="decoration-accent decoration-2 underline-offset-4 hover:underline"
                  >
                    {item.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mt-2 max-w-[62ch] text-lg leading-relaxed">
                  {item.summary}
                </p>
                <p className="text-muted-foreground mt-3 text-sm">{item.readingTime}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </>
  );
}
