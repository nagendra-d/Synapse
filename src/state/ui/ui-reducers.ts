import {
  createSlice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';

import { UiTypes } from './ui-types';
import { initialState } from './ui-initial-state';

const reducers: ValidateSliceCaseReducers<
  UiTypes,
  SliceCaseReducers<UiTypes>
> = {
  updateIsFirstTime: (state, action) => {
    state.isFirstTimeVisit = action.payload.isFirstTimeVisit;
  },
};

const uiReducer = createSlice({
  name: 'ui',
  initialState,
  reducers,
});

export default uiReducer;
