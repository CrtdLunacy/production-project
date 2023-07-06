import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/widgets/PageLayout/PageLayout';

const AboutPage = memo(() => {
    const { t } = useTranslation();

    return (
        <PageLayout>
            {t('О сайте')}
        </PageLayout>
    );
});

export default AboutPage;
