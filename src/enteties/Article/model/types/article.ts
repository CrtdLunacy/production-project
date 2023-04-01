import { User } from 'enteties/User';

export enum ArticleSortField {
    VIEWS = 'views',
    TITLE = 'title',
    CREATED = 'createdAt',
}
export enum ArticleBlockType {
    CODE= 'CODE',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT',
}

export interface ArticleBlockBase {
    id: string;
    type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase{
    type: ArticleBlockType.CODE;
    code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase{
    type: ArticleBlockType.IMAGE;
    src: string;
    title: string;
}

export interface ArticleTextBlock extends ArticleBlockBase{
    type: ArticleBlockType.TEXT;
    paragraphs: string[];
    title?: string;
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export enum ArticleType {
    ALL = 'ALL',
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    MEDICINE = 'MEDICINE',
    ECONOMY = 'ECONOMY',
    POLITICS = 'POLITICS',
}

export enum ArticleView {
    LIST = 'list',
    GRID = 'grid'
}

export interface Article {
    id: string;
    title: string;
    user: User;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
}

export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: Article;
}
