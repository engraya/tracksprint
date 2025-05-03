import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './reducers/auth';



const rootReducer = combineReducers({
    auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>; 
export type AppDispatch = typeof store.dispatch; 

const store = configureStore({
  reducer: rootReducer,
});

export default store;