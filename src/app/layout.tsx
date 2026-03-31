import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "一関高専 電子計算機部",
    description: "一関高専電算部の公式WEBサイトです. \n独立行政法人国立高等専門学校機構 一関工業高等専門学校 電子計算機部",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ja"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth scroll-pt-16`}
        >
        <body className="relative min-h-full flex flex-col">
        <Header/>

        <main className="flex-1">
            {children}
        </main>

        <Footer/>
        </body>
        </html>
    );
}