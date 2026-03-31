import HeroSection from '@/components/top/HeroSection';
import dynamic from 'next/dynamic';

// --- 遅延ロード (Dynamic Import) の設定 ---
const AboutSection = dynamic(() => import('@/components/top/AboutSection'), {
    loading: () => <div id="about" className="w-full h-[100vh] bg-gray-50 animate-pulse"/>,
});

const GroupsSection = dynamic(() => import('@/components/top/GroupsSection'), {
    loading: () => <div id="groups" className="w-full h-[100vh] bg-gray-50 animate-pulse"/>,
});

const ActivitiesSection = dynamic(() => import('@/components/top/ActivitiesSection'), {
    loading: () => <div id="activities" className="w-full h-[100vh] bg-gray-50 animate-pulse"/>,
});

const GallerySection = dynamic(() => import('@/components/top/GallerySection'), {
    loading: () => <div id="gallery" className="w-full h-[50vh] bg-gray-50 animate-pulse"/>,
});

export default function HomePage() {
    return (
        <>
            {/* ヒーローセクション (ファーストビューなので即時読み込み) */}
            <HeroSection/>

            {/* 以下、スクロールに応じて遅延読み込みされるセクション */}
            <AboutSection/>

            <GroupsSection/>

            <ActivitiesSection/>

            <GallerySection/>
        </>
    );
}