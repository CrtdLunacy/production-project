import React, { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'enteties/User';
import Text, { TextTheme } from 'shared/ui/Text/Text';
import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import styles from './NavBar.module.scss';

interface NavbarProps {
  className?: string;
}

const NavBar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const AuthData = useSelector(getUserAuthData);
    const dispatch = useDispatch();

    const handeCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const handleShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const handleLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (AuthData) {
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
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={styles.links}
                    onClick={handleLogout}
                >
                    {t('Выйти')}
                </Button>
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

export default NavBar;
