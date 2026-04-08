export type WPRendered = { rendered: string };

export type WPMedia = {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<
      string,
      { source_url: string; width: number; height: number }
    >;
  };
};

export type WPTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
  count?: number;
};

export type WPAuthor = {
  id: number;
  name: string;
  slug: string;
  avatar_urls?: Record<string, string>;
  description?: string;
};

export type WPPost = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  link: string;
  title: WPRendered;
  excerpt: WPRendered;
  content: WPRendered;
  featured_media: number;
  categories: number[];
  tags: number[];
  author: number;
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPTerm[][];
    author?: WPAuthor[];
  };
};

export type WPCategory = {
  id: number;
  count: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
};

export type WPTag = {
  id: number;
  count: number;
  name: string;
  slug: string;
  description: string;
};
