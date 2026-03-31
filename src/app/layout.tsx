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
            className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth scroll-pt-16 overflow-x-hidden`}
        >
        <body className="min-h-screen grid grid-cols-1 grid-rows-1">
        <div className="col-start-1 row-start-1 flex flex-col min-h-screen w-full relative z-0">
            <main className="flex-1 w-full">
                {children}
            </main>
            <Footer/>
        </div>
        <div className="col-start-1 row-start-1 w-full pointer-events-none z-50">
            <Header/>
        </div>
        </body>
        </html>
    );
}