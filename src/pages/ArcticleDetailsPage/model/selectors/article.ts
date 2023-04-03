import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from 'enteties/Article';
import { getUserAuthData } from 'enteties/User';

export const getArticleEditAccess = createSelector(
    getArticleDetailsData,
    getUserAuthData,
    (article, user) => {
        if (!article || !user) {
            return false;
        }

        return article.user.id === user.id;
    },
);
