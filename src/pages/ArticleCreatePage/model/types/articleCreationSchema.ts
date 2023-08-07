import { Article } from '@/entities/Article';

export interface ArticleCreationSchema {
    data?: Article;
    isLoading: boolean;
    error?: string;
}
