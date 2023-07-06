import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleList } from '@/entities/Article';
import Text, { TextSize } from '@/shared/ui/Text/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { useArticleRecommendationsList } from '../../api/articleRecommendatiosApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
        data: articles = [],
        isLoading,
        error,
    } = useArticleRecommendationsList(4);

    if (isLoading || error) {
        return null;
    }

    return (
        <VStack gap="10" className={classNames('', {}, [className])}>
            <Text
                title={t('Рекомендуем')}
                size={TextSize.L}
            />
            <ArticleList
                target="_blank"
                articles={articles}
            />
        </VStack>
    );
});
