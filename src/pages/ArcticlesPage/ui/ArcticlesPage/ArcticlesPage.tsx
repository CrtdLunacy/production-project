import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import styles from './ArcticlesPage.module.scss';

interface ArcticlesPageProps {
  className?: string;
}

const ArcticlesPage = ({ className }: ArcticlesPageProps) => {
    const { t } = useTranslation('article');

    return (
        <div className={classNames(styles.ArcticlesPage, {}, [className])}>
            Art page
        </div>
    );
};

export default memo(ArcticlesPage);
