import { BaseDocument, User as BaseUser } from '@makes-apps/lib';

export interface User extends BaseUser, BaseDocument {
  first_name: string;
  last_name: string;
}
