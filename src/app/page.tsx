import HeroSection from '@/components/top/HeroSection';
import dynamic from 'next/dynamic';

// --- 遅延ロード (Dynamic Import) の設定 ---
// loading: () => ... で、読み込み中の仮のUI（スケルトンなど）を指定できます。
// ここではシンプルに高さを確保した透明なブロックを置いて、スクロール時のガタつきを防ぎます。

const PhilosophySection = dynamic(() => import('@/components/top/AboutSection'), {
    loading: () => <div className="w-full h-[100vh] bg-gray-50 animate-pulse" />,
});

const GroupSection = dynamic(() => import('@/components/top/GroupsSection'), {
    loading: () => <div className="w-full h-[100vh] bg-gray-50 animate-pulse" />,
});

const ActivitiesSection = dynamic(() => import('@/components/top/ActivitiesSection'), {
    loading: () => <div className="w-full h-[100vh] bg-gray-50 animate-pulse" />,
});

const GallerySection = dynamic(() => import('@/components/top/GallerySection'), {
    loading: () => <div className="w-full h-[50vh] bg-gray-50 animate-pulse" />,
});

export default function HomePage() {
    return (
        <main className="flex flex-col w-full overflow-hidden">

            {/* ヒーローセクション (ファーストビューなので即時読み込み) */}
            <HeroSection />

            {/* 以下、スクロールに応じて遅延読み込みされるセクション */}
            <PhilosophySection />

            <GroupSection />

            <ActivitiesSection />

            <GallerySection />

        </main>
    );
}