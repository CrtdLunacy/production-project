import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { Text, TextTheme } from '@/shared/ui/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { HStack } from '@/shared/ui/Stack';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import styles from './NavBar.module.scss';
import { RoutePath } from '@/shared/const/router';

interface NavbarProps {
  className?: string;
}

export const NavBar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const handeCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const handleShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

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

                <HStack gap="16">
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
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
