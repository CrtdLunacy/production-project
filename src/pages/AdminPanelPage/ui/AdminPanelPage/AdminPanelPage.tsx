import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import PageLayout from 'widgets/PageLayout/PageLayout';

interface AdminPanelPageProps {
    className?: string;
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <PageLayout className={classNames('', {}, [className])}>
            {t('Admin')}
        </PageLayout>
    );
});

export default AdminPanelPage;
