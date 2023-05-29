import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, Suspense, useCallback } from 'react';
import Text, { TextSize } from 'shared/ui/Text/Text';
import { AddCommentForm } from 'features/addCommentForm';
import { CommentList } from 'enteties/Comment';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from 'shared/ui/Stack';
import {
    fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';

interface ArticleDetailsCommentsProps {
  className?: string;
  id: string;
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useAppDispatch();

    const handleSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    return (
        <VStack gap="10" className={classNames('', {}, [className])}>
            <Text
                title={t('Комментарии')}
                size={TextSize.L}
            />
            <AddCommentForm
                onSendComment={handleSendComment}
            />
            <CommentList
                isLoading={commentsIsLoading}
                comments={comments}
            />
        </VStack>
    );
});
