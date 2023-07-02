import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useNotifications } from 'enteties/Notification/api/notificationApi';
import { VStack } from 'shared/ui/Stack';
import { NotificationItem } from 'enteties/Notification/ui/NotificationItem/NotificationItem';
import SkeletonLoader from 'shared/ui/SkeletonLoader/SkeletonLoader';
import styles from './NotificationList.module.scss';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = (props: NotificationListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 30000,
    });

    if (isLoading) {
        return (
            <VStack gap="10" className={classNames(styles.NotificationList, {}, [className])}>
                <SkeletonLoader width="100%" border="8px" height="80px" />
                <SkeletonLoader width="100%" border="8px" height="80px" />
                <SkeletonLoader width="100%" border="8px" height="80px" />
            </VStack>
        );
    }

    return (
        <VStack gap="10" className={classNames(styles.NotificationList, {}, [className])}>
            {data?.map((item) => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VStack>
    );
};
