"use client";

import {useEffect, useState} from "react";
import {notoSansJP} from "@/utils/fonts";
import {galleryData} from "../../../public/config";
import {motion, Variants} from "motion/react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import {basePath} from "../../../next.config";


// --- アニメーション設定 ---
const fadeInVariants: Variants = {
    hidden: {opacity: 0, y: 40},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.8, ease: [0.22, 1, 0.36, 1]}
    },
};

// --- 個別のMarkdown読み込み用カードコンポーネント ---
function WorkCard({work}: { work: { id: string; title: string; summary: string, content?: string } }) {
    const [summary, setSummary] = useState<string>("読み込み中...");
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        // public/works/[id]/[summary] からMarkdownをフェッチ
        const fetchMarkdown = async () => {
            try {
                const res = await fetch(`${basePath}/gallery/${work.id}/${work.summary}`);
                if (!res.ok) throw new Error("Not Found");
                const text = await res.text();
                setSummary(text);
            } catch (error) {
                setSummary("コンテンツの読み込みに失敗しました。");
            }

            try {
                const res = await fetch(`${basePath}/gallery/${work.id}/${work.content}`);
                if (!res.ok) throw new Error("Not Found");
                const text = await res.text();
                setContent(text);
            } catch (error) {
            }

        };
        fetchMarkdown();
    }, [work]);

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h3 className={`${notoSansJP.className} text-xl md:text-2xl font-bold text-[#6b8ca5] mb-6 border-b-2 border-gray-100 pb-4`}>
                {work.title}
            </h3>

            {/* Markdown表示エリア */}
            {/* prose クラスでTailwind Typographyを適用、rehypeSanitizeでXSS対策 */}
            <div className="prose prose-sm md:prose-base max-w-none prose-a:text-blue-500 prose-img:rounded-lg">
                {/*summaryエリア*/}
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSanitize]}
                    components={{
                        // <img>タグを上書きし、MD内の相対パス画像を自動補完する
                        img: ({node, src, alt, ...props}) => {
                            if (!src) return null;

                            // "http" や "/" で始まらない相対パスなら、フォルダパスを付与
                            const isAbsolute = src.toString().startsWith("http") || src.toString().startsWith("/");
                            const finalSrc = isAbsolute ? src : `${basePath}/gallery/${work.id}/${src}`;

                            // eslint-disable-next-line @next/next/no-img-element
                            return <img src={finalSrc} alt={alt || ""} {...props} />;
                        }
                    }}
                >
                    {summary}
                </ReactMarkdown>

                {/*contentエリア*/}
                {
                    content &&
                    <details className={"ml-4 text-[#252525]"}>
                        <summary>詳細</summary>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeSanitize]}
                            components={{
                                // <img>タグを上書きし、MD内の相対パス画像を自動補完する
                                img: ({node, src, alt, ...props}) => {
                                    if (!src) return null;

                                    // "http" や "/" で始まらない相対パスなら、フォルダパスを付与
                                    const isAbsolute = src.toString().startsWith("http") || src.toString().startsWith("/");
                                    const finalSrc = isAbsolute ? src : `${basePath}/gallery/${work.id}/${src}`;

                                    // eslint-disable-next-line @next/next/no-img-element
                                    return <img src={finalSrc} alt={alt || ""} {...props} />;
                                }
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </details>
                }
            </div>
        </div>
    );
}

// --- WORKSセクション全体 ---
export default function GallerySection() {
    return (
        <motion.section
            id="gallery"
            className="flex flex-col w-full bg-gray-50"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.1}}
            variants={fadeInVariants}
        >
            {/* --- 1. セクションバナーエリア --- */}
            <div
                className="w-full bg-transparent py-16 md:py-32 flex flex-col items-center justify-center relative px-4 overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[#4a6b82]">
                    <Image src={`${basePath}/resource/gallery-banner.webp`} alt={"bg"} fill className={"object-cover opacity-50"}/>
                </div>
                <h2 className={`${notoSansJP.className} text-white text-4xl sm:text-5xl md:text-7xl font-bold tracking-[0.1em] md:tracking-[0.2em] z-10 text-center w-full`}
                    style={{WebkitTextStroke: "2px white", color: "transparent"}}
                >
                    GALLERY
                </h2>
            </div>

            {/* サブタイトルバー */}
            <div className="w-full bg-[#7a7a7a] py-4 text-center">
                <p className={`${notoSansJP.className} text-white tracking-widest text-sm md:text-base`}>
                    部員の制作物・プロジェクト
                </p>
            </div>

            {/* --- 2. 作品一覧エリア --- */}
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {galleryData.map((work) => (
                        <WorkCard key={work.id} work={work}/>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}