export const addTimeoutInner = (fn, delay, timeoutList) => {
    const id = setTimeout(fn, delay);
    
    if (timeoutList) {
        timeoutList.push(id);
    }

    return id;
}

export const clearTimeouts = (timeoutList) => {
    timeoutList.forEach(clearTimeout);
    timeoutList.length = 0;
}