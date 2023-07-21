import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '@/widgets/PageLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string;
}

export const ArticleEditPage = (props: ArticleEditPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();
    const isEdit = Boolean(id);

    return (
        <PageLayout className={classNames(styles.ArticleEditPage, {}, [className])}>
            {isEdit
                ? t('Редактирование статьи №') + id
                : t('Создание новой статьи')}
        </PageLayout>
    );
};

export default memo(ArticleEditPage);
