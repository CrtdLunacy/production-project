import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'enteties/Article';

export const getArticlePageIsLoading = (state: StateSchema) => state.articlePage?.isLoading || false;
export const getArticlePageError = (state: StateSchema) => state.articlePage?.error;

export const getArticlePageView = (state: StateSchema) => state.articlePage?.view || ArticleView.GRID;
export const getArticlePageLimit = (state: StateSchema) => state.articlePage?.limit || 9;
export const getArticlePageNumber = (state: StateSchema) => state.articlePage?.page || 1;
export const getArticlePageHasMore = (state: StateSchema) => state.articlePage?.hasMore;
