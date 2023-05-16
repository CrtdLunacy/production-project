import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback } from 'react';
import CopyIcon from 'shared/assets/icons/copy.svg';
import Button, { ButtonTheme } from '../Button/Button';
import styles from './Code.module.scss';

interface CodeProps {
  className?: string;
  text: string;
}

const Code = (props: CodeProps) => {
    const { className, text } = props;

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(styles.Code, {}, [className])}>
            <Button
                onClick={handleCopy}
                theme={ButtonTheme.CLEAR}
                className={styles.copyBtn}
            >
                <CopyIcon className={styles.copyIcon} />
            </Button>
            <code>
                {text}
            </code>
        </pre>
    );
};

export default Code;
