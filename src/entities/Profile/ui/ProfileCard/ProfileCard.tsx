import { useTranslation } from 'react-i18next';
import { Profile } from '../../../Profile';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { CountrySelect, Country } from '@/entities/Country';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import Text, { TextAlign, TextTheme } from '@/shared/ui/Text/Text';
import Input from '@/shared/ui/Input/Input';
import Loader from '@/shared/ui/Loader/Loader';
import Avatar from '@/shared/ui/Avatar/Avatar';
import { HStack, VStack } from '@/shared/ui/Stack';
import styles from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  onChangeFirst?: (value?: string) => void;
  onChangeLast?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCurrency?: (value?: Currency) => void;
  onChangeCountry?: (value?: Country) => void;
  readonly?: boolean
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        onChangeFirst,
        onChangeLast,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
        readonly,
    } = props;
    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <HStack justify="center" max className={classNames(styles.ProfileCard, { [styles.loading]: true }, [className])}>
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack justify="center" max className={classNames(styles.ProfileCard, {}, [className, styles.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Ошибка профиля')}
                    text={t('Обновите страницу')}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }

    const mods: Mods = {
        [styles.editing]: !readonly,
    };

    return (
        <VStack max gap="10" className={classNames(styles.ProfileCard, mods, [className])}>
            {data?.avatar && (
                <HStack justify="end" max>
                    <Avatar src={data.avatar} alt="Profile img" />
                </HStack>
            )}
            <Input
                value={data?.first}
                placeholder={t('Ваше имя')}
                onChange={onChangeFirst}
                readOnly={readonly}
                data-testid="ProfileCard.Name"
            />
            <Input
                value={data?.lastname}
                placeholder={t('Ваша фамилия')}
                onChange={onChangeLast}
                readOnly={readonly}
                data-testid="ProfileCard.Surname"
            />
            <Input
                value={data?.age}
                placeholder={t('Ваш возраст')}
                onChange={onChangeAge}
                readOnly={readonly}
                data-testid="ProfileCard.Age"
            />
            <Input
                value={data?.city}
                placeholder={t('Город')}
                onChange={onChangeCity}
                readOnly={readonly}
                data-testid="ProfileCard.City"
            />
            <Input
                value={data?.username}
                placeholder={t('Имя пользователя')}
                onChange={onChangeUsername}
                readOnly={readonly}
                data-testid="ProfileCard.Username"
            />
            <Input
                value={data?.avatar}
                placeholder={t('Аватар')}
                className={styles.input}
                onChange={onChangeAvatar}
                readOnly={readonly}
                data-testid="ProfileCard.Avatar"
            />
            <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </VStack>
    );
};

export default ProfileCard;
