"use client";

import Image from "next/image";
import {notoSansJP, orbitron} from "@/utils/fonts";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import {groups} from "../../../public/config";
import {motion} from "motion/react";

// Swiperのスタイルをインポート
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import {fadeInVariants} from "@/utils/motionVariants";
import {basePath} from "../../../next.config";


export default function GroupsSection() {
    return (
        <motion.section
            id="groups" className="w-full mb-16 md:mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.1}}
            variants={fadeInVariants}
        >

            {/* --- 1. ヘッダーバナーエリア --- */}
            <div
                className="w-full bg-[#6b8ca5] py-16 md:py-24 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                    <Image src={`{${basePath}/resource/crystal-section.webp`} alt="bg" fill className="object-cover"/>
                </div>
                <h2 className={`${notoSansJP.className} text-white text-5xl md:text-7xl font-bold tracking-[0.2em] z-10`}
                    style={{
                        WebkitTextStroke: "2px white",
                        color: "transparent",
                        textShadow: "4px 4px 0px rgba(255,255,255,0.2)"
                    }}
                >
                    GROUP
                </h2>
            </div>
            {/* サブタイトルバー */}
            <div className="w-full bg-[#7a7a7a] py-4 text-center">
                <p className={`${notoSansJP.className} text-white tracking-widest text-sm md:text-base`}>
                    活動グループ紹介
                </p>
            </div>

            {/* --- 2. グループ紹介スライダーエリア --- */}
            <div className="w-full py-16">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                    <Swiper
                        // Navigationモジュールを登録
                        modules={[Pagination, Autoplay, Navigation]}
                        spaceBetween={80}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{delay: 8000, disableOnInteraction: false}}
                        pagination={{clickable: true}}
                        navigation={true} // ナビゲーション（矢印）を有効化
                        // Tailwindで矢印の表示/非表示と色を制御。PC時のみ左右にpx-12の余白を持たせて矢印のスペースを確保。
                        className="w-full pb-16 md:px-16! [&_.swiper-pagination-bullet-active]:bg-[#6b8ca5] [&_.swiper-button-next]:hidden! md:[&_.swiper-button-next]:flex! [&_.swiper-button-next]:text-[#6b8ca5] [&_.swiper-button-next]:scale-75 [&_.swiper-button-prev]:hidden! md:[&_.swiper-button-prev]:flex! [&_.swiper-button-prev]:text-[#6b8ca5] [&_.swiper-button-prev]:scale-75"
                    >
                        {groups.map((group) => (
                            <SwiperSlide key={group.title} className="w-full h-auto! flex flex-col">
                                {/* 各スライドの中身 (テキスト + 画像) */}
                                <div
                                    className="flex flex-col md:flex-row-reverse gap-8 lg:gap-16 justify-start items-start md:items-center h-full pb-8 md:pb-32">
                                    {/* 上側：画像 */}
                                    <div
                                        className="w-full md:w-1/2 relative aspect-video md:aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-gray-100 bg-gray-200">
                                        {/* pathが存在する場合のみ画像を表示、空の場合は仮のテキストを表示 */}
                                        {group.path ? (
                                            <Image
                                                src={`${basePath}/group/${group.path}.webp`}
                                                alt={`${group.title} group image`}
                                                fill
                                                className="object-cover transition-transform duration-700 hover:scale-105"
                                            />
                                        ) : (
                                            <div
                                                className={`${orbitron.className} absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-400`}>
                                                {group.title}
                                            </div>
                                        )}
                                    </div>
                                    {/* 下側：テキスト情報 */}
                                    <div className="w-full md:w-1/2 flex flex-col pt-4 ">
                                        <h3 className="inline-block bg-[#6b8ca5] text-white px-6 py-1 mb-6 text-lg md:text-base tracking-[3px] font-bold self-start rounded-sm shadow-sm">
                                            {group.title}
                                        </h3>
                                        {/* whitespace-pre-wrap を付与して改行(\n)を反映 */}
                                        <p className={`${notoSansJP.className} text-primary leading-loose text-base md:text-lg whitespace-pre-wrap`}>
                                            {group.desc}
                                        </p>
                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

        </motion.section>
    );
}