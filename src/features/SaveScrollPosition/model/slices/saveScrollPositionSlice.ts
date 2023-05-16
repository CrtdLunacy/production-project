import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SaveScrollPositionSchema } from '../types/SaveScrollPositionSchema';

const initialState: SaveScrollPositionSchema = {
    scroll: {},
};

export const saveScrollPositionSlice = createSlice({
    name: 'saveScrollPosition',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{path: string; position: number}>) => {
            state.scroll[payload.path] = payload.position;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchSaveScrollPositionData.pending, (state) => {
    //             state.isLoading = true;
    //             state.error = undefined;
    //         })
    //         .addCase(fetchSaveScrollPositionData.fulfilled, (state, action: PayloadAction<SaveScrollPosition>) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //         })
    //         .addCase(fetchSaveScrollPositionData.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: saveScrollPositionActions } = saveScrollPositionSlice;
export const { reducer: saveScrollPositionReducer } = saveScrollPositionSlice;
