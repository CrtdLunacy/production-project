import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, isUserAdmin, isUserModerator, userActions,
} from '@/entities/User';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';
import styles from './AvatarDropdown.module.scss';
import { RoutePath } from '@/shared/const/router';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = (props: AvatarDropdownProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isModerator = useSelector(isUserModerator);
    const authData = useSelector(getUserAuthData);

    const handleLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isModerator;

    if (!authData) {
        return null;
    }

    return (
        <Dropdown
            items={[
                ...(isAdminPanelAvailable
                    ? [{ content: t('Управление'), href: RoutePath.admin_panel }]
                    : []),
                { content: t('Профиль'), href: RoutePath.profile + authData.id },
                { content: t('Выйти'), onClick: handleLogout },
            ]}
            trigger={<Avatar size={30} src={authData.avatar} />}
            triggerStyle={styles.trigger}
            direction="bottom left"
        />
    );
};
