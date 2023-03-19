import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import ArcticleDetailsPage from './ArcticleDetailsPage';

export default {
    title: 'shared/ArcticleDetailsPage',
    component: ArcticleDetailsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArcticleDetailsPage>;

const Template: ComponentStory<typeof ArcticleDetailsPage> = (args) => <ArcticleDetailsPage {...args} />;

export const Light = Template.bind({});
Light.args = {
};
Light.decorators = [StoreDecorator({
})];

export const Dark = Template.bind({});
Dark.args = {
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
})];
