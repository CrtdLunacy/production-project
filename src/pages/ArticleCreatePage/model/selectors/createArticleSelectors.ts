import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleType } from '@/entities/Article';

export const getNewArticleTitle = (state: StateSchema) => state.articleCreatePage?.title || '';
export const getNewArticleSubtitle = (state: StateSchema) => state.articleCreatePage?.subtitle || '';
export const getNewArticleImg = (state: StateSchema) => state.articleCreatePage?.img || '';
export const getNewArticleSelectedType = (state: StateSchema) => state.articleCreatePage?.selectedType || ArticleType.MEDICINE;
export const getNewArticleType = (state: StateSchema) => state.articleCreatePage?.type || [];
export const getNewArticleBlocks = (state: StateSchema) => state.articleCreatePage?.blocks;
export const getNewArticleError = (state: StateSchema) => state.articleCreatePage?.error || '';
export const getNewArticleIsLoading = (state: StateSchema) => state.articleCreatePage?.isLoading || false;

// id: string;
// title: string;
// user: User;
// subtitle: string;
// img: string;
// views: number;
// createdAt: string;
// type: ArticleType[];
// blocks: ArticleBlock[];
