import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ProfileCard } from 'enteties/Profile';
import { Country } from 'enteties/Country';
import { Currency } from 'enteties/Currency';
import avatar from 'shared/assets/tests/storyybook.jpg';

export default {
    title: 'enteties/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        username: 'admin',
        age: 28,
        first: 'admin',
        lastname: 'testovich',
        city: 'Moscow',
        country: Country.Russia,
        currency: Currency.RUB,
        avatar,
    },
};
Primary.decorators = [StoreDecorator({

})];

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
    error: 'true',
};
