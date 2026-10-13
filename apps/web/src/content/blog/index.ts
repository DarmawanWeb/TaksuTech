import type { Locale } from '@taksu/content';
import type { MDXContent } from 'mdx/types';
import * as aksaraEn from './aksara-di-layar/en.mdx';
import * as aksaraId from './aksara-di-layar/id.mdx';
import * as floorEn from './lantai-kelas/en.mdx';
import * as floorId from './lantai-kelas/id.mdx';
import * as kkaEn from './robot-di-mapel-kka/en.mdx';
import * as kkaId from './robot-di-mapel-kka/id.mdx';
import * as busyEn from './saat-server-sibuk/en.mdx';
import * as busyId from './saat-server-sibuk/id.mdx';
import * as simulatorEn from './simulator-dulu/en.mdx';
import * as simulatorId from './simulator-dulu/id.mdx';
import type { PostMeta, PostTopic } from './types';
import * as leftOutEn from './yang-kami-buang/en.mdx';
import * as leftOutId from './yang-kami-buang/id.mdx';

export type { PostMeta, PostTopic } from './types';

type PostModule = { default: MDXContent; meta: PostMeta };

export interface Post {
  slug: string;
  meta: Record<Locale, PostMeta>;
  Body: Record<Locale, MDXContent>;
}

const post = (slug: string, id: PostModule, en: PostModule): Post => ({
  slug,
  meta: { id: id.meta, en: en.meta },
  Body: { id: id.default, en: en.default },
});

/**
 * Every post, newest first. To add one: create src/content/blog/<slug>/id.mdx and en.mdx,
 * each exporting `meta`, then list it here.
 */
export const posts: readonly Post[] = [
  post('aksara-di-layar', aksaraId, aksaraEn),
  post('saat-server-sibuk', busyId, busyEn),
  post('robot-di-mapel-kka', kkaId, kkaEn),
  post('simulator-dulu', simulatorId, simulatorEn),
  post('lantai-kelas', floorId, floorEn),
  post('yang-kami-buang', leftOutId, leftOutEn),
].sort((a, b) => b.meta.id.date.localeCompare(a.meta.id.date));

export const topics: readonly PostTopic[] = ['education', 'reception', 'engineering', 'company'];

export function getPost(slug: string): Post | undefined {
  return posts.find((entry) => entry.slug === slug);
}

/** Up to `count` other posts, the same topic first. */
export function relatedPosts(current: Post, count = 2): Post[] {
  const others = posts.filter((entry) => entry.slug !== current.slug);
  const topic = current.meta.id.topic;
  return [
    ...others.filter((entry) => entry.meta.id.topic === topic),
    ...others.filter((entry) => entry.meta.id.topic !== topic),
  ].slice(0, count);
}

/** "7 Oktober 2026" or "7 October 2026". */
export function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
