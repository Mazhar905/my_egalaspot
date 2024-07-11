import { useRef , useEffect } from 'react';

export default function Loading() {
    const loadingRef = useRef(null);

    useEffect(() => {
        if (loadingRef.current) {
            loadingRef.current.classList.add('hidden');
        }
    }, []);
    return (
        <>
            {/* Loading screen */}
            <div
                ref={loadingRef}
                className="fixed inset-0 z-50 flex items-center justify-center text-white bg-black bg-opacity-50"
                style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
            >
                Loading.....
            </div>
        </>
    )
}
