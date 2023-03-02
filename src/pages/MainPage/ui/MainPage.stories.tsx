import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { WithError } from 'features/AuthByUsername/ui/LoginForm/LoginForm.stories';
import MainPage from './MainPage';

export default {
    title: 'pages/MainPage',
    component: MainPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = (args) => (
    <MainPage />
);

export const Primary = Template.bind({});
Primary.args = {
};

Primary.decorators = [StoreDecorator({
    user: {},
})];

export const Secondary = Template.bind({});
Secondary.args = {
};
Secondary.decorators = [ThemeDecorator(Theme.DARK)];

Secondary.decorators = [StoreDecorator({
    user: {},
})];
