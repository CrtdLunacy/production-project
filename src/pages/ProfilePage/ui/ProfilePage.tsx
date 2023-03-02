import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ReducersList, useDynamicModuleLoad } from 'shared/lib/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { profileReducer } from 'enteties/Profile';

interface ProfilePageProps {
  className?: string
}

const initialReducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = memo(({ className }: ProfilePageProps) => {
    const { t } = useTranslation();
    const dynamicModule = useDynamicModuleLoad({
        reducers: initialReducers,
    });

    return (
        <div className={classNames('', {}, [className])}>
            {t('PROFILE')}
        </div>
    );
});

export default ProfilePage;
