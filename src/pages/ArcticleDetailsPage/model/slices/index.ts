import { combineReducers } from '@reduxjs/toolkit';
import {
    articleDetailsRecommendationsReducer,
} from 'pages/ArcticleDetailsPage/model/slices/articleDetailsRecommendationsSlice';
import { articleDetailsCommentsReducer } from 'pages/ArcticleDetailsPage/model/slices/articleDetailsCommentsSlice';
import { ArticleDetailsPageSchema } from '../types';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsRecommendationsReducer,
    comments: articleDetailsCommentsReducer,
});
