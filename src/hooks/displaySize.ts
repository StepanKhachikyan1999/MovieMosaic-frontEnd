import {useEffect, useState} from 'react'

interface DisplaySize {
    width: number;
    height: number;
}

const useDisplaySize = (): DisplaySize => {
    const [displaySize, setDisplaySize] = useState<DisplaySize>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setDisplaySize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    return displaySize;
};

export default useDisplaySize
