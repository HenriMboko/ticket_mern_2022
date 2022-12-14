import { createAsyncThunk } from "@reduxjs/toolkit";

import ticketService from "./ticketService";

const initialState = {
    tickets: [],
    ticket: {},
    iseError: false,
    isScucess: false,
    isLoading: false,
    message: '',
}

//Register new user
export const createTicket = createAsyncThunk('auth/create',
    async (ticketData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.creatTickets(ticketData, token);
        } catch (error) {
            const message = (error.response
                && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })

export const ticketSlice = createAsyncThunk({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },

    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload

            })
    }
})



export const { reset } = ticketSlice.actions
export default ticketSlice.reducers