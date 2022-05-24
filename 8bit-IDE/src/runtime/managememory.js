export const get_storage = function(key) {
    return Uint8Array.from(sessionStorage.getItem(key).split(','));
}
export const get_storage_other = function(key) {
    return sessionStorage.getItem(key);
}
export const set_storage = function(key, value) {
    sessionStorage.setItem(key, value);
}