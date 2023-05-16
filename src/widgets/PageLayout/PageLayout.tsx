import { classNames } from 'shared/lib/classNames/classNames';
import {
    MutableRefObject, ReactNode, UIEvent, UIEventHandler, useRef,
} from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getSaveScrollPositionByPath, saveScrollPositionActions } from 'features/SaveScrollPosition';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import styles from './PageLayout.module.scss';

interface PageLayoutProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

const PageLayout = (props: PageLayoutProps) => {
    const { className, children, onScrollEnd } = props;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector(
        (state: StateSchema) => getSaveScrollPositionByPath(state, pathname),
    );

    useInfiniteScroll({
        callback: onScrollEnd,
        triggerRef,
        wrapperRef,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const handleScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(saveScrollPositionActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname,
        }));
    }, 2000);

    return (
        <main
            ref={wrapperRef}
            className={classNames(styles.PageLayout, {}, [className])}
            onScroll={handleScroll}
        >
            {children}
            {onScrollEnd ? <div className={styles.trigger} ref={triggerRef} /> : null}
        </main>
    );
};

export default PageLayout;
