import { classNames, Mods } from 'shared/lib/classNames/classNames';
import {
    ChangeEvent, InputHTMLAttributes, memo, SyntheticEvent, useEffect, useRef, useState,
} from 'react';
import styles from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;
interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readOnly?: boolean;

}

const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readOnly,
        ...otherProps
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value || '');
    const [caretPosition, setCaretPosition] = useState(0);
    const ref = useRef<HTMLInputElement>(null);

    const isCaretVisible = isFocused && !readOnly;

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleSelect = (e: SyntheticEvent<HTMLInputElement, Event>) => {
        if (isCaretVisible) {
            setCaretPosition(e?.currentTarget?.selectionStart || 0);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (isCaretVisible) {
            setInputValue(e.target.value);
            onChange?.(e.target.value);
            setCaretPosition(e.target.value.length);
        }
    };

    const mods: Mods = {
        [styles.readonly]: readOnly,
    };

    return (
        <div className={classNames(styles.InputWrapper, mods, [className])}>
            {placeholder && (
                <div className={styles.placeholder}>
                    {`${placeholder}:`}
                </div>
            )}

            <div className={styles.caretWrapper}>
                <input
                    ref={ref}
                    type={type}
                    value={inputValue}
                    onChange={handleChange}
                    className={styles.input}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onSelect={handleSelect}
                    readOnly={readOnly}
                    {...otherProps}
                />
                {isCaretVisible && (
                    <span
                        className={styles.caret}
                        style={{ left: `${caretPosition * 9}px` }}
                    />
                )}
            </div>
        </div>
    );
});

export default Input;
