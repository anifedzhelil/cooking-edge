import { useState } from "react"

export const useLogalStorage = (key, initialValue) => {
    
    const [state, setState] = useState(() => {
        const persistedStatedSerialized = localStorage.getItem(key);
        if (persistedStatedSerialized) {
            const persistedStated = JSON.parse(persistedStatedSerialized);
            return persistedStated;
        }

        return initialValue;
    });

    const setLocalStorageState = (value) => {
        setState(value);
        localStorage.setItem(key, JSON.stringify(value));
    }
    return [
        state,
        setLocalStorageState,
    ];

}