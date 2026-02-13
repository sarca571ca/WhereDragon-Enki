import test from "tape";
import { HnmCommandData } from "../types/CommandData";
import { HnmTimerData } from "../types/HnmTimerData";
import { getDateDataFromTime, getUnixTimeStampFromDateData, getUTCOffset, parseTime } from "../utils/timeUtils";
import { getDateDataFromDateTime } from "../utils/getDateDataFromDateTime";

test("Function getDateDataFromTime", (t) => {
    const timeStamp: string = "142027";
    const now: Date = new Date();
    const utc: Date = getDateDataFromTime(timeStamp);

    const getDateDataFromTimeResult: string =
        `${utc.getUTCMonth()}-` +
        `${utc.getUTCDate()}-` +
        `${utc.getUTCFullYear()} ` +
        `${utc.getUTCHours()}:` +
        `${utc.getUTCMinutes()}:` +
        `${utc.getUTCSeconds()}`;

    const passResult: string =
        `${now.getUTCMonth()}-` +
        `${now.getUTCDate()}-` +
        `${now.getUTCFullYear()} ` +
        `14:20:27`;

    t.deepEqual(getDateDataFromTimeResult, passResult);
    console.log(`Expect: ${passResult}\nActual: ${getDateDataFromTimeResult}\n`)
    t.end();
});

test("Function getDateDataFromDateTime", (t) => {
    const timeStamp: string = "20250405 142027";
    const utc: Date = getDateDataFromDateTime(timeStamp);

    const getDateDataFromTimeResult: string =
        `${utc.getUTCMonth()}-` +
        `${utc.getUTCDate()}-` +
        `${utc.getUTCFullYear()} ` +
        `${utc.getUTCHours()}:` +
        `${utc.getUTCMinutes()}:` +
        `${utc.getUTCSeconds()}`;

    const passResult: string = "3-5-2025 14:20:27"

    t.deepEqual(getDateDataFromTimeResult, passResult);
    console.log(`Expect: ${passResult}\nActual: ${getDateDataFromTimeResult}\n`)
    t.end();
});

test("Function getUTCOffset", (t) => {
    const dateTimeStandard: number = Date.UTC(2025, 0, 1);
    const dateTimeDST: number = Date.UTC(2025, 5, 1);

    const utc: number = getUTCOffset(Date.now(), "etc/utc");
    const pst: number = getUTCOffset(dateTimeStandard, "america/los_angeles");
    const est: number = getUTCOffset(dateTimeStandard, "america/new_york");
    const pdt: number = getUTCOffset(dateTimeDST, "america/los_angeles");
    const edt: number = getUTCOffset(dateTimeDST, "america/new_york");

    t.deepEqual(utc, 0)
    t.deepEqual(pst, -8)
    t.deepEqual(est, -5)
    t.deepEqual(pdt, -7)
    t.deepEqual(edt, -4)
    t.end();
});

test("Function getUnixTimeStampFromDateData", (t) => {
    const hnmData: HnmCommandData = {
        name: "Adamantoise",
        timerFormat: ":turtle:",
        isKing: true,
        isGW: false,
        hq: "Aspidochelone"
    }

    const hnmTimerData: HnmTimerData = {
        name: hnmData.name,
        day: 4,
        mod: "n",
        timeStamp: "142027",
        hnmData: hnmData,
        isValid: true,
    };

    const timeStamp: string = "20250405 142027";
    const utc: Date = getDateDataFromDateTime(timeStamp);

    const getUnixTimeStampFromDateDataResult: string = getUnixTimeStampFromDateData(utc, hnmTimerData);
    const passResult = "1743880827";
    t.deepEqual(getUnixTimeStampFromDateDataResult, passResult);
    console.log(`Expect: ${passResult}\nActual: ${getUnixTimeStampFromDateDataResult}\n`)
    t.end();
});

test("Adamantoise Time to UTC", (t) => {
    const hnmData: HnmCommandData = {
        name: "Adamantoise",
        timerFormat: ":turtle:",
        isKing: true,
        isGW: false,
        hq: "Aspidochelone"
    }

    const hnmTimerData: HnmTimerData = {
        name: hnmData.name,
        day: 4,
        mod: "n",
        timeStamp: "142027",
        hnmData: hnmData,
        isValid: true,
    };

    const passResult = "1743880827";

    const parseTimeResult: string | null = parseTime(hnmTimerData);
    t.deepEqual(parseTimeResult, passResult);
    console.log(`Expect: ${passResult}\nActual: ${parseTimeResult}\n`)
    t.end();
});

test("Adamantoise DateTime to UTC", (t) => {
    const hnmData: HnmCommandData = {
        name: "Adamantoise",
        timerFormat: ":turtle:",
        isKing: true,
        isGW: false,
        hq: "Aspidochelone"
    }

    const hnmTimerData: HnmTimerData = {
        name: hnmData.name,
        day: 4,
        mod: "n",
        timeStamp: "20250404 142027",
        hnmData: hnmData,
        isValid: true,
    };

    const passResult = "1743880827";

    const parseTimeResult: string | null = parseTime(hnmTimerData);
    t.deepEqual(parseTimeResult, passResult);
    console.log(`Expect: ${passResult}\nActual: ${parseTimeResult}\n`)
    t.end();
});

test("Tiamat DateTime to UTC", (t) => {
    const hnmData: HnmCommandData = {
        name: "Tiamat",
        timerFormat: ":fire::chicken::fire:",
        isKing: false,
        isGW: true,
    }

    const hnmTimerData: HnmTimerData = {
        name: hnmData.name,
        day: 0,
        mod: "n",
        timeStamp: "20250401 221431",
        hnmData: hnmData,
        isValid: true,
    };

    const passResult = "1743873271";

    const parseTimeResult: string | null = parseTime(hnmTimerData);
    t.deepEqual(parseTimeResult, passResult);
    console.log(`Expect: ${passResult}\nActual: ${parseTimeResult}\n`)
    t.end();
});
