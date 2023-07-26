import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ProfilePage from './ProfilePage';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => (
    <ProfilePage />
);

export const Primary = Template.bind({});
Primary.decorators = [StoreDecorator({
    profile: {
        form: {
            username: 'admin',
            age: 28,
            first: 'admin',
            lastname: 'testovich',
            city: 'Moscow',
            country: Country.Russia,
            currency: Currency.RUB,
        },
    },
})];

export const Secondary = Template.bind({});
Secondary.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    profile: {
        form: {
            username: 'admin',
            age: 28,
            first: 'admin',
            lastname: 'testovich',
            city: 'Moscow',
            country: Country.Russia,
            currency: Currency.RUB,
        },
    },
})];
