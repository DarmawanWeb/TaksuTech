import type { MDXComponents } from 'mdx/types';
import type { ComponentProps, ReactNode } from 'react';
import { Photo } from '@/components/blog/photo';
import { SimMission } from '@/components/blog/sim-mission';
import { EduLink, KioskDemo } from '@/components/blog/site-links';

const linkClass = 'font-semibold underline decoration-1 underline-offset-4 hover:decoration-2';

/** Typography for blog posts, plus the components a post can use without importing them. */
const components: MDXComponents = {
  h2: (props: ComponentProps<'h2'>) => (
    <h2 className="mt-12 text-2xl leading-tight font-semibold sm:text-[1.75rem]" {...props} />
  ),
  h3: (props: ComponentProps<'h3'>) => <h3 className="mt-8 text-xl font-semibold" {...props} />,
  p: (props: ComponentProps<'p'>) => <p className="mt-5 text-lg leading-relaxed" {...props} />,
  ul: (props: ComponentProps<'ul'>) => (
    <ul
      className="marker:text-muted-foreground mt-5 flex list-disc flex-col gap-2 pl-6 text-lg leading-relaxed"
      {...props}
    />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol
      className="marker:text-muted-foreground mt-5 flex list-decimal flex-col gap-2 pl-6 text-lg leading-relaxed marker:font-semibold"
      {...props}
    />
  ),
  li: (props: ComponentProps<'li'>) => <li className="pl-1" {...props} />,
  a: (props: ComponentProps<'a'>) => <a className={linkClass} {...props} />,
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote className="border-accent mt-6 border-l-4 pl-5 text-lg" {...props} />
  ),
  code: (props: ComponentProps<'code'>) => (
    <code className="bg-surface-muted rounded px-1.5 py-0.5 text-[0.92em]" {...props} />
  ),
  hr: () => <hr className="border-border my-10" />,
  // MDX wraps the text inside <Note> in its own paragraphs, so this one is a div.
  Note: ({ children }: { children: ReactNode }) => (
    <div className="border-accent bg-accent-soft mt-6 rounded-md border-l-4 px-4 py-1 [&>p]:mt-3 [&>p:last-child]:mb-3">
      {children}
    </div>
  ),
  Photo,
  SimMission,
  EduLink,
  KioskDemo,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
