import style from './index.module.scss';
import { CSSProperties, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { LrcObj } from "./type";

export function LRCPlayer(props: {
    /**音频地址 */
    src: string;
    /**封面 */
    cover: string;
    /**标题 */
    title?: string;
    /**副标题 */
    subTitle?: string;
    /**Lrc对象 */
    lrc: LrcObj[];
    /**无歌词时显示内容 */
    placeholder?: string;
    /**动画选项 */
    animate?: {
        /**动画名称 */
        type: "lrcplayer-fade" | "lrcplayer-slide" | string;
        /**持续时长 */
        duration: number;
    };
    /**下句歌词显示设置 */
    nextLrc?: {
        /**是否显示 */
        display: boolean;
        /**显示数量 */
        number: number;
    };
    align?: "start" | 'center' | 'end'
    /**歌词时差 */
    offset?: number;
}) {
    const {
        src,
        cover,
        title = "",
        subTitle = "",
        lrc,
        align = 'center',
        placeholder = "空",
        animate = {
            type: "lrcplayer-fade",
            duration: 0.5
        },
        nextLrc = {
            display: false,
            number: 5
        },
        offset = 0
    } = props;
    const audioRef = useRef<HTMLAudioElement>(null);
    const [current, setCurrent] = useState<string | ReactNode>(<></>);
    const [next, setNext] = useState(<></>);
    const [lrcText, setLrcText] = useState(<></>);

    useEffect(() => {
        setLrcText(
            <div
                key={`lrcplayer-lrc_${Math.random()}`}
                className={style["lrcplayer-display"]}
                style={{
                    animationName: style[animate.type],
                    '--align': align,
                    "--animate-duration": animate.duration + "s"
                } as CSSProperties}
            >
                {current === "" ? (
                    <i style={{ color: "grey" }}>{placeholder}</i>
                ) : (
                    current
                )}
            </div>
        );
    }, [current]);

    useEffect(() => {
        if (audioRef.current) {
            initAnimate();
        }
    }, [audioRef]);

    const initAnimate = () => {
        const { currentTime } = audioRef.current;
        lrc.forEach((lyric, i1) => {
            let isCurrent = currentTime >= lrc[i1].t + offset;
            if (isCurrent) {
                setCurrent(lyric.c);
                setNext(
                    <div className={style['nextlrc-container']}>
                        {Array.from(new Array(nextLrc.number).keys()).map((offset) => {
                            const line =
                                i1 + 1 + offset < lrc.length ? lrc[i1 + 1 + offset].c : "";
                            return line === "" ? (
                                <span key={offset} className={style['nextlrc-placeholder']}>
                                    {placeholder}
                                </span>
                            ) : (
                                <span key={offset}>
                                    {line}
                                </span>
                            );
                        })}
                    </div>
                );
            }
        });
        requestAnimationFrame(initAnimate)
    };

    return (
        <div className={style['lrcplayer-container']}>
            <div className={style['lrcplayer-header']}>
                <img
                    src={cover}
                    width={80}
                    alt="cover"
                />
                <div>
                    <span className={style['lrcplayer-title']}>
                        {title}
                    </span>
                    <br />
                    <span style={{ color: "grey" }}>{subTitle}</span>
                </div>
            </div>

            <div style={{ textAlign: align, paddingBlock: 15 }}>
                {lrcText}
                {nextLrc.display ? <div style={{ color: "grey" }}>{next}</div> : ""}
            </div>

            <audio
                src={src}
                controls
                ref={audioRef}
                style={{ width: "100%" }}
            // onTimeUpdate={ontimeupdate}
            />
        </div>
    );
}