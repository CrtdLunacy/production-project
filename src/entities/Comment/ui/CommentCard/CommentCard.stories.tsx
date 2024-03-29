import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CommentCard from '../CommentCard/CommentCard';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Light = Template.bind({});
Light.args = {
    comment: {
        id: '1',
        text: 'Some comment',
        user: { id: '1', username: 'admin' },
    },
};
Light.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {
    comment: {
        id: '1',
        text: 'Some comment',
        user: { id: '1', username: 'admin' },
    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const Loading = Template.bind({});
Loading.args = {
    comment: {
        id: '1',
        text: 'Some comment',
        user: { id: '1', username: 'admin' },
    },
    isLoading: true,
};
Loading.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
