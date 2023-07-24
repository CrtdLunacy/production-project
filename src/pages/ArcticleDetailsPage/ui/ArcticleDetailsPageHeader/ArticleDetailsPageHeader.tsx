import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from '@/entities/Article';
import Button, { ButtonTheme } from '@/shared/ui/Button/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/Stack';
import { getArticleEditAccess } from '../../model/selectors/article';
import { RoutePath } from '@/shared/const/router';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

const ArticleDetailsPageHeader = (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const canEdit = useSelector(getArticleEditAccess);
    const article = useSelector(getArticleDetailsData);

    const handleBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const handleEditArticle = useCallback(() => {
        navigate(`${RoutePath.article_details}${article?.id}/edit`);
    }, [article?.id, navigate]);

    return (
        <HStack max justify="between" className={classNames('', {}, [className])}>
            <Button onClick={handleBackToList} theme={ButtonTheme.OUTLINE}>
                {t('Назад к списку')}
            </Button>

            {canEdit
                ? (
                    <Button
                        onClick={handleEditArticle}
                        theme={ButtonTheme.OUTLINE}
                    >
                        {t('Редактировать')}
                    </Button>
                )
                : null}
        </HStack>
    );
};

export default ArticleDetailsPageHeader;
