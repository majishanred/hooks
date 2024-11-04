import {ReactElement, useEffect, useMemo, useState} from "react";

type MediaQueryProps = {
    orientation?: 'landscape' | 'portrait';
    minResolution?: `${number}ddpx` | number;
    maxResolution?: `${number}ddpx` | number
    minWidth?: `${number}ddpx` | number
    maxWidth?: `${number}ddpx` | number
    minHeight?: `${number}ddpx` | number
    maxHeight?: `${number}ddpx` | number,
    children: ((matches: boolean) => ReactElement);
}

export const MediaQuery = (props: MediaQueryProps) => {
    const query = useMemo(() => {
        const propsArr = Object.entries(props);
        return propsArr.reduce((acc, [prop, value], index ) => {
            if(prop === 'children') return acc;
            return index !== 0
                ? acc += ` and (${prop.replace(/[A-Z]/, (substring) => `-${substring.toLowerCase()}`)}: ${Number.isInteger(value) ? ( value + 'px' ) : value})`
                : acc += `(${prop.replace(/[A-Z]/, (substring) => `-${substring.toLowerCase()}`)}: ${Number.isInteger(value) ? ( value + 'px' ) : value})`
        }, '')
    }, [props]);

    const mediaQuery = useMemo(() => {
        return window.matchMedia(query);
    }, [query]);

    const [matches, setMatches] = useState(() => mediaQuery.matches);

    useEffect(() => {
        const eventListener = () => {
            setMatches(mediaQuery.matches);
        };

        mediaQuery.addEventListener('change', eventListener);

        return () => mediaQuery.removeEventListener('change', eventListener);
    }, [mediaQuery]);

    console.log(props.children);

    return props.children(matches)
};