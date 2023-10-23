import { ArticleBlock, ArticleType } from '@/entities/Article';
import { User } from '@/entities/User';

export interface ArticleCreationSchema {
    id: string;
    title: string;
    user?: User;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    selectedType: ArticleType;
    type: ArticleType[];
    blocks: ArticleBlock[];
    isLoading: boolean;
    error?: string;
}
