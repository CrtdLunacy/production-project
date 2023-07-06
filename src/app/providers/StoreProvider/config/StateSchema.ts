import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { UserSchema } from '@/entities/User';
import { ArticleDetailsSchema } from '@/entities/Article';
import { LoginSchema } from '@/features/AuthByUsername';
import { addCommentFormSchema } from '@/features/addCommentForm';
import { ArticlePageSchema } from '@/pages/ArticlesPage';
import { SaveScrollPositionSchema } from '@/features/SaveScrollPosition';
import { ArticleDetailsPageSchema } from '@/pages/ArcticleDetailsPage';
import { rtkApi } from '@/shared/api/rtkApi';
import { EditableProfileCardSchema } from '@/features/editableProfileCard';

export interface StateSchema {
    user: UserSchema;
    scrollPosition: SaveScrollPositionSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // Асинхронные редюсеры
    loginForm?: LoginSchema;
    profile?: EditableProfileCardSchema;
    articleDetails?: ArticleDetailsSchema;
    addCommentForm?: addCommentFormSchema;
    articlesPage?: ArticlePageSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;

}
export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
