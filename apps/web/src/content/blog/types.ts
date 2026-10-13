/** What a post is mostly about; shown as a label and used to group the list. */
export type PostTopic = 'education' | 'reception' | 'engineering' | 'company';

/** Front matter of a blog post, exported from each MDX file as `meta`. */
export interface PostMeta {
  title: string;
  /** One or two sentences for the post list, search results, and the RSS feed. */
  summary: string;
  /** Publication date as YYYY-MM-DD. */
  date: string;
  /** Reading time in minutes. */
  minutes: number;
  topic: PostTopic;
  /** Leave out to credit the team. */
  author?: string;
  tags?: string[];
}
