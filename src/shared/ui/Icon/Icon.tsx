import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement>{
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGElement>>;
}

const Icon = (props: IconProps) => {
    const { className, Svg, ...otherProps } = props;

    return (
        <Svg
            className={classNames(styles.Icon, {}, [className])}
            {...otherProps}
        />
    );
};

export default Icon;
