import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'enteties/Article';
import { getArticlePageLimit } from 'pages/ArcticlesPage/model/selectors/articlePageSelectors';

interface fetchArticlesListProps {
    page?: number;
}

export const fetchArticlesList = createAsyncThunk<Article[], fetchArticlesListProps, ThunkConfig<string>>(
    'articlePage/fetchArticlesList',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;
        const { page = 1 } = props;
        const limit = getArticlePageLimit(getState());

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
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
