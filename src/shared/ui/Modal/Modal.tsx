import { classNames, Mods } from 'shared/lib/classNames/classNames';
import {
    MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import Portal from '../Portal/Portal';
import styles from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const Modal = (props: ModalProps) => {
    const {
        className, children, isOpen, onClose,
    } = props;

    const {
        close,
        isClosing,
    } = useModal({
        animationDelay: 300,
        onClose,
        isOpen,
    });
    const { theme } = useTheme();

    const mods: Mods = {
        [styles.opened]: isOpen,
        [styles.isClosing]: isClosing,
    };

    if (!isOpen) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(styles.Modal, mods, [className, theme])}>
                <Overlay onClick={close} />
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};

export default Modal;
