import { useEffect, useState } from "react";

export default function useDebounce(tracker, delay){
    const [debounceValue, setDebounceValue] = useState('')

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebounceValue(tracker)
        },delay)

        return ()=> clearTimeout(handler)

    }, [tracker, delay])

    return debounceValue;
}