"use client";

import {useEffect, useMemo, useRef} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {useTexture} from '@react-three/drei';
import * as THREE from 'three';
import {TitleLogo} from "@/components/top/TitleLogo";
import {basePath} from "@/basePath";
import Link from "next/link";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);

    float waveX = sin(vUv.x * 15.0 + uTime * 1.2) * 0.5;
    float waveY = cos(vUv.y * 15.0 + uTime * 0.8) * 0.5;
    float waveDiag = sin((vUv.x + vUv.y) * 20.0 - uTime * 1.5) * 0.5;

    float bumpThreshold = 0.125; 
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

function ShaderBackground() {
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
    return (
        // セクション全体の高さを「100svh - 上の余白」に設定します。
        // SP: 100 - 17 = 83svh / PC: 100 - 25 = 75svh
        <section className="relative w-full h-[83svh] md:h-[75svh] flex flex-col justify-start">

            {/* 青いキャンバスのラッパー。ここに 66svh / 50svh を指定します */}
            <div className="relative w-full h-[66svh] md:h-[50svh] drop-shadow-2xl anc">

                <div className="absolute inset-0 z-0">
                    <Canvas camera={{position: [0, 0, 1], fov: 75}}>
                        <ShaderBackground/>
                    </Canvas>
                </div>

                {/* 前面のテキスト/ロゴコンテンツレイヤー */}
                <div className="relative z-10 w-full h-full px-4 text-center pointer-events-none flex flex-col items-center justify-center">
                    <TitleLogo/>

                    {/* 下スクロールを促すインジケーター（青背景に乗るので白文字にしています） */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto">
                        <Link
                            href="/#about"
                            className="flex items-center justify-center w-12 h-12 text-white hover:text-white/70 transition-colors animate-bounce"
                            aria-label="下にスクロール"
                        >
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
                        </Link>
                    </div>
                </div>

            </div>

            {/* 余った空間（SP: 83-66=17svh / PC: 75-50=25svh）が自動的に「下の白い余白」として機能します */}
        </section>
    );
}