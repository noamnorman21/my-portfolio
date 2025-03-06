import { configureStore } from '@reduxjs/toolkit';
import terminalReducer from './terminalSlice';

const store = configureStore({
    reducer: {
        terminal: terminalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
