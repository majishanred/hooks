import {useEffect, useMemo, useState} from "react";

type Keys = 'orientation' |
    'min-resolution' |
    'max-resolution' |
    'min-width' |
    'max-width' |
    'min-height' |
    'max-height'

type MeasureUnits = 'ddpx' | 'px';

type ParseStringQuery<T> = T extends
    `(${Exclude<Keys, 'orientation'>}: ${number}${MeasureUnits})`
    ? T
    : T extends `(orientation: ${'portrait' | 'landscape'})` ? T : never;

export const useMediaQuery = <T,>({ query }: { query: T & ParseStringQuery<T> }) => {
    if(!window) return null;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const mediaQuery = useMemo(() => window.matchMedia(query), [query]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [matches, setMatches] = useState(() => {
        return mediaQuery.matches;
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const eventListener = () => {
            setMatches(mediaQuery.matches);
        };

        mediaQuery.addEventListener('change', eventListener);

        return () => mediaQuery.removeEventListener('change', eventListener);
    }, [mediaQuery]);

    return matches;
};