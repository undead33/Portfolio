import { useRef, useEffect } from 'react';

const useUnload = (fn: (e: any) => void) => {
    const cb = useRef(fn); // init with fn, so that type checkers won't assume that current might be undefined
    const onUnload = (e: any) => {
        console.log('onUnload')/////////////
        cb.current?.(e);
    };

    useEffect(() => {
        cb.current = fn;
    }, [fn]);

    useEffect(() => {
        window.addEventListener("beforeunload", onUnload);

        return () => window.removeEventListener("beforeunload", onUnload);
    }, []);
};

export default useUnload;
