import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/auth'; 

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Types *after* store is defined
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
