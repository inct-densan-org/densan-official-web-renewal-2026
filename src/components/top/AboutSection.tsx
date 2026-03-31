"use client"; 
import Image from "next/image";
import {notoSansJP, notoSerifJP} from "@/utils/fonts";
import Link from "next/link";
import { motion } from "motion/react";
import {fadeInVariants} from "@/utils/motionVariants";
import {basePath} from "@/basePath";


export default function AboutSection() {
    return (
        <motion.section
            id="about" className="w-full mb-64 "
            initial="hidden" // 初期状態を設定
            whileInView="visible" // ビューポートに入ったら発火
            viewport={{ once: true, amount: 0.1 }} // 1回だけ、10%見えたら発火
            variants={fadeInVariants} // アニメーション設定を適用
            
        >
            <div className="grid grid-cols-1 md:grid-cols-2">

                {/* --- 1ブロック目: テキストエリア --- */}
                {/* SP: row 1, col 1 (画像1の上に重なる), すりガラス背景 */}
                {/* PC: row 1, col 1, 白背景 */}
                <div
                    className="col-start-1 row-start-1 lg:col-start-1 lg:row-start-1 z-10 flex flex-col justify-center gap-6 text-lg p-10 md:p-16 lg:py-24 lg:px-12 text-primary bg-white/80 backdrop-blur-md lg:bg-white lg:backdrop-blur-none leading-loose">
                    <p className={`${notoSerifJP.className} text-primary text-lg `}>Change the world from your
                        fingertips.</p>
                    <h2 className={`${notoSerifJP.className} tracking-[6px] text-4xl font-extrabold text-primary mb-6 drop-shadow-sm md:drop-shadow-none leading-relaxed `}><span
                        className={"text-white bg-primary  pl-1.5"}>指先</span>から、<span
                        className={"text-white bg-primary  pl-1.5"}>世界</span>を変える。</h2>

                    <p className={`${notoSansJP.className} leading-loose indent-[1em]`}>
                        遠く離れた場所にいる家族や友人とコミュニケーションを取りたいとき、あなたならどうしますか?
                        おそらく、ほとんどの人が電話やメール、SNSなどを想像するでしょう。あるいは速達や電報などを思い浮かべる人もいるかもしれません。
                    </p>
                    <p className={`${notoSansJP.className} leading-loose indent-[1em]`}>
                        では、大昔の人たちはどうしていたのでしょうか?
                        実は、彼らもまた「遠くに情報を届ける方法」を持っていました。最も古い方法が狼煙(のろし)です。空に昇る煙を使って、味方に敵の存在を知らせていたとされています。
                    </p>
                    <p className={`${notoSansJP.className} leading-loose indent-[1em]`}>
                        科学の進歩によって、私達の生きる現代社会には便利なものが溢れています。自動車、飛行機、印刷機、スマートフォン...
                        数えだしたらきりがありません。その中でも異彩を放ち、たった数十年で世界を大きく変えた存在があります。そう、インターネットです。
                    </p>
                    <p className={`${notoSansJP.className} leading-loose indent-[0em]`}>
                        「情報化社会」と呼ばれる今日。大量の情報が海を超え飛び交う中で私達は指先から世界を変えてまいります。
                    </p>
                </div>

                {/* --- 2ブロック目: ポリゴン背景画像 --- */}
                {/* SP: row 1, col 1 (テキスト1の下敷きとして背面に配置) */}
                {/* PC: row 1, col 2 */}
                <div
                    className="col-start-1 row-start-1 md:col-start-2 md:row-start-1 z-0 relative w-full h-full min-h-[50svh] lg:min-h-0 lg:h-auto">
                    <Image
                        src={`${basePath}/resource/crystal-section.webp`}
                        alt="Crystal Background"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* --- 3ブロック目: グラデーション + 中央ロゴ --- */}
                {/* SP: row 2, col 1 (テキスト2の下敷きとして背面に配置) */}
                {/* PC: row 2, col 1 */}
                <div
                    id={"about"}
                    className="col-start-1 row-start-2 md:col-start-1 md:row-start-2 z-0 relative flex flex-col items-center justify-center w-full h-full min-h-[50svh] md:min-h-0 md:h-auto bg-linear-to-b from-[#87CEFA] via-[#FFB6C1] to-[#ffffff] select-none ">
                    <div
                        className="relative w-32 h-32 md:w-48 md:h-48 drop-shadow-xl transition-transform pointer-events-none">
                        <Image
                            src={`${basePath}/resource/logo.webp`}
                            alt="Densan Logo"
                            fill
                            className="object-contain invert md:invert-0"
                        />
                    </div>
                    {/* SPでは非表示にする (hidden md:block を追加) */}
                    <p className="hidden md:block text-white mt-3 font-bold tracking-widest">一関高専電算部ロゴ</p>
                </div>

                {/* --- 4ブロック目: テキストエリア --- */}
                {/* SP: row 2, col 1 (画像2の上に重なる), すりガラス背景 */}
                {/* PC: row 2, col 2, 白背景 */}
                <div
                    className="col-start-1 row-start-2 md:col-start-2 md:row-start-2 flex flex-col justify-center gap-6 text-lg p-10 md:p-16 lg:p-24 text-primary bg-white/70 backdrop-blur-md lg:bg-white lg:backdrop-blur-none leading-loose">
                    <p className={`${notoSerifJP.className} text-primary text-lg `}>What is
                        &rdquo;Densan&rdquo;?</p>
                    <h2 className={`${notoSerifJP.className} tracking-[6px] text-4xl font-extrabold text-primary mb-6 drop-shadow-sm md:drop-shadow-none leading-relaxed `}><span
                        className={"text-white bg-primary  pl-1.5"}>電算部</span>ってなに？</h2>
                    <p className={`${notoSansJP.className} leading-loose indent-[1em]`}>
                        電算部は、一関高専の部活動です。正式名称は「電子計算機部」です。プログラミングやセキュリティ、ネットワーク、ゲーム開発などを行っています。
                    </p>
                    <p className={`${notoSansJP.className} leading-loose indent-[1em]`}>
                        基本的にはグループごとに活動しています。数ヶ月に一度、全員で集まる部集会があり、活動報告や予算の使い方などを話し合います。
                    </p>
                    <dl className={`${notoSansJP.className} leading-loose indent-[1em] gap-6`}>
                        <dt className={"indent-0 mt-4"}># 活動時間</dt>
                        <dd className={"ml-[1em]"}>
                            活動時間は平日の15:00~17:00です。土日祝の活動は基本的にありませんが、夏休み等に合宿を行っています(通学可、任意参加)。 <br/>　チャットで連絡を取り合いながら作業をすることもあります。
                        </dd>
                        <dt className={"indent-0 mt-4"}># 活動内容</dt>
                        <dd className={"ml-[1em]"}>
                            ゲーム開発, 競技プログラミング,
                            ネットワークサーバー構築･管理などを行っています。 加えて、毎年
                            <Link className={""} href='https://www.procon.gr.jp/'>
                                高専プロコン
                            </Link>
                            や
                            <Link
                                className={""}
                                href='https://pckoshien.u-aizu.ac.jp/'
                            >
                                パソコン甲子園
                            </Link>
                            等の大会に出場しています。
                        </dd>
                        <dt className={"indent-0 mt-4"}># 活動場所</dt>
                        <dd className={"ml-[1em]"}>
                            対面活動時は基本的に4号棟2階の旧CAD室を使用し、必要に応じて専攻科棟1階のコンピューター室なども使用します。
                        </dd>
                    </dl>

                </div>

            </div>
        </motion.section>
    );
}