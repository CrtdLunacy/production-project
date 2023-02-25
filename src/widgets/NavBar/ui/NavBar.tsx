import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'enteties/User';
import styles from './NavBar.module.scss';

interface NavbarProps {
  className?: string;
}

const NavBar = ({ className }: NavbarProps) => {
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
            <div className={classNames(styles.Navbar, {}, [className])}>
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={styles.links}
                    onClick={handleLogout}
                >
                    {t('Выйти')}
                </Button>
            </div>
        );
    }

    return (
        <div className={classNames(styles.Navbar, {}, [className])}>
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
        </div>
    );
};

export default NavBar;
