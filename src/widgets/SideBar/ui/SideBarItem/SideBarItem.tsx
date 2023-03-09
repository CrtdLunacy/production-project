import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import React, { memo } from 'react';
import { ISideBarItem } from 'widgets/SideBar/model/items';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'enteties/User';
import styles from './SideBarItem.module.scss';

interface SideBarItemProps {
    item: ISideBarItem;
    collapsed: boolean;
}

// eslint-disable-next-line no-undef
const SideBarItem = memo(({ item, collapsed }: SideBarItemProps) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            className={classNames(styles.item, { [styles.collapsed]: collapsed }, [])}
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
        >
            <item.Icon className={styles.icon} />
            <span className={styles.link}>{t(item.text)}</span>
        </AppLink>

    );
});

export default SideBarItem;
