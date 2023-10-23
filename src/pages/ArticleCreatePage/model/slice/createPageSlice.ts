import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleBlock, ArticleType } from '@/entities/Article';
import { ArticleCreationSchema } from '../types/articleCreationSchema';

const initialState: ArticleCreationSchema = {
    id: '',
    title: '',
    subtitle: '',
    img: '',
    views: 0,
    createdAt: '',
    selectedType: ArticleType.MEDICINE,
    type: [],
    blocks: [],
    isLoading: false,
    error: undefined,
};
export const createPageSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setSubtitle: (state, action: PayloadAction<string>) => {
            state.subtitle = action.payload;
        },
        setImgUrl: (state, action: PayloadAction<string>) => {
            state.img = action.payload;
        },
        setSelectedType: (state, action: PayloadAction<ArticleType>) => {
            state.selectedType = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = [...state.type, action.payload];
        },
        setBlock: (state, action: PayloadAction<ArticleBlock>) => {
            state.blocks = [...state.blocks, action.payload];
        },
    },
    extraReducers: (builder) => {},
});

export const { actions: createPageActions } = createPageSlice;
export const { reducer: createPageReducer } = createPageSlice;
