import {useCallback, useEffect, useMemo, useState} from "react";

export const useDocumentVisibility = () => {
    const [count, setCount] = useState(0);

    const [isVisible, setIsVisible] = useState(() => document.visibilityState === 'visible');

    const onVisibleChange = useCallback((callback: (isVisible: boolean) => void) => {
        let callbackSubscription: ((isVisible: boolean) => void) | null  = callback;

        callbackSubscription(isVisible);

        return () => { callbackSubscription = null };
    }, [isVisible]);

    useEffect(() => {
        // document.addEventListener('visibilitychange', () => {
        //     if(document.visibilityState === 'hidden') {
        //         setIsVisible(false);
        //         setCount(count => count + 1);
        //     } else {
        //         setIsVisible(true);
        //     }
        // });
    }, []);

    return useMemo(() => {
        return {
            count: count,
            visible: isVisible,
            onVisibilityChange: onVisibleChange,
        }
    }, []);
};