import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const createArticle = createAsyncThunk<Article, void, ThunkConfig<string>>(
    'article/createArticle',
    async (articleData, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<Article>(
                '/article',
                articleData,
            );

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('Article Creation Error');
        }
    },
);
