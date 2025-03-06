import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Terminal {
    open: boolean;
    leaveMessage: boolean;
}

const initialState: Terminal = {
    open: false,
    leaveMessage: true,
};

const terminalSlice = createSlice({
    name: 'terminal',
    initialState,
    reducers: {
        expandTerminal(state) {
            state.open = !state.open;
        },
        dispayLeaveMessage(state, action: PayloadAction<boolean>) {
            state.leaveMessage = action.payload;
        }
    },
});

export const { expandTerminal, dispayLeaveMessage } = terminalSlice.actions;
export default terminalSlice.reducer;
