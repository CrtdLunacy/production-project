import { CommentType } from '../../../Comment';
import { classNames } from '@/shared/lib/classNames/classNames';
import Avatar from '@/shared/ui/Avatar/Avatar';
import Text from '@/shared/ui/Text/Text';
import SkeletonLoader from '@/shared/ui/SkeletonLoader/SkeletonLoader';
import AppLink from '@/shared/ui/AppLink/AppLink';
import { VStack } from '@/shared/ui/Stack';
import styles from './CommentCard.module.scss';
import { RoutePath } from '@/shared/const/router';

interface CommentCardProps {
  className?: string;
  comment?: CommentType;
  isLoading?: boolean;
}

const anonym = 'https://encrypted-tbn0.gstatic.com/images?q='
  + 'tbn:ANd9GcSXuAHUhBkbhmwfUoVEpNfexckTdITDMuFF5ArJQW1H20CrdbjyMKn3W7OLk-Y6R1C9VZo&usqp=CAU';

const CommentCard = (props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <VStack gap="10" max className={classNames(styles.CommentCard, {}, [className, styles.loading])}>
                <div className={styles.header}>
                    <SkeletonLoader height={30} width={30} border="50%" />
                    <SkeletonLoader className={styles.username} height={16} width={100} />
                </div>
                <SkeletonLoader width="100%" height={50} />
            </VStack>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <VStack max gap="10" className={classNames(styles.CommentCard, {}, [className])}>
            <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={styles.header}>
                <Avatar
                    size={30}
                    src={comment.user.avatar ?? anonym}
                />
                <Text className={styles.username} title={comment.user.username} />
            </AppLink>
            <Text text={comment.text} />
        </VStack>
    );
};

export default CommentCard;
