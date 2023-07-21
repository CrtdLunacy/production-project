import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import Text, { TextTheme } from '@/shared/ui/Text/Text';
import { PageLayout } from '@/widgets/PageLayout';

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = memo((props: ForbiddenPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <PageLayout className={classNames('', {}, [className])}>
            <Text theme={TextTheme.ERROR} title={t('Доступ')} />
        </PageLayout>
    );
});

export default ForbiddenPage;
