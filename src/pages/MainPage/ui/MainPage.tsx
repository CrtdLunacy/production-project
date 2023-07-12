import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/widgets/PageLayout/PageLayout';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { RatingCard } from '@/entities/Rating';

const MainPage = memo(() => {
    const { t } = useTranslation();

    return (
        <PageLayout>
            {t('Главная страница')}
        </PageLayout>
    );
});

export default MainPage;
