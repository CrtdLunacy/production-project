import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleThemes } from './ArticleThemes';

export default {
    title: 'shared/ArticleThemes',
    component: ArticleThemes,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleThemes>;

const Template: ComponentStory<typeof ArticleThemes> = (args) => <ArticleThemes {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];
