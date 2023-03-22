import { classNames } from 'shared/lib/classNames/classNames';
import { CommentType } from 'enteties/Comment';
import Avatar from 'shared/ui/Avatar/Avatar';
import Text from 'shared/ui/Text/Text';
import SkeletonLoader from 'shared/ui/SkeletonLoader/SkeletonLoader';
import styles from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment: CommentType;
  isLoading?: boolean;
}

const anonym = 'https://encrypted-tbn0.gstatic.com/images?q='
  + 'tbn:ANd9GcSXuAHUhBkbhmwfUoVEpNfexckTdITDMuFF5ArJQW1H20CrdbjyMKn3W7OLk-Y6R1C9VZo&usqp=CAU';

const CommentCard = (props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <div className={classNames(styles.CommentCard, {}, [className])}>
                <div className={styles.header}>
                    <SkeletonLoader height={30} width={30} border="50%" />
                    <SkeletonLoader className={styles.username} height={16} width={100} />
                </div>
                <SkeletonLoader className={styles.text} width="100%" height={50} />
            </div>
        );
    }

    return (
        <div className={classNames(styles.CommentCard, {}, [className])}>
            <div className={styles.header}>
                <Avatar
                    size={30}
                    src={comment.user.avatar ?? anonym}
                />
                <Text className={styles.username} title={comment.user.username} />
            </div>
            <Text className={styles.text} text={comment.text} />
        </div>
    );
};

export default CommentCard;
