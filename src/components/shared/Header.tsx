"use client"; // スクロール監視(useEffect)を使うために必須

import { useEffect, useState } from "react";
import Link from "next/link";
import { notoSansJP } from "@/utils/fonts";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // SPは17svh、PCは25svhでトップに到達するため、その少し手前で背景を切り替える
            const threshold = window.innerWidth >= 768 ? window.innerHeight * 0.25 : window.innerHeight * 0.17;
            if (window.scrollY > threshold - 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        closeMenu();
        if (window.location.pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.pushState(null, "", "/");
        }
    };

    // --- デザイン(文字色・背景色)の設定 ---
    const headerBgClass = isScrolled
        ? "bg-gray-50/30 backdrop-blur-lg shadow-sm"
        : "bg-transparent";

    // タイトルロゴ: PC/SPともに、最初は白、スクロールで青
    const titleColorClass = isScrolled
        ? "text-primary hover:text-primary/70"
        : "text-white md:text-white hover:text-white/80";
    
    // SPは白背景のドロワー内に出るため常に青。PCは最初は透明背景に乗るため白、スクロールで青。
    const textColorClass = isScrolled
        ? "text-primary hover:text-primary/70"
        : "text-primary md:text-white hover:text-white/80";

    // ハンバーガーアイコン: 最初は白、スクロールで青
    const menuIconColorClass = isScrolled
        ? "text-primary hover:text-primary/70"
        : "text-white hover:text-white/80";

    return (
        <header
            // mt-[17svh] 等の配置ロジックは維持
            className={`${notoSansJP.className} font-extralight h-16 w-full z-50 transition-colors duration-300 sticky top-0 mt-[17svh] md:mt-[25svh] -mb-16 ${headerBgClass}`}
        >
            <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-[1vw] md:max-w-full md:mx-[6vw] md:px-8">

                <div className={`z-50 relative transition-opacity duration-300 ${isMenuOpen ? "opacity-0 md:opacity-100" : "opacity-100"}`}>
                    <Link
                        href="/"
                        onClick={handleLogoClick}
                        scroll={false}
                        className={`text-xl font-extralight tracking-widest transition-colors duration-300 ${titleColorClass}`}
                    >
                        一関高専電算部
                    </Link>
                </div>

                <button
                    onClick={toggleMenu}
                    className={`z-50 block cursor-pointer md:hidden transition-all duration-300 ${menuIconColorClass} ${isMenuOpen ? "opacity-0 pointer-events-none" : ""}`}
                    aria-label="メニューを開く"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                    </svg>
                </button>

                <nav
                    className={`fixed top-0 right-0 w-full h-screen bg-gray-50 flex flex-col items-center justify-center space-y-8 transform transition-transform duration-300 ease-in-out md:static md:w-auto md:h-full md:bg-transparent md:flex-row md:space-y-0 md:space-x-8 md:p-0 md:transition-none z-40 ${isMenuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}
                >
                    <a href="#about" onClick={closeMenu}
                       className={`text-lg font-thin tracking-widest ${textColorClass} transition-colors duration-300 md:text-sm`}>
                        About
                    </a>
                    <a href="#groups" onClick={closeMenu}
                       className={`text-lg font-thin tracking-widest ${textColorClass} transition-colors duration-300 md:text-sm`}>
                        Groups
                    </a>
                    <a href="#activities" onClick={closeMenu}
                       className={`text-lg font-thin tracking-widest ${textColorClass} transition-colors duration-300 md:text-sm`}>
                        Activities
                    </a>
                    <a href="#gallery" onClick={closeMenu}
                       className={`text-lg font-thin tracking-widest ${textColorClass} transition-colors duration-300 md:text-sm`}>
                        Gallery
                    </a>
                    <a href="https://x.com/inct_densan" target="_blank" rel="noopener noreferrer" onClick={closeMenu}
                       className={`text-lg font-thin tracking-widest ${textColorClass} transition-colors duration-300 md:text-sm`}>
                        X
                    </a>
                    <a href="https://github.com/inct-densan-org" target="_blank" rel="noopener noreferrer"
                       onClick={closeMenu}
                       className={`text-lg font-thin tracking-widest ${textColorClass} transition-colors duration-300 md:text-sm`}>
                        GitHub
                    </a>

                    <button onClick={closeMenu}
                            className="absolute top-4 right-4 cursor-pointer md:hidden text-gray-500 hover:text-primary transition-colors"
                            aria-label="メニューを閉じる">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </nav>

            </div>
        </header>
    );
}