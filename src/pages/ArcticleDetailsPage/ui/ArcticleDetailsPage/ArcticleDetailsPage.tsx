import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from 'enteties/Article';
import { useParams } from 'react-router-dom';
import styles from './ArcticleDetailsPage.module.scss';

interface ArcticleDetailsPageProps {
  className?: string;
}

const ArcticleDetailsPage = ({ className }: ArcticleDetailsPageProps) => {
    const { t } = useTranslation('article');
    const { id } = useParams<{id: string}>();

    if (!id) {
        return (
            <div className={classNames(styles.ArcticleDetailsPage, {}, [className])}>
                {t('Статья отсутствует')}
            </div>
        );
    }

    return (
        <div className={classNames(styles.ArcticleDetailsPage, {}, [className])}>
            <ArticleDetails id={id} />
        </div>
    );
};

export default memo(ArcticleDetailsPage);
