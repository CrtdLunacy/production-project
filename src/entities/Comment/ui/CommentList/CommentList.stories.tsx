import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { CommentList } from './CommentList';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Light = Template.bind({});
Light.args = {
    comments: [
        {
            id: '1',
            text: 'Some comment',
            user: { id: '1', username: 'admin' },
        },
        {
            id: '2',
            text: 'Some comment 2',
            user: { id: '2', username: 'user' },
        },
    ],
};
Light.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {
    comments: [
        {
            id: '1',
            text: 'Some comment',
            user: { id: '1', username: 'admin' },
        },
        {
            id: '2',
            text: 'Some comment 2',
            user: { id: '2', username: 'user' },
        },
    ],
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const WithoutComments = Template.bind({});
WithoutComments.args = {};
WithoutComments.decorators = [StoreDecorator({})];

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
Loading.decorators = [StoreDecorator({})];
