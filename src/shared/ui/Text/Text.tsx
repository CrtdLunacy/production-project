import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { FC, memo } from 'react';
import styles from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error'
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
}

const Text: FC<TextProps> = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
    } = props;
    const { t } = useTranslation();

    const mods: Mods = {
        [styles[align]]: true,
    };

    return (
        <div className={classNames(styles.Text, mods, [className, styles[theme]])}>
            {title && <p className={styles.title}>{title}</p>}
            {text && <p className={styles.text}>{text}</p>}
        </div>
    );
});

export default Text;
