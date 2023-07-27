import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { Notification } from '../../model/types/notifications';
import styles from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = (props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <Card theme={CardTheme.OUTLINED} className={classNames(styles.NotificationItem, {}, [className])}>
            <Text title={item.title} text={item.description} />
        </Card>
    );

    if (item.url) {
        return (
            <a
                className={styles.link}
                target="_blank"
                rel="noreferrer"
                href={item.url}
            >
                {content}
            </a>
        );
    }

    return content;
};
