import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import MainIcon from '@/shared/assets/icons/MainIcon.svg';
import AboutIcon from '@/shared/assets/icons/AboutIcon.svg';
import ProfileIcon from '@/shared/assets/icons/ProfileIcon.svg';
import ArticlesIcon from '@/shared/assets/icons/article.svg';
import { ISideBarItem } from '../types/sidebar';

export const getSideBarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const SideBarItemsList: ISideBarItem[] = [
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
        ];

        if (userData) {
            SideBarItemsList.push(
                {
                    path: RoutePath.profile + userData.id,
                    text: 'Профиль',
                    Icon: ProfileIcon,
                    authOnly: true,
                },
                {
                    path: RoutePath.articles,
                    text: 'Статьи',
                    Icon: ArticlesIcon,
                    authOnly: true,
                },
            );
        }

        return SideBarItemsList;
    },
);
