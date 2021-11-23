import userReducer from './user-reducers';
import { Dispatch } from 'redux';

export const onLogin = (user: string) => async (dispatch: Dispatch) => {
  dispatch(userReducer.actions.onLogin({ user }));
};

export const checkIsAuthenticated = () => async (_dispatch: Dispatch) => {
  return true;
};
