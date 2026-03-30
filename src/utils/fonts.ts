import {
  Monoton,
  Noto_Sans_JP,
  Noto_Serif_JP,
  Orbitron,
} from "next/font/google"

export const monoton = Monoton({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
})
export const orbitron = Orbitron({ subsets: ["latin"], display: "swap" })
export const notoSansJP = Noto_Sans_JP({
  weight: "300",
  subsets: ["latin"],
  display: "swap",
})
export const notoSerifJP = Noto_Serif_JP({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})
