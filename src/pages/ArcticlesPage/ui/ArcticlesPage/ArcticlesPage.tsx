import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView } from 'enteties/Article';
import { ReducersList, useDynamicModuleLoad } from 'shared/lib/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';
import {
    getArticlePageError,
    getArticlePageIsLoading,
    getArticlePageView,
} from '../../model/selectors/articlePageSelectors';
import { articlePageActions, articlePageReducer, getArticles } from '../../model/slices/articlePageSlice';
import styles from './ArcticlesPage.module.scss';

interface ArcticlesPageProps {
  className?: string;
}

const initialReducers: ReducersList = {
    articlePage: articlePageReducer,
};

const ArcticlesPage = ({ className }: ArcticlesPageProps) => {
    const { t } = useTranslation('article');
    const dynamicModule = useDynamicModuleLoad({
        reducers: initialReducers,
    });
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlePageIsLoading);
    const error = useSelector(getArticlePageError);
    const view = useSelector(getArticlePageView);

    useInitialEffect(() => {
        dispatch(fetchArticlesList());
        dispatch(articlePageActions.initState());
    });

    const handleChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageActions.setView(view));
    }, [dispatch]);

    return (
        <div className={classNames(styles.ArcticlesPage, {}, [className])}>
            <ArticleViewSelector
                view={view}
                onViewClick={handleChangeView}
            />
            <ArticleList
                isLoading={isLoading}
                articles={articles}
                view={view}
            />
        </div>
    );
};

export default memo(ArcticlesPage);
