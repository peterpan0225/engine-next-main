const live = process.env.NODE_ENV === "development" ? false : true;

export const siteUrl =
  process.env.NEXT_PUBLIC_BASE_URL || `https://dynamicbusiness.com`;
export const AnylitcsID = live
  ? process.env.NEXT_PUBLIC_ANALYTICS_ID
  : `UA-1089697-4`;
export const TagmanagerID = live
  ? process.env.NEXT_PUBLIC_TAGMANNAGER_ID
  : `GTM-T9WVXVC`;

export const modalModes = {
  comments: {
    name: "comments",
    title: "Sign in to Comment",
  },
};
export const Analytics4ID = process.env.NEXT_PUBLIC_GA_4_ID;

export const slackCommentsNotificationsChannel = "C03K2PU1JJJ";
export const slackLoginNotificationsChannel = "C013BDHPT71";
