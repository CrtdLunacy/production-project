import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import Card from 'shared/ui/Card/Card';
import SkeletonLoader from 'shared/ui/SkeletonLoader/SkeletonLoader';
import { ArticleView } from '../../model/const/const';
import styles from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    if (view === ArticleView.LIST) {
        return (
            <div className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}>
                <Card>
                    <div className={styles.header}>
                        <SkeletonLoader border="50%" height={30} width={30} />
                        <SkeletonLoader width={150} height={16} className={styles.username} />
                        <SkeletonLoader width={150} height={16} className={styles.date} />
                    </div>
                    <SkeletonLoader width={250} height={24} className={styles.title} />
                    <SkeletonLoader height={200} className={styles.img} />
                    <div className={styles.footer}>
                        <SkeletonLoader width={200} height={36} />
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}>
            <Card className={styles.card}>
                <div className={styles.imgWrapper}>
                    <SkeletonLoader
                        className={styles.img}
                        width={200}
                        height={200}
                    />
                </div>
                <div className={styles.infoWrapper}>
                    <SkeletonLoader width={130} height={16} />
                </div>
                <SkeletonLoader width={150} height={16} className={styles.title} />
            </Card>
        </div>
    );
});

export default ArticleListItemSkeleton;
