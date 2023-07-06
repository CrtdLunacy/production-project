import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import Button, { ButtonTheme } from '@/shared/ui/Button/Button';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            className={classNames('', {}, [className])}
            onClick={toggle}
            theme={ButtonTheme.CLEAR}
        >
            {t(short ? 'Короткий язык' : 'Язык')}
        </Button>
    );
});

export default LangSwitcher;
