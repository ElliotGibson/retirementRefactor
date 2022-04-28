export function getStateFromStorage(localStorageKey){
    return typeof window !== 'undefined' && JSON.parse(window?.localStorage?.getItem(localStorageKey));
}

export function setStateToStorage(localStorageKey, state){
    return typeof window !== 'undefined' && window.localStorage.setItem(localStorageKey, JSON.stringify(state));
}