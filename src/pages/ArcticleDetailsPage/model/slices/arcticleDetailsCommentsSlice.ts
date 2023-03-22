import {
    createEntityAdapter,
    createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { CommentType } from 'enteties/Comment';
import { StateSchema } from 'app/providers/StoreProvider';
import { fetchArticleById } from 'enteties/Article/model/services/fetchArticleById/fetchArticleById';
import { Article } from 'enteties/Article';
import {
    fetchCommentsByArticleId,
} from 'pages/ArcticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentSchema } from '../types/ArticleDetailsCommentSchema';

const commentsAdapter = createEntityAdapter<CommentType>({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsCommets || commentsAdapter.getInitialState(),
);

const arcticleDetailsCommentsSlice = createSlice({
    name: 'arcticleDetailsComments',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<CommentType[]>) => {
                state.isLoading = false;
                commentsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: arcticleDetailsCommentsReducer } = arcticleDetailsCommentsSlice;
