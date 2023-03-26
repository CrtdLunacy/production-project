import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import PageLayout from 'shared/ui/PageLayout/PageLayout';
import styles from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  className?: string
}

const NotFoundPage = memo(({ className }: NotFoundPageProps) => {
    const { t } = useTranslation();

    return (
        <PageLayout className={classNames(styles.NotFoundPage, {}, [className])}>
            {t('Страница не найдена')}
        </PageLayout>
    );
});

export default NotFoundPage;
