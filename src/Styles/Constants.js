import { css } from "styled-components";

// COLOR PALLET
export const COLORS = {
  // BLUE
  PRIMARY       : "#ff7e19",
  PRIMARY_DARK  : "#e66300",
  PRIMARY_LIGHT : "#ffaf4e",

  // ORANGE
  SECONDARY       : "#2196f3",
  SECONDARY_DARK  : "#1769aa",
  SECONDARY_LIGHT : "#4dabf5",

  ORANGE_DARK   : "#f78035",
  ORANGE_LIGHT  : "#FAA637",

  //CYAN
  TERTIARY      : "#3A82A7",
  TERTIARY_LIGHT: "#92abbd",

  //RED
  DANGER  : "#d32f2f",

  GREY_TEXT_COLOR : "#707070"
};

// BREAKPOINTS
export const BREAKPOINTS_VALUE = {
  DISPLAY : 1750,
  DESKTOP : 1450, // x_large
  LAPTOP  : 1278, // large
  TABLET  : 960, // medium
  PHABLET : 600, // small
  MOBILE  : 450 // x_small
}
export const BREAKPOINTS = {
  A_DESKTOP : `${BREAKPOINTS_VALUE.DESKTOP}px`,
  A_LAPTOP  : `${BREAKPOINTS_VALUE.LAPTOP}px`,
  A_TABLET  : `${BREAKPOINTS_VALUE.TABLET}px`,
  A_PHABLET : `${BREAKPOINTS_VALUE.PHABLET}px`,
  A_MOBILE  : `${BREAKPOINTS_VALUE.MOBILE}px`,

  DISPLAY : `${BREAKPOINTS_VALUE.DISPLAY - 1}px`,
  DESKTOP : `${BREAKPOINTS_VALUE.DESKTOP - 1}px`, // x_large
  LAPTOP  : `${BREAKPOINTS_VALUE.LAPTOP - 1}px`, // large
  TABLET  : `${BREAKPOINTS_VALUE.TABLET - 1}px`, // medium
  PHABLET : `${BREAKPOINTS_VALUE.PHABLET - 1}px`, // small
  MOBILE  : `${BREAKPOINTS_VALUE.MOBILE - 1}px` // x_small
};

//Fonts

export const FONTS = {
  // PRIMARY         : "Gotham Book",
  // PRIMARY_BOLD    : "Gotham Bold",
  // PRIMARY_LIGHT   : "Gotham Thin",
  // PRIMARY_MEDIUM  : "Gotham Medium",
  // PRIMARY_ITALIC  : "Gotham Book Italic",

  // SECONDARY         : "PolarisCondensed-Book",
  // SECONDARY_MEDIUM  : "PolarisCondensed-Medium",
  // SECONDARY_HEAVY   : "PolarisCondensed-Heavy"
};

export const DIMENSIONS = {
  HEADER : 64,
  SIDEBAR : {
    FULL : 240,
    MINI : 50
  }
}

export const responsive = Object.keys(BREAKPOINTS).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${BREAKPOINTS[label]}) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
