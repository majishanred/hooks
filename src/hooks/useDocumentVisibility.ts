import {useCallback, useEffect, useRef, useState} from "react";

export const useDocumentVisibility = () => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(() => document.visibilityState === 'visible');

    const callbackRef = useRef<((isVisible: boolean) => void)[]>([]);

    const onVisibilityChange = (callback: (isVisible: boolean) => void) => {
        callbackRef.current.push(callback);

        return () => {
            callbackRef.current = callbackRef.current.filter((func) => func !== callback);
        };
    };

    const eventListener = useCallback(() => {
            if(document.visibilityState === 'hidden') {
                setIsVisible(false);
                setCount(count => count + 1);
            } else {
                setIsVisible(true);
            }
    }, []);

    useEffect(() => {
        document.addEventListener('visibilitychange', eventListener);

        return () => document.removeEventListener('visibilitychange', eventListener);
    }, []);

    useEffect(() => {
        callbackRef.current.forEach((func) => func(isVisible));
    }, [isVisible]);

    return {
        count,
        isVisible,
        onVisibilityChange
    }
};