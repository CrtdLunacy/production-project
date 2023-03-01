import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import styles from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error'
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
}

const Text: FC<TextProps> = (props) => {
    const {
        className, title, text, theme = TextTheme.PRIMARY,
    } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(styles.Text, {}, [className, styles[theme]])}>
            {title && <p className={styles.title}>{title}</p>}
            {text && <p className={styles.text}>{text}</p>}
        </div>
    );
};

export default Text;