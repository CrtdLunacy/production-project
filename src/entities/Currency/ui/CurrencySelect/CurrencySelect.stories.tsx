import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { CurrencySelect } from './CurrencySelect';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'entities/CurrencySelect',
    component: CurrencySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => (
    <CurrencySelect />
);

export const Primary = Template.bind({});
Primary.decorators = [StoreDecorator({})];

export const Secondary = Template.bind({});
Secondary.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
