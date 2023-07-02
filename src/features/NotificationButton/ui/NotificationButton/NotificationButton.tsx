import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/NotificationIcon.svg';
import { NotificationList } from 'enteties/Notification';
import { Popover } from 'shared/ui/Popups';
import React from 'react';
import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = (props: NotificationButtonProps) => {
    const { className } = props;

    return (
        <Popover
            className={styles.popover}
            direction="bottom left"
            trigger={(
                <Button theme={ButtonTheme.CLEAR}>
                    <Icon Svg={NotificationIcon} />
                </Button>
            )}
        >
            <NotificationList className={styles.notifications} />
        </Popover>
    );
};
