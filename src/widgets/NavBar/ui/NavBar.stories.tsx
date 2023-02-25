import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { NavBar } from 'widgets/NavBar';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { WithLoading } from 'features/AuthByUsername/ui/LoginForm/LoginForm.stories';

export default {
    title: 'widgets/NavBar',
    component: NavBar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
Dark.decorators = [StoreDecorator({})];

export const Auth = Template.bind({});
Auth.args = {};
Auth.decorators = [ThemeDecorator(Theme.DARK)];
Auth.decorators = [StoreDecorator({
    user: {
        authData: {},
    },
})];
