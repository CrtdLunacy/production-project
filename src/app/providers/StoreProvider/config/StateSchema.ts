import { UserSchema } from 'enteties/User';
import { LoginSchema } from 'features/AuthByUsername';

export interface StateSchema {
  user: UserSchema;
  loginForm?: LoginSchema;
}
