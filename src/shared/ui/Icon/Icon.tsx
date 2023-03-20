import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React from 'react';
import styles from './Icon.module.scss';

interface IconProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGElement>>;
}

const Icon = (props: IconProps) => {
    const { className, Svg } = props;

    return (
        <Svg className={classNames(styles.Icon, {}, [className])} />
    );
};

export default Icon;
