import { classNames, Mods } from 'shared/lib/classNames/classNames';
import {
    MouseEvent, MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Overlay } from '../Overlay/Overlay';
import Portal from '../Portal/Portal';
import styles from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const ANIMATION_DELAY = 300;

const Modal = (props: ModalProps) => {
    const {
        className, children, isOpen, onClose,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const { theme } = useTheme();

    const mods: Mods = {
        [styles.opened]: isOpen,
        [styles.isClosing]: isClosing,
    };

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timeRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onKeyDown = useCallback((e: globalThis.KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearTimeout(timeRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    if (!isOpen) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(styles.Modal, mods, [className, theme])}>
                <Overlay onClick={closeHandler} />
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};

export default Modal;
