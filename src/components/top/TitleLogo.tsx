// import styles from "./titleLogo.module.scss"
import {monoton, orbitron} from "@/utils/fonts"

export const TitleLogo = () => {
    return (
        <section className={"text-white h-full w-full flex flex-col justify-center items-center md:items-start md:ml-[14vw] md:gap-2"}>
            <p className={`${orbitron.className} text-[2vw] opacity-90 tracking-[.7vw]  md:text-base md:tracking-[6px]`}>
                38.92523898658422, 141.10800192787372
            </p>
            <h1 className={`${monoton.className} text-[16vw] md:text-9xl`}>DENSAN</h1>

            <p className={`${orbitron.className} text-[2vw] opacity-90 tracking-[.5vw] md:text-base md:tracking-[3.8px]`}>
                National Institute of Technology, Ichinoseki College
            </p>
        </section>
    )
}
