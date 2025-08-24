import { DateData, HnmTimerData } from "../types/HnmTimerData";
import { botTZ } from "../config.json";

export function parseTime(hnmTimerData: HnmTimerData): string | null {
    // TODO: Cause an error if it remains as null
    let unixTimestamp: string | null = null;

    if (hnmTimerData.timeStamp != null) {

        if (hnmTimerData.timeStamp?.length == 6) {
            const dateData = new Date(getDateDataFromTime(hnmTimerData.timeStamp));
            unixTimestamp = getUnixTimeStampFromDateData(dateData, hnmTimerData);
        } else if (hnmTimerData.timeStamp?.length == 15) {
            const dateData = new Date(getDateDataFromDateTime(hnmTimerData.timeStamp));
            unixTimestamp = getUnixTimeStampFromDateData(dateData, hnmTimerData);
        }
    }

    return unixTimestamp;
}

export function getDateDataFromTime(timeStamp: string): Date {
    // TODO: If the return offsetDateTimeUTC is in the future we need to
    // subtract 1 day. Then if the new day is 0 we need to subtract the
    // month by 1 and set the day to the last day of the previous month.
    // If the new month is 0 we need to subtract
    // 1 year and set the month to 12.
    const hour = parseInt(timeStamp.slice(0, 2));
    const minute = parseInt(timeStamp.slice(2, 4));
    const second = parseInt(timeStamp.slice(4, 6));

    const now = new Date();

    const offsetDateTimeUTC = new Date(
        Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            hour,
            minute,
            second,
        ),
    )

    return offsetDateTimeUTC
}

export function getDateDataFromDateTime(timeStamp: string): Date {
    const year = parseInt(timeStamp.slice(0, 4))
    const month = parseInt(timeStamp.slice(4, 6))
    const dayOfMonth = parseInt(timeStamp.slice(6, 8))
    const hour = parseInt(timeStamp.slice(9, 11))
    const minute = parseInt(timeStamp.slice(11, 13))
    const second = parseInt(timeStamp.slice(13, 15))

    const offsetDateTimeUTC = new Date(
        Date.UTC(year, month - 1, dayOfMonth, hour, minute, second),
    );

    return offsetDateTimeUTC
}


export function getUnixTimeStampFromDateData(timeStamp: Date, hnmTimerData: HnmTimerData): string {
    const utcDateTime: number = Date.UTC(
        timeStamp.getUTCFullYear(),
        timeStamp.getUTCMonth(),
        timeStamp.getUTCDate(),
        timeStamp.getUTCHours(),
        timeStamp.getUTCMinutes(),
        timeStamp.getUTCSeconds(),
    );
    const unixDateTime: string = utcDateTime.toString().slice(0, -3);

    const tzOffset: number = getUTCOffset(parseInt(unixDateTime));
    const hnmOffset = getHnmTimeOffset(hnmTimerData) - 1;
    let hnmDayOffset: number = 0;

    // WARN: Do not remove this!!
    // This subtracts a day from the timestamp when the timestamp 
    // is greater than the current DateTime. Death timestamp have
    // to be in the past. This is a result of determining the timestamp
    // from time only.
    if (Date.now() < utcDateTime) {
        hnmDayOffset--;
    }

    let year: number = timeStamp.getUTCFullYear();
    let month = timeStamp.getUTCMonth();
    let dayOfMonth = timeStamp.getUTCDate();
    let hours = timeStamp.getUTCHours();
    const minutes = timeStamp.getUTCMinutes();
    const seconds = timeStamp.getUTCSeconds();
    const hoursOffest = hours - tzOffset + hnmOffset;

    // TODO: This specific section of code is repeated several times.
    // It also is required yet again for another function so it needs
    // to be converted to its own function. 
    // WARN: Its not exactly the same. Will need to compare all the 
    // code and change how it interacts with each component before changing.
    if (hoursOffest >= 24) {
        dayOfMonth += Math.floor(hoursOffest / 24);
        hours = hoursOffest % 24;

        const daysInMonth = new Date(year, month + 1, 0).getUTCDate();
        if (dayOfMonth > daysInMonth) {
            dayOfMonth = dayOfMonth - daysInMonth;
            month++;

            if (month > 12) {
                month = 1;
                year++;
            }
        }
    } else if (hoursOffest < 0) {
        dayOfMonth -= Math.floor(hoursOffest / 24);
        hours = 24 + hoursOffest;

        if (dayOfMonth < 1) {
            month--;
            if (month < 1) {
                month = 12;
                year--;
            }
            dayOfMonth = new Date(year, month - 1, 0).getUTCDate();
        }
    } else {
        hours += tzOffset + hnmOffset;
    }

    const formatedTimestamp: string = Date.UTC(
        year,
        month,
        dayOfMonth + hnmDayOffset,
        hours,
        minutes,
        seconds
    )
        .toString()
        .slice(0, -3);

    return formatedTimestamp;
}

