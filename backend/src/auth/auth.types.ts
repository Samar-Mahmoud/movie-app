import { User } from '@prisma/client';

export type AuthRetT = {
  access_token: string;
};

export type PayloadT = {
  sub: User['id'];
  email: User['email'];
};
