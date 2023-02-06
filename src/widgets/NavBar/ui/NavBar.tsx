import React from 'react'
import {classNames} from 'shared/lib/classNames/classNames'
import styles from './NavBar.module.scss'
import AppLink, {AppLinkTheme} from "shared/ui/AppLink/AppLink";
import {ThemeSwitcher} from "widgets/ThemeSwitcher";

interface NavbarProps {
  className?: string;
}

const NavBar = ({className}: NavbarProps) => {
  return (
    <div className={classNames(styles.Navbar, {}, [className])}>
      <ThemeSwitcher />
      <div className={styles.links}>
        <AppLink theme={AppLinkTheme.SECONDARY} className={styles.mainLink} to={'/'}>
          Главная
        </AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} className={styles.mainLink} to={'/about'}>
          О сайте
        </AppLink>
      </div>
    </div>
  )
}

export default NavBar
