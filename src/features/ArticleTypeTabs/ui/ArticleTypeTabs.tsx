import { useTranslation } from 'react-i18next';
import Tabs, { TabItem } from 'shared/ui/Tabs/Tabs';
import { useCallback, useMemo } from 'react';
import { ArticleType } from 'enteties/Article';
import { classNames } from 'shared/lib/classNames/classNames';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = (props: ArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation();

    const handleChangeType = useCallback((tab: TabItem) => {
        onChangeType(tab.value as ArticleType);
    }, [onChangeType]);

    const typeTabs = useMemo(() => Object.keys(ArticleType).map<TabItem>((article) => ({
        value: article,
        content: t(`${article}`),
    })), [t]);

    return (
        <Tabs
            tabs={typeTabs}
            value={value}
            onTabClick={handleChangeType}
            className={classNames('', {}, [className])}
        />
    );
};