import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement>{
  className?: string;
  children: ReactNode;
}

const Card = (props: CardProps) => {
    const { className, children, ...otherProps } = props;

    return (
        <div
            className={classNames(styles.Card, {}, [className])}
            {...otherProps}
        >
            {children}
        </div>
    );
};

export default Card;
