import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Modal from 'shared/ui/Modal/Modal';
import { useTranslation } from 'react-i18next';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import styles from './NavBar.module.scss';

interface NavbarProps {
  className?: string;
}

const NavBar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    return (
        <div className={classNames(styles.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR}
                className={styles.links}
                onClick={onToggleModal}
            >
                {t('Войти')}
            </Button>
            {/* <button onClick={() => setIsOpen(true)}>click</button> */}
            <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                A aliquid consequatur dolore eligendi eum fugit inventore ipsum
                nesciunt nulla perferendis possimus quasi ratione rem repudiandae
                sed sit totam voluptas, voluptatum!s
            </Modal>
        </div>
    );
};

export default NavBar;
