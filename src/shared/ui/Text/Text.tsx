import { FC, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import styles from './Text.module.scss';
import { TextAlign, TextSize, TextTheme } from './consts';

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
  'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h4',
    [TextSize.M]: 'h3',
    [TextSize.L]: 'h2',
    [TextSize.XL]: 'h1',
};

export const Text: FC<TextProps> = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
        'data-testid': dataTestId = 'Text',
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];

    const mods: Mods = {
        [styles[align]]: true,
        [styles[size]]: true,
    };

    return (
        <div className={classNames(styles.Text, mods, [className, styles[theme]])}>
            {title && (
                <HeaderTag
                    data-testid={`${dataTestId}.Header`}
                    className={styles.title}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p
                    data-testid={`${dataTestId}.Paragraph`}
                    className={styles.text}
                >
                    {text}
                </p>
            )}
        </div>
    );
});
