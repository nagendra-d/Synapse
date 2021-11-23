import {
  createSlice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';

import { UserTypes } from './user-types';
import { initialState } from './user-initial-state';

const reducers: ValidateSliceCaseReducers<
  UserTypes,
  SliceCaseReducers<UserTypes>
> = {
  onLogin: (state, action) => {
    state.user = action.payload.user;
  },
};

const userReducer = createSlice({
  name: 'users',
  initialState,
  reducers,
});

export default userReducer;
