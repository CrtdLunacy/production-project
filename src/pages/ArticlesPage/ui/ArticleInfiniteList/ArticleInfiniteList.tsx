import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ArticleList } from 'enteties/Article';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { getArticlePageIsLoading, getArticlePageView } from '../../model/selectors/articlePageSelectors';
import { getArticles } from '../../model/slices/articlesPageSlice';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = (props: ArticleInfiniteListProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlePageIsLoading);

    const view = useSelector(getArticlePageView);
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    return (
        <ArticleList
            isLoading={isLoading}
            articles={articles}
            view={view}
            className={className}
        />
    );
};
