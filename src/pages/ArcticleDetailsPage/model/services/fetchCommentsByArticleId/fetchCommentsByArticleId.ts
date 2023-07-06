import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommentType } from '@/entities/Comment';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchCommentsByArticleId = createAsyncThunk<CommentType[], string | undefined, ThunkConfig<string>>(
    'articleDetails/fetchCommentsByArticleId',
    async (articleId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        if (articleId) {
            rejectWithValue('Article not found');
        }

        try {
            const response = await extra.api.get<CommentType[]>('/comments', {
                params: {
                    articleId,
                    _expand: 'user',
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
