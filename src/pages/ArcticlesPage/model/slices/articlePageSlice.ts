import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'enteties/Article';
import { StateSchema } from 'app/providers/StoreProvider';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ArticlePageSchema } from '../types/articlePageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

const articlePageAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticles = articlePageAdapter.getSelectors<StateSchema>(
    (state) => state.articlePage || articlePageAdapter.getInitialState(),
);

export const articlePageSlice = createSlice({
    name: 'articlePage',
    initialState: articlePageAdapter.getInitialState<ArticlePageSchema>({
        isLoading: false,
        error: undefined,
        view: ArticleView.GRID,
        page: 1,
        hasMore: true,
        ids: [],
        entities: {},
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;
            state.view = view;
            state.limit = view === ArticleView.LIST ? 4 : 9;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.isLoading = false;
                articlePageAdapter.addMany(state, action.payload);
                state.hasMore = action.payload.length > 0;
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articlePageActions } = articlePageSlice;
export const { reducer: articlePageReducer } = articlePageSlice;
