"use client";

import {useEffect, useMemo, useRef} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {useTexture} from '@react-three/drei';
import * as THREE from 'three';
import {TitleLogo} from "@/components/top/TitleLogo";
import {basePath} from "@/basePath";

// 頂点シェーダー（標準的な処理のみ。一切歪ませない）
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// フラグメントシェーダー（ここで法線と光の計算を行う）
const fragmentShader = `
  uniform float uTime;
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    // 元のテクスチャの色をそのまま取得
    vec4 texColor = texture2D(uTexture, vUv);

    // 1. 時間とUV座標から、複数の波(サイン波)を合成して揺らめきを作る
    // 数字をいじると波の細かさや速さが変わります
    float waveX = sin(vUv.x * 15.0 + uTime * 1.2) * 0.5;
    float waveY = cos(vUv.y * 15.0 + uTime * 0.8) * 0.5;
    float waveDiag = sin((vUv.x + vUv.y) * 20.0 - uTime * 1.5) * 0.5;

    // 2. 波の値から「擬似的な法線（Normal）」を生成
    // bumpThreshold が大きいほど凹凸感が強くなります
    float bumpThreshold = 0.125; 
    vec3 normal = normalize(vec3(
      (waveX + waveDiag) * bumpThreshold, 
      (waveY + waveDiag) * bumpThreshold, 
      1.0
    ));

    // 3. ライティング計算（左上から光が当たっていると仮定）
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    vec3 viewDir = vec3(0.0, 0.0, 1.0); // カメラは真正面
    vec3 halfDir = normalize(lightDir + viewDir);

    // スペキュラ（鏡面反射・ハイライト）の強さを計算
    // 最後の 32.0 を大きくするとハイライトがより鋭く(硬く)なります
    float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);

    // 元の画像の色に、ハイライト(白っぽく光る部分)を加算する
    vec3 finalColor = texColor.rgb + vec3(1.0) * spec * 0.3;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// ----------------------------------------

function ShaderBackground() {
    // 画像パスは public/ に合わせたものを使用してください
    const texture = useTexture(`${basePath}/resource/crystal-top.webp`);
    const {size, viewport} = useThree();
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // 【修正ポイント】オブジェクトフィット（カバー＆センター）の計算
    useEffect(() => {
        if (!texture.image || !texture.image.hasOwnProperty("width") || !texture.image.hasOwnProperty("height")) return;
        const texImg = texture.image as { width: number, height: number };

        // 画像の本来のアスペクト比
        const imageAspect = texImg.width / texImg.height;
        // 画面（Canvas）のアスペクト比
        const screenAspect = size.width / size.height;

        // 画像の端処理：はみ出た部分はクランプ（端のピクセルを伸ばす）
        // texture.wrapS = THREE.ClampToEdgeWrapping;
        // texture.wrapT = THREE.ClampToEdgeWrapping;

        if (screenAspect > imageAspect) {
            // 1. 画面の方が画像より横長の場合（例：デスクトップ）
            // -> 画像を横幅いっぱいに広げ、上下をトリミング
            const scale = screenAspect / imageAspect;
            // repeat.y を 1 未満にすることで、縦方向の一部だけを表示（カバー）
            texture.repeat.set(1, 1 / scale);
            // offset.y で表示開始位置を調整し、中心を合わせる
            texture.offset.set(0, (1 - 1 / scale) / 2);
        } else {
            // 2. 画像の方が画面より横長の場合（例：スマホ縦持ち）
            // -> 画像を縦幅いっぱいに広げ、左右をトリミング
            const scale = imageAspect / screenAspect;
            // repeat.x を 1 未満にすることで、横方向の一部だけを表示（カバー）
            texture.repeat.set(1 / scale, 1);
            // offset.x で表示開始位置を調整し、中心を合わせる
            texture.offset.set((1 - 1 / scale) / 2, 0);
        }

        // 変更を適用するために必須
        // eslint-disable-next-line react-hooks/immutability
        // texture.needsUpdate = true;
    }, [texture, size.width, size.height]);

    const uniforms = useMemo(() => ({
        uTime: {value: 0},
        uTexture: {value: texture}
    }), [texture]);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        // 画面全体を覆う板ポリゴン (viewport.width/heightでCanvas全体にフィットさせる)
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]}/>
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}
// ... 前半のシェーダーコード等は省略（変更なし） ...

export default function HeroSection() {
    return (
        <section className="relative w-full h-[100svh] overflow-hidden">
            <div className="absolute inset-0 z-0 h-[50dvh]  mt-[25dvh] md:h-[66dvh] md:mt-[17dvh]  drop-shadow-2xl">
                <Canvas camera={{position: [0, 0, 1], fov: 75}}>
                    <ShaderBackground/>
                </Canvas>
            </div>

            {/* 前面のテキスト/ロゴコンテンツレイヤー */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center pointer-events-none">
                <TitleLogo/>

                {/* 下スクロールを促すインジケーター（修正部分） */}
                {/* pointer-events-auto を追加してクリックを有効化 */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto">
                    <a
                        href="#philosophy" /* 次のセクションのIDに合わせてください */
                        className="flex items-center justify-center w-12 h-12 text-primary hover:text-primary/70 transition-colors animate-bounce"
                        aria-label="下にスクロール"
                    >
                        {/* シンプルな下向き矢印のSVG */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}