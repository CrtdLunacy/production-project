import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state: StateSchema) => state.articleDetailsCommets?.isLoading || false;
export const getArticleCommentsError = (state: StateSchema) => state.articleDetailsCommets?.error;
