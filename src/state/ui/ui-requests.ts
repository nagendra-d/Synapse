import uiReducer from './ui-reducers';
import { Dispatch } from 'redux';

export const updateIsFirstTime = (isFirstTimeVisit: boolean) => async (dispatch: Dispatch) => {
  dispatch(uiReducer.actions.updateIsFirstTime({ isFirstTimeVisit }));
};
