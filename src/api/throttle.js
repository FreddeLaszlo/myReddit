export function throttleAsync(fn, wait) {
    throttleAsync.lastRun = throttleAsync.lastRun || 0;
    //throttleAsync.params = throttleAsync.params || '';

    async function throttled(...args) {
        const currentWait = throttleAsync.lastRun + wait - Date.now();
        const shouldRun = currentWait <= 0;

        if (shouldRun) {
            throttleAsync.lastRun = Date.now();
            return await fn(...args);
        } else {
            return await new Promise(function(resolve) {
              setTimeout(function() {
                resolve(throttled(...args));
              }, currentWait);
            });
        }
    }

    return throttled;
}