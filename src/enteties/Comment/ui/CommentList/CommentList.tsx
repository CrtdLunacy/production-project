import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Text from 'shared/ui/Text/Text';
import CommentCard from '../CommentCard/CommentCard';
import { CommentType } from '../../model/types/commentType';
import styles from './CommentList.module.scss';

interface CommentListProps {
  className?: string;
  comments?: CommentType[];
  isLoading?: boolean;
}

export const CommentList = (props: CommentListProps) => {
    const {
        className,
        comments,
        isLoading,
    } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(styles.CommentList, {}, [className])}>
            {comments?.length
                ? comments.map((comment) => (
                    <CommentCard className={styles.comment} comment={comment} key={comment.id} />
                ))
                : <Text text={t('Комментарии отсутствуют')} />}
        </div>
    );
};

export default CommentList;
