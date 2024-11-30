import { User } from './user.model';

export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
}

export const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
};
