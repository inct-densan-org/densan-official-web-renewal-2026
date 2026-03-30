"use client";

import { useState } from "react"; // useStateをインポート
import Image from "next/image";
import { notoSansJP, orbitron } from "@/utils/fonts";
import { activitiesData } from "../../../public/config";
import {motion} from "motion/react";
import {fadeInVariants} from "@/utils/motionVariants";
import {basePath} from "../../../next.config";

export default function ActivitiesSection() {
    // 全て表示するかどうかの状態管理（初期値は false = 直近2件のみ表示）
    const [isExpanded, setIsExpanded] = useState(false);

    // 表示するデータを決定（展開時は全て、未展開時は先頭から2つまで）
    const displayedActivities = isExpanded ? activitiesData : activitiesData.slice(0, 2);

    return (
        <motion.section
            id="activities" className="flex flex-col w-full bg-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInVariants}
        >

            {/* --- 1. セクションバナーエリア --- */}
            <div className="w-full bg-transparent py-16 md:py-32 flex flex-col items-center justify-center relative px-4 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={`${basePath}/resource/activities-banner.webp`}
                        alt={"bg"}
                        fill
                        className={"object-cover"}
                    />
                </div>
                <h2 className={`${notoSansJP.className} text-white text-4xl sm:text-5xl md:text-7xl font-bold tracking-[0.1em] md:tracking-[0.2em] z-10 text-center w-full`}
                    style={{
                        WebkitTextStroke: "2px white",
                        color: "transparent",
                    }}
                >
                    ACTIVITIES
                </h2>
            </div>

            {/* サブタイトルバー */}
            <div className="w-full bg-[#7a7a7a] py-4 text-center">
                <p className={`${notoSansJP.className} text-white tracking-widest text-sm md:text-base`}>
                    大会等の活動実績
                </p>
            </div>

            {/* --- 2. タイムラインエリア --- */}
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 pt-16 md:pt-24 pb-12 overflow-x-hidden">

                {/* mapを displayedActivities に変更 */}
                {displayedActivities.map((group, index) => (
                    <div key={`${group.year}-${group.month}`} className="relative pl-24 md:pl-32 pb-8 md:pb-24">

                        {/* 縦線: 最後の要素以外に線を表示 */}
                        {index !== displayedActivities.length - 1 && (
                            <div className="absolute left-[37px] md:left-[45px] top-[125px] md:top-[145px] bottom-[20px] w-[6px] bg-[#9ca3af] rounded-full z-0"></div>
                        )}

                        {/* 年月バッジ */}
                        <div className={`${orbitron.className} absolute top-0 left-0 flex flex-col items-center w-20 md:w-24 z-10`}>
                            <span className="text-2xl md:text-3xl font-extrabold text-[#9ca3af] tracking-widest mb-1">{group.year}</span>
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-[10px] border-[#9ca3af] bg-white flex items-center justify-center shadow-sm">
                                <span className="text-2xl md:text-3xl tracking-wider text-center font-extrabold text-[#6b7280]">{group.month}</span>
                            </div>
                        </div>

                        {/* 実績カードグリッド */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-12 md:pt-10 relative z-10">
                            {group.items.map((item: any, itemIdx: number) => {
                                const isLink = Boolean(item.url);

                                const CardContent = (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className={`w-6 h-6 absolute top-5 right-5 ${isLink ? 'text-blue-400' : 'text-gray-400'}`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"/>
                                        </svg>
                                        <h3 className={`${notoSansJP.className} text-sm md:text-base font-bold text-gray-700 pr-10 leading-relaxed`}>
                                            {item.title}
                                        </h3>
                                        <p className={`${notoSansJP.className} text-xs md:text-sm text-gray-500 mt-3`}>
                                            {item.desc}
                                        </p>
                                    </>
                                );

                                const baseClasses = `bg-white p-5 md:p-6 rounded-md relative border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all block`;
                                const hoverClasses = isLink
                                    ? `cursor-pointer hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5`
                                    : `hover:shadow-md`;

                                return isLink ? (
                                    <a key={itemIdx} href={item.url} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${hoverClasses}`}>
                                        {CardContent}
                                    </a>
                                ) : (
                                    <div key={itemIdx} className={`${baseClasses} ${hoverClasses}`}>
                                        {CardContent}
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                ))}

                {/* --- 3. 全て表示 / 閉じる ボタン --- */}
                {/* データが2件より多い場合のみボタンを表示する */}
                {activitiesData.length > 2 && (
                    <div className="flex justify-center mt-4 mb-12">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="group flex items-center justify-center gap-2 bg-[#6b8ca5] hover:bg-[#5a768c] text-white px-8 py-3 rounded-full font-bold tracking-widest shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            {isExpanded ? "閉じる" : "全て表示"}

                            {/* 展開状態に応じて矢印の向きを変える */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                                className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>
                )}

            </div>
        </motion.section>
    );
}