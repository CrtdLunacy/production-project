import { createAsyncThunk } from '@reduxjs/toolkit';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrder } from '@/shared/types';
import {
    getArticlePageInitState,
} from '../../selectors/articlePageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlePage/initArticlesPage',
    async (searchParams, thunkAPI) => {
        const {
            getState, dispatch,
        } = thunkAPI;
        const inited = getArticlePageInitState(getState());

        if (!inited) {
            const orderFromUrl = searchParams.get('order') as SortOrder ?? 'asc' as SortOrder;
            const sortFromUrl = searchParams.get('sort') as ArticleSortField ?? 'createdAt' as ArticleSortField;
            const searchFromUrl = searchParams.get('search') ?? '';
            const typeFromUrl = searchParams.get('type') as ArticleType ?? 'ALL';

            dispatch(articlesPageActions.setOrder(orderFromUrl));
            dispatch(articlesPageActions.setSort(sortFromUrl));
            dispatch(articlesPageActions.setSearch(searchFromUrl));
            dispatch(articlesPageActions.setType(typeFromUrl));

            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({}));
        }
    },
);
