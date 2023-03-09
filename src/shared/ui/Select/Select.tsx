import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useMemo } from 'react';
import styles from './Select.module.scss';

export interface SelectOptions {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOptions[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

const Select = memo((props: SelectProps) => {
    const {
        className, label, options, value, onChange, readonly,
    } = props;

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    const optionList = useMemo(() => options?.map((opt) => (
        <option
            className={styles.option}
            value={opt.value}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);
    const mods:Mods = {};

    return (
        <div className={classNames(styles.Wrapper, mods, [className])}>
            {label && (
                <span className={styles.label}>
                    {`${label} >`}
                </span>
            )}
            <select
                className={styles.select}
                value={value}
                onChange={handleChange}
                disabled={readonly}
            >
                {optionList}
            </select>
        </div>
    );
});

export default Select;
