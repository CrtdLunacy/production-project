import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import AppLink from '../../ui/AppLink/AppLink';
import styles from './Dropdown.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    triggerStyle: string;
    direction?: DropdownDirection;

}

const mapDirectionClasses: Record<DropdownDirection, string> = {
    'bottom left': styles.optionBottomLeft,
    'bottom right': styles.optionBottomRight,
    'top left': styles.optionTopLeft,
    'top right': styles.optionTopRight,
};

export function Dropdown(props: DropdownProps) {
    const {
        className,
        items,
        trigger,
        triggerStyle,
        direction = 'bottom right',
    } = props;

    return (
        <Menu as="div" className={classNames(styles.Dropdown, {}, [className])}>
            <Menu.Button className={classNames(styles.btn, {}, [triggerStyle])}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(styles.menu, {}, [mapDirectionClasses[direction]])}>
                {items.map((item) => {
                    const content = ({ active }: {active: boolean}) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(styles.item, { [styles.active]: active }, [])}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item as={Fragment} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
}
