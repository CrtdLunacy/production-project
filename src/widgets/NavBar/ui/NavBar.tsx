import React, { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, isUserAdmin, isUserModerator, userActions,
} from 'enteties/User';
import Text, { TextTheme } from 'shared/ui/Text/Text';
import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import Avatar from 'shared/ui/Avatar/Avatar';
import { getProfileData } from 'features/editableProfileCard/model/selectors/getProfileData/getProfileData';
import styles from './NavBar.module.scss';

interface NavbarProps {
  className?: string;
}

export const NavBar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isModerator = useSelector(isUserModerator);

    const handeCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const handleShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const handleLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isModerator;

    if (authData) {
        return (
            <header className={classNames(styles.Navbar, {}, [className])}>
                <Text
                    className={styles.appName}
                    title={t('Lunacy News')}
                    theme={TextTheme.INVERTED}
                />
                <AppLink
                    className={styles.createArticle}
                    to={RoutePath.article_create}
                    theme={AppLinkTheme.SECONDARY}
                >
                    {t('Создать статью')}
                </AppLink>

                <Dropdown
                    className={styles.dropdown}
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
            </header>
        );
    }

    return (
        <header className={classNames(styles.Navbar, {}, [className])}>
            <Text
                className={styles.appName}
                title={t('Lunacy News')}
            />
            <Button
                theme={ButtonTheme.CLEAR}
                className={styles.links}
                onClick={handleShowModal}
            >
                {t('Войти')}
            </Button>
            <LoginModal
                isOpen={isAuthModal}
                onClose={handeCloseModal}
            />
        </header>
    );
});
