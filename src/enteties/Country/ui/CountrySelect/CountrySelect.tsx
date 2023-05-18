import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Select from 'shared/ui/Select/Select';
import { memo, useCallback, useMemo } from 'react';
import { Currency } from 'enteties/Currency';
import { Country } from 'enteties/Country/model/types/country';
import { ListBox } from 'shared/ui/ListBox/ListBox';

interface CountrySelectProps {
  className?: string;
  value?: string;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        className, value, onChange, readonly,
    } = props;
    const { t } = useTranslation();
    const countryOptions = useMemo(() => Object.entries(Country).map((val) => ({ value: val[0], content: val[1] })), []);

    const handleChange = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <ListBox
            onChange={handleChange}
            value={value}
            items={countryOptions}
            className={classNames('', {}, [className])}
            defaultValue={t('Укажите страну')}
            readonly={readonly}
            direction="top right"
            label={t('Страна')}
        />
    );
});
