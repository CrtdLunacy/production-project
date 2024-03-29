import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Article, ArticleBlockType, ArticleType } from '@/entities/Article';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ArticleDetailsPage from './ArticleDetailsPage';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'pages/ArticleDetailsPage',
    component: ArticleDetailsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsPage>;

const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => <ArticleDetailsPage {...args} />;

const article: Article = {
    id: '1',
    title: 'JavaS News',
    user: {
        id: '1',
        username: 'Test',
        avatar: 'https://user-images.githubusercontent.com/65357821/82758846-0394c180-9e0f-11ea-8b02-51f885eff3f5.png',
    },
    subtitle: 'Что нового в JS в 2023 году?',
    img: 'https://user-images.githubusercontent.com/65357821/82758846-0394c180-9e0f-11ea-8b02-51f885eff3f5.png',
    views: 0,
    createdAt: '26.02.2022',
    type: [ArticleType.IT],
    blocks: [
        {
            id: '1',
            type: ArticleBlockType.TEXT,
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста.'
        + ' Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                'JavaScript — это язык, программы на котором можно выполнять в разных средах. '
        + 'В нашем случае речь идёт о браузерах и о серверной платформе Node.js. '
        + 'Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере,'
        + ' это значит,'
        + ' что вы буквально в считанных секундах от своей первой JavaScript-программы.',
            ],
        },
        {
            id: '4',
            type: ArticleBlockType.CODE,
            code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n     '
        + ' document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
        },
        {
            id: '5',
            type: ArticleBlockType.TEXT,
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. '
        + 'Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
            ],
        },
        {
            id: '2',
            type: ArticleBlockType.IMAGE,
            src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
            title: 'Рисунок 1 - скриншот сайта',
        },
        {
            id: '3',
            type: ArticleBlockType.CODE,
            code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router ="
        + " jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));"
        + '\nserver.use(jsonServer.bodyParser);',
        },
        {
            id: '7',
            type: ArticleBlockType.TEXT,
            title: 'Заголовок этого блока',
            paragraphs: [
                'JavaScript — это язык, программы на котором можно выполнять в разных средах. '
        + 'В нашем случае речь идёт о браузерах и о серверной платформе Node.js. '
        + 'Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере,'
        + ' это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
            ],
        },
    ],
};

export const Light = Template.bind({});
Light.args = {
};
Light.decorators = [StoreDecorator({
    articleDetails: {
        data: article,
    },
})];

export const Dark = Template.bind({});
Dark.args = {
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    articleDetails: {
        data: article,
    },
})];
