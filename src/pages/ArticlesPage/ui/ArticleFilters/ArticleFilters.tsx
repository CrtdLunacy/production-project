import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ArticleSortField, ArticleView, ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { SortOrder } from '@/shared/types';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import styles from './ArticleFilters.module.scss';
import {
    getArticlePageOrder,
    getArticlePageSearch,
    getArticlePageSort, getArticlePageType,
    getArticlePageView,
} from '../../model/selectors/articlePageSelectors';

interface ArticleFiltersProps {
  className?: string;
}

const ArticleFilters = (props: ArticleFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlePageView);
    const sort = useSelector(getArticlePageSort);
    const order = useSelector(getArticlePageOrder);
    const search = useSelector(getArticlePageSearch);
    const type = useSelector(getArticlePageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const handleChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    const handleChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const handleChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const handleChangeSearch = useCallback((search: string) => {
        dispatch(articlesPageActions.setSearch(search));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    const handleChangeType = useCallback((value: ArticleType) => {
        dispatch(articlesPageActions.setType(value));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    return (
        <div className={classNames(styles.ArticleFilters, {}, [className])}>
            <div className={styles.sortWrapper}>
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={handleChangeOrder}
                    onChangeSort={handleChangeSort}
                />
                <ArticleViewSelector
                    view={view}
                    onViewClick={handleChangeView}
                />
            </div>
            <Card className={styles.search}>
                <Input onChange={handleChangeSearch} value={search} placeholder={t('Поиск')} />
            </Card>
            <ArticleTypeTabs
                value={type}
                onChangeType={handleChangeType}
                className={styles.tabs}
            />
        </div>
    );
};

export default ArticleFilters;
