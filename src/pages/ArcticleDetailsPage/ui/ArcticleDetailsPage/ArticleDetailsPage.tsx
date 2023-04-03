import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails, ArticleList } from 'enteties/Article';
import { useNavigate, useParams } from 'react-router-dom';
import Text, { TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'enteties/Comment';
import { ReducersList, useDynamicModuleLoad } from 'shared/lib/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/addCommentForm';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import PageLayout from 'widgets/PageLayout/PageLayout';
import ArticleDetailsPageHeader from 'pages/ArcticleDetailsPage/ui/ArcticleDetailsPageHeader/ArticleDetailsPageHeader';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import {
    fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import styles from './ArcticleDetailsPage.module.scss';
import {
    getArticleRecomendations,
} from '../../model/slices/articleDetailsRecommendationsSlice';
import { articleDetailsPageReducer } from '../../model/slices';

interface ArticleDetailsPageProps {
  className?: string;
}
const initialReducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const dynamicModule = useDynamicModuleLoad({
        reducers: initialReducers,
    });
    const { t } = useTranslation('article');
    const { id } = useParams<{id: string}>();
    const comments = useSelector(getArticleComments.selectAll);
    const recommendations = useSelector(getArticleRecomendations.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const recommendsIsLoading = useSelector(getArticleRecommendationsIsLoading);
    const dispatch = useAppDispatch();

    const handleSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    });

    if (!id) {
        return (
            <PageLayout className={classNames(styles.ArcticleDetailsPage, {}, [className])}>
                {t('Статья отсутствует')}
            </PageLayout>
        );
    }

    return (
        <PageLayout className={classNames(styles.ArcticleDetailsPage, {}, [className])}>
            <ArticleDetailsPageHeader />
            <ArticleDetails id={id} />
            <Text
                title={t('Рекомендуем')}
                size={TextSize.L}
                className={styles.commentTitle}
            />
            <ArticleList
                target="_blank"
                articles={recommendations}
                isLoading={recommendsIsLoading}
                className={styles.recommendations}
            />
            <Text
                title={t('Комментарии')}
                size={TextSize.L}
                className={styles.commentTitle}
            />
            <AddCommentForm
                onSendComment={handleSendComment}
            />
            <CommentList
                isLoading={commentsIsLoading}
                comments={comments}
            />
        </PageLayout>
    );
};

export default memo(ArticleDetailsPage);
