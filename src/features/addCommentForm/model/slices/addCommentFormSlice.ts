import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCommentFormSchema } from '../types/addCommentFormSchema';

const initialState: addCommentFormSchema = {
    error: undefined,
    text: undefined,
};

export const addCommentFormSlice = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchAddCommentFormData.pending, (state) => {
    //             state.isLoading = true;
    //             state.error = undefined;
    //         })
    //         .addCase(fetchAddCommentFormData.fulfilled, (state, action: PayloadAction<AddCommentForm>) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //         })
    //         .addCase(fetchAddCommentFormData.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
