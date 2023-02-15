import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './NavBar.module.scss';

interface NavbarProps {
  className?: string;
}

const NavBar = ({ className }: NavbarProps) => (
    <div className={classNames(styles.Navbar, {}, [className])}>
        <div className={styles.links} />
    </div>
);

export default NavBar;
