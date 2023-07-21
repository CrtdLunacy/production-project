import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ReducersList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLayout } from '@/widgets/PageLayout';
import Text, { TextTheme } from '@/shared/ui/Text/Text';
import { ArticleInfiniteList } from '../../ui/ArticleInfiniteList/ArticleInfiniteList';
import ArticleFilters from '../ArticleFilters/ArticleFilters';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticles/fetchNextArticlesPage';
import {
    getArticlePageError,
} from '../../model/selectors/articlePageSelectors';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import styles from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const initialReducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();
    const error = useSelector(getArticlePageError);
    const dynamicModule = useDynamicModuleLoad({
        reducers: initialReducers,
        isRemoved: false,
    });

    const handleLoadMoreArticles = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    if (error) {
        return (
            <PageLayout className={classNames(styles.ArticlesPage, {}, [className, styles.errorPage])}>
                <Text theme={TextTheme.ERROR} title={error} />
            </PageLayout>
        );
    }

    return (
        <PageLayout
            onScrollEnd={handleLoadMoreArticles}
            className={classNames(styles.ArticlesPage, {}, [className])}
        >
            <ArticleFilters />
            <ArticleInfiniteList className={styles.list} />
        </PageLayout>
    );
};

export default memo(ArticlesPage);
