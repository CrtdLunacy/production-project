import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ReducersList, useDynamicModuleLoad } from 'shared/lib/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Currency } from 'enteties/Currency';
import { Country } from 'enteties/Country';
import Text, { TextTheme } from 'shared/ui/Text/Text';
import { ProfileCard } from 'enteties/Profile';
import { VStack } from 'shared/ui/Stack';
import EditableProfileCardHeader
    from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import {
    getProfileValidateErrors,
} from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import {
    getProfileIsLoading,
} from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { ValidateProfileError } from '../../model/const/const';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

const initialReducers: ReducersList = {
    profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    const dynamicModule = useDynamicModuleLoad({
        reducers: initialReducers,
    });

    const form = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorTranslate = {
        [ValidateProfileError.SERVER_ERROR]: t('Ошибка сервера'),
        [ValidateProfileError.INCORRECT_CITY]: t('Ошибка города'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Ошибка фио'),
        [ValidateProfileError.NO_DATA]: t('Ошибка отсутствия данных'),
        [ValidateProfileError.INCORRECT_AGE]: t('Ошибка возраста'),
    };

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    const handleChangeFirstName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ first: value || '' }));
    }, [dispatch]);

    const handleChangeLastName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ lastname: value || '' }));
    }, [dispatch]);

    const handleChangeAge = useCallback((value?: string) => {
        if (!/[^\d]/g.test(value || '')) {
            dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
        }
    }, [dispatch]);

    const handleChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ city: value || '' }));
    }, [dispatch]);

    const handleChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }));
    }, [dispatch]);

    const handleChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }));
    }, [dispatch]);

    const handleChangeCurrency = useCallback((currency?: Currency) => {
        dispatch(profileActions.updateProfile({ currency }));
    }, [dispatch]);

    const handleChangeCountry = useCallback((country?: Country) => {
        dispatch(profileActions.updateProfile({ country }));
    }, [dispatch]);

    return (
        <VStack gap="10" max className={classNames('', {}, [className])}>
            <EditableProfileCardHeader />
            {validateErrors?.length && validateErrors.map((e) => (
                <Text
                    data-testid="EditableProfileCard.Error"
                    key={e}
                    theme={TextTheme.ERROR}
                    text={validateErrorTranslate[e]}
                />
            ))}
            <ProfileCard
                data={form}
                isLoading={isLoading}
                error={error}
                onChangeFirst={handleChangeFirstName}
                onChangeLast={handleChangeLastName}
                onChangeAge={handleChangeAge}
                onChangeCity={handleChangeCity}
                onChangeUsername={handleChangeUsername}
                onChangeAvatar={handleChangeAvatar}
                onChangeCurrency={handleChangeCurrency}
                onChangeCountry={handleChangeCountry}
                readonly={readonly}
            />
        </VStack>
    );
});
