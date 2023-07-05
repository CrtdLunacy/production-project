import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { memo, ReactNode } from 'react';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import Portal from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import styles from './Drawer.module.scss';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
    const {
        className, children, onClose, isOpen,
    } = props;
    const { theme } = useTheme();
    const {
        close,
        isClosing,
    } = useModal({
        animationDelay: 300,
        onClose,
        isOpen,
    });

    const mods: Mods = {
        [styles.opened]: isOpen,
        [styles.closed]: isClosing,
    };

    return (
        <Portal>
            <div className={classNames(styles.Drawer, mods, [className, theme, 'app_drawer'])}>
                <Overlay onClick={close} />
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
});
