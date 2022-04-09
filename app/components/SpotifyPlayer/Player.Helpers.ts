export const getIDfromURI = (uri: string) =>
    uri.substring(uri.lastIndexOf(':') + 1)

export const formatMilliseconds = (duration: number) => {
    let seconds = Math.round((duration / 1000) % 60)
    let minutes = Math.trunc(duration / 1000 / 60)

    return (
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0')
    )
}
