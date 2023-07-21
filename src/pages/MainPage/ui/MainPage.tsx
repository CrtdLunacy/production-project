import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '@/widgets/PageLayout';

const MainPage = memo(() => {
    const { t } = useTranslation();

    return (
        <PageLayout>
            {t('Главная страница')}
        </PageLayout>
    );
});

export default MainPage;
