import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/AboutIcon.svg';
import MainIcon from 'shared/assets/icons/MainIcon.svg';
import ProfileIcon from 'shared/assets/icons/ProfileIcon.svg';

export interface ISideBarItem {
  path: string;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGElement>>;
  authOnly?: boolean;
}

export const SideBarItemsList: ISideBarItem[] = [
    {
        path: RoutePath.main,
        text: 'Главная',
        Icon: MainIcon,
    },
    {
        path: RoutePath.about,
        text: 'О сайте',
        Icon: AboutIcon,
    },
    {
        path: RoutePath.profile,
        text: 'Профиль',
        Icon: ProfileIcon,
        authOnly: true,
    },
];
