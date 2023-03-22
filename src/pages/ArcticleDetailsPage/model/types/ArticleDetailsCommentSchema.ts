import { CommentType } from 'enteties/Comment';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticleDetailsCommentSchema extends EntityState<CommentType>{
    isLoading?: boolean;
    error?: string;
}
