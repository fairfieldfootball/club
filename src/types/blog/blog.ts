import { BaseDocument } from '@makes-apps/lib';

export type BlogType = 'recap' | 'rant';

export interface Blog extends BaseDocument {
  date: Date;
  author: string;
  type: BlogType;
  title: string;
  content: string;
}
