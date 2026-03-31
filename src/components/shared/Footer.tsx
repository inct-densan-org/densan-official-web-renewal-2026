import {notoSansJP} from "@/utils/fonts";
import Link from "next/link";

export default function Footer() {

    return (
        <footer
            // classNameに動的に生成した背景クラスを結合
            className={`${notoSansJP.className} `}
        >
            <div className={"w-full bg-[#a6a6a6] font-extralight text-white flex justify-center py-4 gap-4 underline-offset-4  underline flex-wrap px-12"}>
                <a
                    href="#about"
                    // SP(展開時)は常に青系、PCはスクロール状態に応じて色が変化
                    className={`font-thin tracking-widest`}
                >
                    About
                </a>

                <a
                    href="#groups"
                    className={`font-thin tracking-widest`}
                >
                    Groups
                </a>

                <a
                    href="#activities"
                    className={`font-thin tracking-widest`}
                >
                    Activities
                </a>

                <a
                    href="#gallery"
                    className={`font-thin tracking-widest`}
                >
                    Gallery
                </a>
                <a
                    href="https://x.com/inct_densan" target={"_blank"}
                    className={`font-thin tracking-widest`}
                >
                    X
                </a>

                <a
                    href="https://github.com/inct-densan-org" target={"_blank"}
                    className={`font-thin tracking-widest`}
                >
                    GitHub
                </a>
            </div>
            <div className={"w-full bg-[#888888] text-center text-white py-4 "}>
                <Link href="/#"
                      className={`font-thin tracking-widest `}>
                    一関高専電算部
                </Link>
            </div>

        </footer>
    );
}