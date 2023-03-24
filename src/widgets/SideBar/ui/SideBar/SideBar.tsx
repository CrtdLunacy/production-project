import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useMemo, useState } from 'react';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import LangSwitcher from 'widgets/LangSwitcher/ui/LangSwitcher';
import Button, { ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getSideBarItems } from '../../model/selectors/getSideBarItems';
import SideBarItem from '../SideBarItem/SideBarItem';
import styles from './SideBar.module.scss';

interface SideBarProps {
  className?: string
}

const SideBar = memo(({ className }: SideBarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSelector(getSideBarItems);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(() => sidebarItemsList.map((item) => (
        <SideBarItem
            item={item}
            collapsed={collapsed}
            key={item.path}
        />
    )), [collapsed, sidebarItemsList]);

    return (
        <div
            data-testid="sidebar"
            className={classNames(styles.SideBar, { [styles.collapsed]: collapsed }, [className])}
        >
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={styles.collapseBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.MAX_HEIGHT}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={styles.items}>
                {itemsList}
            </div>
            <div className={styles.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={styles.lang} />
            </div>
        </div>
    );
});

export default SideBar;
