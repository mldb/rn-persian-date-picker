// @flow
export const toFaDigit = (
  input: string = "0",
  separator: Boolean = false,
  separatorStr: string = ",",
  sectionCount: number = 3
): string => {
  return input != null
    ? ("" + input).replace(
        /\d+/g,
        (digit: string): string => {
          let ret = "";
          for (let i = 0, len = digit.length; i < len; i += 1) {
            if (checkRtl())
              ret += String.fromCharCode(digit.charCodeAt(i) + 1728);
            else ret += String.fromCharCode(digit.charCodeAt(i));
            if (
              separator &&
              (i + 1) % sectionCount == len % sectionCount &&
              i < len - 1
            ) {
              ret += separatorStr;
            }
          }
          return ret;
        }
      )
    : "";
};
export const convertNumberToEnglish = input => {
  if (!input) {
    return "";
  }
  let ret = "";
  for (let i = 0; i < input.length; i += 1) {
    ret += FaEnDigit[input[i]] || ArEnDigit[input[i]] || input[i];
  }
  return ret;
};

import { Platform, PixelRatio } from "react-native";

export const veryVerySmallFont = normalize(10);
export const verySmallFont = normalize(12);
export const smallFont = normalize(14);
export const mediumFont = normalize(16);
export const largFont = normalize(18);
export const xlargFont = normalize(22);
export const xxlargFont = normalize(25);
export const xxxlargFont = normalize(28);
export const veryLargFont = normalize(30);
export const ultraLarge = normalize(32);
export const xUltraLarge = normalize(35);
export const xxUltraLarge = normalize(40);
export const xxxUltraLarge = normalize(48);
export const primaryFontFamily = "IRANSans";
export const secondaryFontFamily = "IRANSans";
export const weightUltraLight = "UltraLight";
export const weightLight = "Light";
export const weightMedium = "Medium";
export const weightBold = "Bold";

export function normalize(size: number): number {
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  }
  return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
}

const fontWeights = {
  Black: "900",
  Bold: "700",
  Medium: "400",
  Light: "300",
  UltraLight: "100"
};

type fontWeightType =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export const fontMaker = (
  fontFamily: string,
  weight: string
): {
  fontFamily: string,
  fontWeight?: fontWeightType
} => {
  if (Platform.OS === "android") {
    if (fontFamily === "IRANSans") {
      return {
        fontFamily:
          weight === weightMedium ? `${fontFamily}` : `${fontFamily}_${weight}`
      };
    }
    return {
      fontFamily:
        weight === weightMedium ? fontFamily : `${fontFamily}_${weight}`
    };
  }
  const outWeight = fontWeights[weight];
  return {
    fontFamily,
    fontWeight: outWeight
  };
};
const ArEnDigit = {
  "٠": "0",
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9"
};
const FaEnDigit = {
  "۰": "0",
  "۱": "1",
  "۲": "2",
  "۳": "3",
  "۴": "4",
  "۵": "5",
  "۶": "6",
  "۷": "7",
  "۸": "8",
  "۹": "9"
};
