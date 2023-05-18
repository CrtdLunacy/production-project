import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import Check from 'shared/assets/icons/checkMark.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import Icon from '../../ui/Icon/Icon';
import { HStack } from '../../ui/Stack';
import Button from '../../ui/Button/Button';
import styles from './ListBox.module.scss';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    items?:ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction: DropdownDirection;
    label?: string;
}

const mapDirectionClasses: Record<DropdownDirection, string> = {
    'bottom left': styles.optionBottomLeft,
    'bottom right': styles.optionBottomRight,
    'top left': styles.optionTopLeft,
    'top right': styles.optionTopRight,
};

export function ListBox(props: ListBoxProps) {
    const {
        items,
        className,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom left',
        label,
    } = props;

    return (
        <HStack gap="10">
            {label && <span className={styles.label}>{label}</span>}
            <HListBox
                as="div"
                className={classNames(styles.ListBox, { [styles.disabled]: readonly }, [className])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBox.Button className={styles.trigger}>
                    <Button disabled={readonly}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(styles.options, {}, [mapDirectionClasses[direction]])}>
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        styles.item,
                                        {
                                            [styles.active]: active,
                                            [styles.disabled]: item.disabled,
                                        },
                                        [],
                                    )}
                                >
                                    {selected && <Icon className={styles.checkIcon} Svg={Check} />}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>

    );
}
