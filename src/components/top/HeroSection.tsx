"use client";

import {useEffect, useMemo, useRef, useState} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {useTexture} from '@react-three/drei';
import * as THREE from 'three';
import {TitleLogo} from "@/components/top/TitleLogo";
import {basePath} from "@/basePath";
import Link from "next/link";
import Image from "next/image";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// 【最適化2】 スマホ等のGPU負荷を下げるため、中精度の浮動小数点を使用
const fragmentShader = `
  precision mediump float; 

  uniform float uTime;
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);

    float waveX = sin(vUv.x * 15.0 + uTime * 1.2) * 0.5;
    float waveY = cos(vUv.y * 15.0 + uTime * 0.8) * 0.5;
    float waveDiag = sin((vUv.x + vUv.y) * 20.0 - uTime * 1.5) * 0.5;

    float bumpThreshold = 0.1; 
    vec3 normal = normalize(vec3(
      (waveX + waveDiag) * bumpThreshold, 
      (waveY + waveDiag) * bumpThreshold, 
      1.0
    ));

    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfDir = normalize(lightDir + viewDir);

    float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);

    vec3 finalColor = texColor.rgb + vec3(1.0) * spec * 0.3;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function ShaderBackground({ onLoaded }: { onLoaded: () => void }) {
    const texture = useTexture(`${basePath}/resource/crystal-top.webp`);
    const {size, viewport} = useThree();
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useEffect(() => {
        if (!texture.image || !texture.image.hasOwnProperty("width") || !texture.image.hasOwnProperty("height")) return;
        const texImg = texture.image as { width: number, height: number };

        const imageAspect = texImg.width / texImg.height;
        const screenAspect = size.width / size.height;

        if (screenAspect > imageAspect) {
            const scale = screenAspect / imageAspect;
            texture.repeat.set(1, 1 / scale);
            texture.offset.set(0, (1 - 1 / scale) / 2);
        } else {
            const scale = imageAspect / screenAspect;
            texture.repeat.set(1 / scale, 1);
            texture.offset.set((1 - 1 / scale) / 2, 0);
        }

        // テクスチャの準備ができたら親に通知（フォールバック用）
        onLoaded();
    }, [texture, size.width, size.height, onLoaded]);

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

export default function HeroSection() {
    // 【最適化4】 Canvasの準備ができるまで背面画像を維持し、完了したら背面画像を消して描画コストを下げる
    const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);

    return (
        <section className="relative w-full h-[100dvh] flex flex-col justify-start">
            <div className="w-full h-[17svh] md:h-[25svh] shrink-0"/>

            <div className="relative w-full h-[66svh] md:h-[50svh] shrink-0 drop-shadow-2xl anc">
                <div className="absolute inset-0 z-0 brightness-90">
                    {/* バックグラウンドのフォールバック画像 */}
                    <Image
                        src={`${basePath}/resource/crystal-top.webp`}
                        alt="background"
                        fill
                        className={`transition-opacity duration-500 ${isCanvasLoaded ? 'opacity-0' : 'opacity-100'}`}
                        priority
                    />

                    {/* 【最適化1】 Canvasの設定を軽量化 */}
                    <Canvas
                        camera={{position: [0, 0, 1], fov: 75}}
                        dpr={[1, 1.5]}
                        gl={{
                            antialias: false,
                            depth: false,
                            alpha: true,
                            
                        }}
                    >
                        <ShaderBackground onLoaded={() => setIsCanvasLoaded(true)} />
                    </Canvas>
                </div>

                <div className="relative z-10 w-full h-full px-4 text-center pointer-events-none flex flex-col items-center justify-center">
                    <TitleLogo/>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto">
                        <Link
                            href="/#about"
                            className="flex items-center justify-center w-12 h-12 text-white hover:text-white/70 transition-colors animate-bounce"
                            aria-label="Scroll down"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}