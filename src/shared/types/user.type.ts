export type UserVariant = 'standard' | 'pro'

export type User = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  userType: UserVariant;
};
