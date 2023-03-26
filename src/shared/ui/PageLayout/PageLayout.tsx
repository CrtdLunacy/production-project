import { classNames } from 'shared/lib/classNames/classNames';
import { MutableRefObject, ReactNode, useRef } from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
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

    useInfiniteScroll({
        callback: onScrollEnd,
        triggerRef,
        wrapperRef,
    });

    return (
        <section ref={wrapperRef} className={classNames(styles.PageLayout, {}, [className])}>
            {children}
            <div ref={triggerRef} />
        </section>
    );
};

export default PageLayout;
