"use client"; // スクロール監視(useEffect)を使うために必須

import { useState, useEffect } from "react";
import Link from "next/link";
import { notoSansJP } from "@/utils/fonts";

export default function Header() {
    // スクロール状態を管理するstate (true: スクロールされた状態)
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // スクロール量が50pxを超えたら isScrolled を true にする
            // ヒーローセクションの高さに合わせて数値(50)は調整してください
            if (window.scrollY > 200) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // スクロールイベントのリスナーを登録
        window.addEventListener("scroll", handleScroll);

        // 初期描画時にも一度判定を実行
        handleScroll();

        // クリーンアップ関数
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // スクロール状態に応じたクラス名を動的に生成
    const headerBgClass = isScrolled
        ? "fixed top-0 bg-gray-50/30 backdrop-blur-lg shadow-sm transition-none" // 下にスクロールした時 (白・すりガラス)
        : "absolute top-[25dvh] md:top-[17dvh] bg-transparent "; // ヒーローセクション内 (透明)

    const textColorClass = isScrolled
        ? "text-primary hover:text-primary/70" // 下にスクロールした時 (青系)
        : "text-white hover:text-white/80 "; // ヒーローセクション内  (白)
    
    const menuIconColorClass = isScrolled
        ? "text-primary hover:text-primary/70"
        : "text-white hover:text-white/80";

    return (
        <header
            // classNameに動的に生成した背景クラスを結合
            className={`${notoSansJP.className}   font-extralight  inset-x-0 z-50 transition-all duration-300 ${headerBgClass}`}
        >
            <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-[3vw] md:max-w-full md:mx-[6vw] md:px-8">

                <div className="z-50">
                    <Link href="/" className={`text-xl font-extralight tracking-widest transition-colors duration-300 ${textColorClass}`}>
                        一関高専電算部
                    </Link>
                </div>

                {/* 隠しチェックボックス (状態管理の代わり) */}
                <input type="checkbox" id="menu-toggle" className="hidden peer"/>

                {/* ハンバーガーアイコン (SPでのみ表示) */}
                <label
                    htmlFor="menu-toggle"
                    className={`z-50 block cursor-pointer md:hidden peer-checked:opacity-0 peer-checked:pointer-events-none transition-all duration-300 ${menuIconColorClass}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </label>

                {/* ナビゲーションメニュー (右からのスライドイン) */}
                <nav
                    // メニュー展開時の背景はスクロール状態に関わらず白系(bg-gray-50)で固定
                    className="fixed top-0 right-0 w-full h-screen bg-gray-50 flex flex-col items-center justify-center space-y-8 transform translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-in-out md:static md:w-auto md:h-auto md:bg-transparent md:flex-row md:space-y-0 md:space-x-8 md:p-0 md:translate-x-0 md:transition-none z-40"
                >
                    {/* リンクパスと名称を最新のセクション構成に合わせて更新 */}

                    <Link
                        href="/#philosophy"
                        // SP(展開時)は常に青系、PCはスクロール状態に応じて色が変化
                        className={`text-lg font-thin tracking-widest  ${textColorClass} transition-colors duration-300 md:text-sm`}
                    >
                        About
                    </Link>

                    <Link
                        href="/#groups"
                        className={`text-lg font-thin tracking-widest  ${textColorClass} transition-colors duration-300 md:text-sm`}
                    >
                        Groups
                    </Link>

                    <Link
                        href="/#activities"
                        className={`text-lg font-thin tracking-widest  ${textColorClass} transition-colors duration-300 md:text-sm`}
                    >
                        Activities
                    </Link>

                    <Link
                        href="/#gallery"
                        className={`text-lg font-thin tracking-widest  ${textColorClass} transition-colors duration-300 md:text-sm`}
                    >
                        Gallery
                    </Link>
                    <Link
                        href="https://x.com/inct_densan" target={"_blank"}
                        className={`text-lg font-thin tracking-widest  ${textColorClass} transition-colors duration-300 md:text-sm`}
                    >
                        X
                    </Link>
                    <Link
                        href="https://github.com/inct-densan-org" target={"_blank"}
                        className={`text-lg font-thin tracking-widest  ${textColorClass} transition-colors duration-300 md:text-sm`}
                    >
                        GitHub
                    </Link>

                    {/* SPメニュー表示時に閉じる用のバツ印 */}
                    <label
                        htmlFor="menu-toggle"
                        className="absolute top-4 right-4 cursor-pointer md:hidden text-gray-500 hover:text-primary transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </label>
                </nav>

            </div>
        </header>
    );
}