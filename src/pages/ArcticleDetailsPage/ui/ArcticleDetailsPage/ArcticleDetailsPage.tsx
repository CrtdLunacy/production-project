import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails } from 'enteties/Article';
import { useNavigate, useParams } from 'react-router-dom';
import Text from 'shared/ui/Text/Text';
import { CommentList } from 'enteties/Comment';
import { ReducersList, useDynamicModuleLoad } from 'shared/lib/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/addCommentForm';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { arcticleDetailsCommentsReducer, getArticleComments } from '../../model/slices/arcticleDetailsCommentsSlice';
import styles from './ArcticleDetailsPage.module.scss';

interface ArcticleDetailsPageProps {
  className?: string;
}
const initialReducers: ReducersList = {
    articleDetailsCommets: arcticleDetailsCommentsReducer,
};

const ArcticleDetailsPage = ({ className }: ArcticleDetailsPageProps) => {
    const dynamicModule = useDynamicModuleLoad({
        reducers: initialReducers,
    });
    const { t } = useTranslation('article');
    const { id } = useParams<{id: string}>();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    const handleBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    if (!id) {
        return (
            <div className={classNames(styles.ArcticleDetailsPage, {}, [className])}>
                {t('Статья отсутствует')}
            </div>
        );
    }

    return (
        <div className={classNames(styles.ArcticleDetailsPage, {}, [className])}>
            <Button onClick={handleBackToList} theme={ButtonTheme.OUTLINE}>
                {t('Назад к списку')}
            </Button>
            <ArticleDetails id={id} />
            <Text
                title={t('Комментарии')}
                className={styles.commentTitle}
            />
            <AddCommentForm
                onSendComment={handleSendComment}
            />
            <CommentList
                isLoading={commentsIsLoading}
                comments={comments}
            />
        </div>
    );
};

export default memo(ArcticleDetailsPage);
