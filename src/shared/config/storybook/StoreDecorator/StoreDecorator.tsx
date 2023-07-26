import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { ReducersList } from '@/shared/lib/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
// eslint-disable-next-line lunacy-plugin/layer-imports
import { loginReducer } from '@/features/AuthByUsername';
// eslint-disable-next-line lunacy-plugin/layer-imports
import { profileReducer } from '@/features/editableProfileCard';
// eslint-disable-next-line lunacy-plugin/layer-imports
import { articleDetailsReducer } from '@/entities/Article';
// eslint-disable-next-line lunacy-plugin/layer-imports
import { addCommentFormReducer } from '@/features/addCommentForm';
// eslint-disable-next-line lunacy-plugin/layer-imports
import { articleDetailsPageReducer } from '@/pages/ArcticleDetailsPage';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
    </StoreProvider>
);
