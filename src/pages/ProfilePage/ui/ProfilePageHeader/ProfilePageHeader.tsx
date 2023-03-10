import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Text from 'shared/ui/Text/Text';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getProfileReadonly, profileActions, updateProfileData } from 'enteties/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import styles from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string
}

const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation('profile');
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const handleEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const handleCancel = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const handleSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <div className={classNames(styles.ProfilePageHeader, {}, [className])}>
            <Text title={t('Профиль')} />
            {readonly
                ? (
                    <Button
                        theme={ButtonTheme.OUTLINE}
                        className={styles.editBtn}
                        onClick={handleEdit}
                    >
                        {t('Редактировать')}
                    </Button>
                )
                : (
                    <>
                        <Button
                            theme={ButtonTheme.OUTLINE_RED}
                            className={styles.cancelBtn}
                            onClick={handleCancel}
                        >
                            {t('Отменить')}
                        </Button>

                        <Button
                            theme={ButtonTheme.OUTLINE}
                            className={styles.saveBtn}
                            onClick={handleSave}
                        >
                            {t('Сохранить')}
                        </Button>
                    </>

                )}
        </div>
    );
};

export default ProfilePageHeader;
