import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleList } from 'enteties/Article';
import { ReducersList, useDynamicModuleLoad } from 'shared/lib/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import PageLayout from 'widgets/PageLayout/PageLayout';
import Text, { TextTheme } from 'shared/ui/Text/Text';
import { useSearchParams } from 'react-router-dom';
import ArticleFilters from '../ArticleFilters/ArticleFilters';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticles/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import {
    getArticlePageError,
    getArticlePageIsLoading,
    getArticlePageView,
} from '../../model/selectors/articlePageSelectors';
import { articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice';
import styles from './ArcticlesPage.module.scss';

interface ArcticlesPageProps {
  className?: string;
}

const initialReducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArcticlesPage = ({ className }: ArcticlesPageProps) => {
    const { t } = useTranslation('article');
    const dynamicModule = useDynamicModuleLoad({
        reducers: initialReducers,
        isRemoved: false,
    });
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlePageIsLoading);
    const error = useSelector(getArticlePageError);
    const view = useSelector(getArticlePageView);
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const handleLoadMoreArticles = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    if (error) {
        return (
            <PageLayout className={classNames(styles.ArcticlesPage, {}, [className, styles.errorPage])}>
                <Text theme={TextTheme.ERROR} title={error} />
            </PageLayout>
        );
    }

    return (
        <PageLayout
            onScrollEnd={handleLoadMoreArticles}
            className={classNames(styles.ArcticlesPage, {}, [className])}
        >
            <ArticleFilters />
            <ArticleList
                isLoading={isLoading}
                articles={articles}
                view={view}
                className={styles.list}
            />
        </PageLayout>
    );
};

export default memo(ArcticlesPage);
