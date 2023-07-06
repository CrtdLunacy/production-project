import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchArticleRecommendations = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articlePage/fetchArticleRecommendations',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: 4,
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('Article not found');
        }
    },
);
