import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Select from 'shared/ui/Select/Select';
import { memo, useCallback, useMemo } from 'react';
import { Currency } from 'enteties/Currency';

interface CurrencySelectProps {
  className?: string;
  value?: string;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className, value, onChange, readonly,
    } = props;
    const { t } = useTranslation();
    const currencyOptions = useMemo(() => Object.entries(Currency).map((val) => ({ value: val[0], content: val[1] })), []);

    const handleChange = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <Select
            onChange={handleChange}
            value={value}
            className={classNames('', {}, [className])}
            label={t('Валюта')}
            options={currencyOptions}
            readonly={readonly}
        />
    );
});
