import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';
import { createArticle } from '../services/createArticle';
import { ArticleCreationSchema } from '../types/articleCreationSchema';

const initialState: ArticleCreationSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};
export const createPageSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        createArticle: (state, action: PayloadAction<Article>) => {
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createArticle.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createArticle.fulfilled, (
                state,
                action: PayloadAction<Article>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { actions: createPageActions } = createPageSlice;
export const { reducer: createPageReducer } = createPageSlice;
