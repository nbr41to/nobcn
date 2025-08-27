import { Baloo_2, Fira_Code, Noto_Sans_JP } from "next/font/google";

export const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const baloo2 = Baloo_2({
  variable: "--font-baloo-2",
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});

export const firaCode = Fira_Code({
  variable: "--font-fira-code",
  weight: ["500", "700"],
  style: "normal",
  subsets: ["latin"],
});
