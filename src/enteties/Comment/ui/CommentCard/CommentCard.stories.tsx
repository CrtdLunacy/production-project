import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import CommentCard from 'enteties/Comment/ui/CommentCard/CommentCard';

export default {
    title: 'enteties/Comment/CommentCard',
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
