import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import Input from '@/shared/ui/Input/Input';
import Button, { ButtonTheme } from '@/shared/ui/Button/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ReducersList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { HStack } from '@/shared/ui/Stack';
import {
    getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice';
import styles from './AddCommentForm.module.scss';

interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const initialReducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const dynamicModule = useDynamicModuleLoad({
        reducers: initialReducers,
    });
    const { className, onSendComment } = props;
    const { t } = useTranslation('article');
    const text = useSelector(getAddCommentFormText);
    const dispatch = useAppDispatch();

    const handleCommentText = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

    const handlerSend = useCallback(() => {
        onSendComment(text || '');
        handleCommentText('');
    }, [handleCommentText, onSendComment, text]);

    return (
        <HStack max justify="between" className={classNames(styles.AddCommentForm, {}, [className])}>
            <Input
                className={styles.input}
                placeholder={t('Текст комментария')}
                value={text}
                onChange={handleCommentText}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={handlerSend}
            >
                {t('Отправить')}
            </Button>
        </HStack>
    );
});

export default AddCommentForm;
