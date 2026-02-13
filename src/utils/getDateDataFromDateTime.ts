
export function getDateDataFromDateTime(timeStamp: string): Date {
    const year = parseInt(timeStamp.slice(0, 4));
    const month = parseInt(timeStamp.slice(4, 6));
    const dayOfMonth = parseInt(timeStamp.slice(6, 8));
    const hour = parseInt(timeStamp.slice(9, 11));
    const minute = parseInt(timeStamp.slice(11, 13));
    const second = parseInt(timeStamp.slice(13, 15));

    const offsetDateTimeUTC = new Date(
        Date.UTC(year, month - 1, dayOfMonth, hour, minute, second)
    );

    return offsetDateTimeUTC;
}

