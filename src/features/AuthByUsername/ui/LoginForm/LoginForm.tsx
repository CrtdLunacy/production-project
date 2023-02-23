import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Button from 'shared/ui/Button/Button';
import Input from 'shared/ui/Input/Input';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string
}

const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(styles.LoginForm, {}, [className])}>
            <Input
                autofocus
                className={styles.inputForm}
                placeholder={t('Введите имя пользователя')}
            />
            <Input
                className={styles.inputForm}
                placeholder={t('Введите пароль')}
            />
            <Button
                className={styles.btnLogin}
            >
                {t('Войти')}
            </Button>
        </div>
    );
};

export default LoginForm;
