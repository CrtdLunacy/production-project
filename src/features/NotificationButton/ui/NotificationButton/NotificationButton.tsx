import React, { useCallback, useState } from 'react';
import { NotificationList } from '@/entities/Notification';
import Button, { ButtonTheme } from '@/shared/ui/Button/Button';
import Icon from '@/shared/ui/Icon/Icon';
import NotificationIcon from '@/shared/assets/icons/NotificationIcon.svg';
import { Popover } from '@/shared/ui/Popups';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider';
import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = (props: NotificationButtonProps) => {
    const { className } = props;
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const isMobile = useDevice();

    const handeOpenDrawer = useCallback(() => {
        setIsOpenDrawer(true);
    }, []);

    const handeCloseDrawer = useCallback(() => {
        setIsOpenDrawer(false);
    }, []);

    const trigger = (
        <Button onClick={handeOpenDrawer} theme={ButtonTheme.CLEAR}>
            <Icon Svg={NotificationIcon} />
        </Button>
    );

    if (isMobile) {
        return (
            <>
                {trigger}
                <AnimationProvider>
                    <Drawer isOpen={isOpenDrawer} onClose={handeCloseDrawer}>
                        <NotificationList />
                    </Drawer>
                </AnimationProvider>
            </>
        );
    }

    return (
        <Popover
            className={styles.popover}
            direction="bottom left"
            trigger={trigger}
        >
            <NotificationList className={styles.notifications} />
        </Popover>
    );
};
