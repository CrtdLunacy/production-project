import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import ArticleListItem from 'enteties/Article/ui/ArticleListItem/ArticleListItem';
import ArticleListItemSkeleton from 'enteties/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { Article, ArticleView } from '../../model/types/article';
import styles from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Article[],
  isLoading?: boolean,
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.GRID ? 9 : 3)
    .fill(0)
    .map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ArticleListItemSkeleton className={styles.card} key={index} view={view} />
    ));

export const ArticleList = (props: ArticleListProps) => {
    const {
        className,
        view = ArticleView.GRID,
        articles,
        isLoading,
    } = props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
                {getSkeletons(view)}
            </div>
        );
    }
    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            view={view}
            className={styles.card}
            key={article.id}
        />
    );

    return (
        <div className={classNames(styles.ArticleList, {}, [className, styles[view]])}>
            {articles.length > 0
                ? articles.map(renderArticle)
                : null}
        </div>
    );
};