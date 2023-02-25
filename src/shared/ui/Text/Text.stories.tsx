import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import Text, { TextTheme } from 'shared/ui/Text/Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    text: 'Light',
    title: 'Light',
};

export const Dark = Template.bind({});
Dark.args = {
    text: 'Dark',
    title: 'Dark',
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    text: 'Title',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
    title: 'Text',
};

export const Error = Template.bind({});
Error.args = {
    text: 'Dark',
    title: 'Dark',
    theme: TextTheme.ERROR,
};
