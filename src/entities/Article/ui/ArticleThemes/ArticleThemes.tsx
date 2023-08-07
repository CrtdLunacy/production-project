import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/Popups';
import { ArticleType } from '../../model/const/const';

interface ArticleThemesProps {
    className?: string;
    value?: string;
    onChange?: (value: ArticleType) => void;
}

export const ArticleThemes = memo((props: ArticleThemesProps) => {
    const {
        className, value, onChange,
    } = props;
    const { t } = useTranslation();
    const articleTypesOptions = useMemo(() => Object.entries(ArticleType).map((val) => ({ value: val[0], content: val[1] })), []);

    const handleChange = useCallback((value: string) => {
        onChange?.(value as ArticleType);
    }, [onChange]);

    return (
        <ListBox
            onChange={handleChange}
            value={value}
            items={articleTypesOptions}
            className={classNames('', {}, [className])}
            defaultValue={t('Укажите категорию статьи')}
            direction="bottom right"
            label={t('Категория')}
        />
    );
});
