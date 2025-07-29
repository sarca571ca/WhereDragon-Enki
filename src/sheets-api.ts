import { google } from "googleapis";
import path from "path";
import * as dotenv from "dotenv";
import { ParsedWindowsPerMember } from "./models";
dotenv.config();

// Load credentials from JSON file
const CREDENTIALS_PATH = path.join(__dirname, "../credentials.json");
const SCOPES = [`${process.env.SCOPES_URL}`];
// The ID of the spreadsheet to update
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_NAME = "DKP Entry";
const SIGN_UP_SHEET_NAME = "Camp Sign Ups";

const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: SCOPES,
});

/** WARNING: NEVER USE THE GOOGLE SHEETS API WITHOUT A `SHEET_NAME` IN THE RANGE ENTRY */
/** DO NOT WANT TO RISK WRITING TO THE WRONG SHEET AND CLEARING OUT DATA */

const sheets = google.sheets({ version: "v4", auth });

const SIGN_UP_HNM_RANGE_MAP: Record<string, string> = {
  "kv-signup": `${SIGN_UP_SHEET_NAME}!A4:C50`,
  "shiki-signup": `${SIGN_UP_SHEET_NAME}!E4:G50`,
  "bloodsucker-signup": `${SIGN_UP_SHEET_NAME}!I4:K50`,
  "jorm-signup": `${SIGN_UP_SHEET_NAME}!Q4:S50`,
  "vrtra-signup": `${SIGN_UP_SHEET_NAME}!M4:O50`,
};

const emojiRegex = /[\p{Emoji_Presentation}|\p{Extended_Pictographic}]/gu;

export const WDSheetsAPI = {
  clear: async (range: string) => {
    if (range.includes("!")) return;
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!${range}`,
    });
  },
  clearRangeWithDefaultValue: async (
    range: string,
    rowCount: number = 218,
    columnCount: number = 1,
    value: string = "FALSE"
  ) => {
    if (range.includes("!")) return;
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        data: {
          range: `${SHEET_NAME}!${range}`,
          //range: `DKP Entry!E5:E223`,
          values: Array.from({ length: rowCount }, () =>
            Array(columnCount).fill(value)
          ),
        } as any,
        valueInputOption: "USER_ENTERED",
      },
    });
  },
  batchUpdateMemberRows: async (
    requests: {
      range: string;
      values: string[][];
    }[]
  ) => {
    const response = await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        data: requests,
        valueInputOption: "USER_ENTERED",
      },
    });

    console.log(`Cells updated: ${response.data.totalUpdatedRows}`);
  },
  readSignupSheet: async (
    channelName:
      | "kv-signup"
      | "shiki-signup"
      | "bloodsucker-signup"
      | "jorm-signup"
      | "vrtra-signup"
  ) => {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: SIGN_UP_HNM_RANGE_MAP[channelName.replace(emojiRegex, "").trim()],
    });

    const data = response.data.values || [];
    const kvMap: Record<string, { priority: string; date: string }> = {};

    console.log("??", data);
    data.forEach(([name, priority, date]) => {
      if (name && priority) {
        kvMap[name.trim()] = { priority: priority.trim(), date: date?.trim() };
      }
    });

    return kvMap;
  },
};

export const generateDKPEntryHeaderEntries = (
  channelName: string,
  hnmSheetValue: string,
  isClaimed: boolean
) => {
  return [
    {
      range: `${SHEET_NAME}!A1:A1`, // channel name
      values: [[`#${channelName}`]],
    },
    {
      range: `${SHEET_NAME}!E1:I2`, //
      values: [[hnmSheetValue]],
    },
    {
      range: `${SHEET_NAME}!A3:B3`, //
      values: [["=NOW()"]],
    },
    {
      range: `${SHEET_NAME}!E3`, // Claim
      values: [[isClaimed ? "TRUE" : "FALSE"]],
    },
  ];
};

export const generateDKPEntryMemberRowEntries = (
  windowsPerMember: ParsedWindowsPerMember,
  isClaimed: boolean
) => {
  const requests: { range: string; values: string[][] }[] = [];

  Object.keys(windowsPerMember)
    .sort(alphaSort)
    .forEach((name, index) => {
      requests.push({
        range: `${SHEET_NAME}!B${index + 5}`,
        values: [[name]],
      });
      requests.push({
        range: `${SHEET_NAME}!D${index + 5}`,
        values: [[`${windowsPerMember[name].windows}`]],
      });

      // C+K Column
      requests.push({
        range: `${SHEET_NAME}!E${index + 5}`,
        values: [
          [
            isClaimed &&
            windowsPerMember[name].xKill &&
            windowsPerMember[name].xClaim
              ? "TRUE"
              : "FALSE",
          ],
        ],
      });

      // KO Column
      requests.push({
        range: `${SHEET_NAME}!F${index + 5}`,
        values: [
          [
            isClaimed &&
            windowsPerMember[name].xKill &&
            !windowsPerMember[name].xClaim
              ? "TRUE"
              : "FALSE",
          ],
        ],
      });
    });

  return requests;
};

const alphaSort = (a: string, b: string) => {
  return a.localeCompare(b);
};
