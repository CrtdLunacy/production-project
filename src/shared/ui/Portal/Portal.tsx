import {
    MutableRefObject,
    ReactNode, RefObject, useEffect, useRef, useState,
} from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal = (props: PortalProps) => {
    const {
        children,
    } = props;
    const ref = useRef<Element | null | undefined>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.querySelector('#root') || undefined;
        setMounted(true);
    }, []);

    return mounted && ref.current ? createPortal(children, ref.current) : null;
};

export default Portal;