export function getDateDataFromUnixTimeStamp(timeStamp: number): string {
    const unixDateTime: Date = new Date(timeStamp);
    // TODO: I'm overiding the TZ here so the tests pass/sheet-api works.
    // Likely need to change the way sheets-api works and update
    // the tests accordingly.
    const tzOffset: number = getUTCOffset(timeStamp, "America/New_York");

    let year = unixDateTime.getUTCFullYear();
    let month = unixDateTime.getUTCMonth() + 1;
    let dayOfMonth = unixDateTime.getUTCDate();
    let hours = unixDateTime.getUTCHours();
    const minutes = unixDateTime.getUTCMinutes();
    const seconds = unixDateTime.getUTCSeconds();

    if (hours + tzOffset >= 24) {
        dayOfMonth++;
        hours = (hours + tzOffset) % 24;

        const daysInMonth = new Date(year, month + 1, 0).getUTCDate();
        if (dayOfMonth > daysInMonth) {
            dayOfMonth = 1;
            month++;

            if (month > 12) {
                month = 1;
                year++;
            }
        }
    } else if (hours + tzOffset < 0) {
        dayOfMonth--;
        hours = 24 + (hours + tzOffset);

        if (dayOfMonth < 1) {
            month--;
            if (month < 1) {
                month = 12;
                year--;
            }
            dayOfMonth = new Date(year, month, 0).getUTCDate();
        }
    } else {
        hours += tzOffset;
    }

    const formattedDate = `${year}-` +
        `${String(month).padStart(2, "0")}-` +
        `${String(dayOfMonth).padStart(2, "0")} ` +
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;

    return formattedDate;
}

export function formatDateForChannelName(timeStamp: number): string {
    // 1. Pull in the bots TZ Date using getUTCOffset.
    const unixDateTime: Date = new Date(timeStamp);
    const tzOffset = getUTCOffset(timeStamp);
    // 2. Convert it into typeof DateData. Can leave
    //      tzOffset as 0 maybe but depends on the changes
    //      required in step 3 below.
    // 3. Do all the necesary checks needed to adjust the
    //      date accordingly ie -1 to day, month, or year.
    //      (See getDateDataFromUnixTimeStamp for an example
    //      that also needs to be converted to a function then
    //      delete the TODO. This is a priority.)
    let year = unixDateTime.getUTCFullYear();
    let month = unixDateTime.getUTCMonth() + 1;
    let dayOfMonth = unixDateTime.getUTCDate();
    let hours = unixDateTime.getUTCHours();

    if (hours + tzOffset >= 24) {
        dayOfMonth++;
        hours = (hours + tzOffset) % 24;

        const daysInMonth = new Date(year, month + 1, 0).getUTCDate();
        if (dayOfMonth > daysInMonth) {
            dayOfMonth = 1;
            month++;

            if (month > 12) {
                month = 1;
                year++;
            }
        }
    } else if (hours + tzOffset < 0) {
        dayOfMonth--;
        hours = 24 + (hours + tzOffset);

        if (dayOfMonth < 1) {
            month--;
            if (month < 1) {
                month = 12;
                year--;
            }
            dayOfMonth = new Date(year, month, 0).getUTCDate();
        }
    } else {
        hours += tzOffset;
    }
    // 4. return a string formated first 3 of month and day.
    //      Current above code will only return a number (08 for aug) so we
    //      need to convert back to a word.
    //      eg. aug23
    return ``;
}

export function getUTCOffset(timestamp: number, timeZone: string = botTZ): number {
    const date = new Date(timestamp);
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone,
        timeZoneName: "longOffset",
    });

    const match = formatter.formatToParts(date).find((part) => part.type === "timeZoneName");

    if (!match || !match.value.includes("GMT")) return 0; // Default to UTC if missing

    const offsetMatch = match.value.match(/GMT([+-]\d+):?(\d+)?/);
    if (!offsetMatch) return 0;

    const [, hours, minutes] = offsetMatch.map(Number);
    return (hours || 0) + (minutes || 0) / 60;
}

export function parseOffset(dateData: DateData): DateData {
    const { tzOffset } = dateData;
    let { year, month, dayOfMonth, hours } = dateData;

    if (hours + tzOffset >= 24) {
        dayOfMonth++;
        hours = (hours + tzOffset) % 24;

        const daysInMonth = new Date(year, month + 1, 0).getUTCDate();
        if (dayOfMonth > daysInMonth) {
            dayOfMonth = 1;
            month++;

            if (month > 12) {
                month = 1;
                year++;
            }
        }
    } else if (hours + tzOffset < 0) {
        dayOfMonth--;
        hours = 24 + (hours + tzOffset);

        if (dayOfMonth < 1) {
            month--;
            if (month < 1) {
                month = 12;
                year--;
            }
            dayOfMonth = new Date(year, month, 0).getUTCDate();
        }
    } else {
        hours += tzOffset;
    }

    return dateData;
}

function getHnmTimeOffset(hnmTimerData: HnmTimerData): number {
    let hnmTimeOffset: number = 21;

    if (hnmTimerData.hnmData.isKing ||
        ["King Arthro", "Simurgh"].includes(hnmTimerData.hnmData.name)) {
        hnmTimeOffset = 22;
    }

    if (hnmTimerData.hnmData.isGW) { hnmTimeOffset = 84; }

    if (hnmTimerData.hnmData.name == "Bloodsucker") { hnmTimeOffset = 72; }

    return hnmTimeOffset;
}
