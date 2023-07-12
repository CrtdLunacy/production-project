import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './RatingCard.module.scss';
import Card from '@/shared/ui/Card/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import Text from '@/shared/ui/Text/Text';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import Modal from '@/shared/ui/Modal/Modal';
import Input from '@/shared/ui/Input/Input';
import Button, { ButtonTheme } from '@/shared/ui/Button/Button';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface RatingProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard = memo((props: RatingProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onAccept,
        onCancel,
    } = props;
    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(0);
    const [feedback, setFeedback] = useState('');
    const isMobile = useDevice();

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsCount);
        }
    }, [hasFeedback, onAccept]);

    const handleAccept = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <VStack max gap="32">
            <Text title={feedbackTitle} />
            <Input value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')} />
            <HStack gap="16" justify="between">
                <Button onClick={handleAccept} theme={ButtonTheme.OUTLINE}>
                    {t('Оставить отзыв о статье')}
                </Button>
                <Button onClick={handleCancel} theme={ButtonTheme.OUTLINE_RED}>
                    {t('Закрыть')}
                </Button>
            </HStack>
        </VStack>
    );

    return (
        <Card className={classNames(styles.RatingCard, {}, [className])}>
            <VStack
                align="center"
                gap="10"
            >
                <Text title={title} />
                <StarRating size={40} onSelect={onSelectStars} />
            </VStack>

            {isMobile
                ? (
                    <Drawer isOpen={isModalOpen} onClose={handleCancel}>
                        {modalContent}
                    </Drawer>
                )
                : (
                    <Modal isOpen={isModalOpen}>
                        {modalContent}
                    </Modal>
                )}
        </Card>
    );
});
