import { Variants } from "motion/react";

export const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 40 }, // 初期状態: 透明で下にある
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8, // 少し長めにして滑らかに
            ease: [0.22, 1, 0.36, 1] // 滑らかなease-out
        }
    },
};