import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NotificationItem } from './NotificationItem';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'entities/NotificationItem',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationItem>;

const item = {
    id: '1',
    title: 'Title',
    description: 'Description Description',
    url: 'https://http.cat/images/202.jpg',
};

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

export const Light = Template.bind({});
Light.args = {
    item,
};
Light.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {
    item,
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
