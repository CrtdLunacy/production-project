import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    Article, ArticleType, ArticleView, ArticleSortField,
} from '@/entities/Article';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { SortOrder } from '@/shared/types';
import { ArticlePageSchema } from '../types/articlePageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

const articlePageAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticles = articlePageAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlePageAdapter.getInitialState(),
);

export const articlesPageSlice = createSlice({
    name: 'articlesPage',
    initialState: articlePageAdapter.getInitialState<ArticlePageSchema>({
        isLoading: false,
        error: undefined,
        view: ArticleView.GRID,
        page: 1,
        hasMore: true,
        ids: [],
        entities: {},
        _inited: false,
        limit: 9,
        sort: ArticleSortField.CREATED,
        search: '',
        order: 'asc',
        type: ArticleType.ALL,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;
            state.view = view;
            state.limit = view === ArticleView.LIST ? 4 : 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;

                if (action.meta.arg.replace) {
                    articlePageAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    articlePageAdapter.setAll(state, action.payload);
                } else {
                    articlePageAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
