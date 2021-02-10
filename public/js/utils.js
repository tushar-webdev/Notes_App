export const generateTimestamp = () => new Date().valueOf();

export const removeAllChild = parent => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}