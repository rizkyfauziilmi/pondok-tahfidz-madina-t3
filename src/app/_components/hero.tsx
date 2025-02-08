"use client";

import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { Slider } from "~/components/ui/slider";
import { secondsToTime } from "~/lib/string";
import { toast } from "sonner";

import {
  Headphones,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeOff,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { type OnProgressProps } from "react-player/base";
import { useMediaQuery } from "usehooks-ts";
import { WhatsappIcon } from "~/components/svgs/whatsapp-svg";

export const Hero = () => {
  // mobile is below 768px
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const playerRef = useRef<ReactPlayer>(null);
  const [opacity, setOpacity] = useState<number>(isMobile ? 1 : 0.8);
  const [sliderOpacity, setSliderOpacity] = useState<number>(isMobile ? 1 : 0.8);
  const [urlIndex, setUrlIndex] = useState<number>(0);
  const [progress, setProgress] = useState<OnProgressProps>({
    loaded: 0,
    loadedSeconds: 0,
    played: 0,
    playedSeconds: 0,
  });

  const urls = [
    "https://www.youtube.com/watch?v=66wEaobevaw",
    "https://www.youtube.com/watch?v=jd3OSYc2IR0",
    "https://www.youtube.com/watch?v=mDmATqMofow",
    "https://www.youtube.com/watch?v=hqEYNA7M9hU",
    "https://www.youtube.com/watch?v=8-lJpp1e3C0",
  ];

  // notify user beacuse of the autoplay, video will be muted initially
  useEffect(() => {
    if (isReady) {
      toast("Suara dimatikan", {
        description: "Karena fitur autoplay, video akan dimute secara default",
        icon: <Headphones className="mr-2 size-4" />,
        action: {
          label: "Nyalakan Suara",
          onClick: () => setIsMuted(false),
        },
        position: isMobile ? "top-center" : "bottom-right",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const handleNext = () => {
    if (urlIndex === urls.length - 1) {
      setUrlIndex(0);
    } else {
      setUrlIndex(urlIndex + 1);
    }
  };

  const handlePrev = () => {
    if (urlIndex === 0) {
      setUrlIndex(urls.length - 1);
    } else {
      setUrlIndex(urlIndex - 1);
    }
  };

  const videoDuration = playerRef.current?.getDuration();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative z-0 flex h-96 w-full items-center justify-center md:h-[550px]">
      {isMounted && (

        <ReactPlayer
          ref={playerRef}
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            filter: "brightness(0.8)",
            pointerEvents: "none",
          }}
          url={urls[urlIndex]}
          controls={false}
          playing={isPlaying}
          muted={isMuted}
          onEnded={handleNext}
          onProgress={(progress) => setProgress(progress)}
          onReady={() => setIsReady(true)}
        />
      )}

      {isReady ? (
        <div className="z-10 flex h-full w-full flex-col justify-between pb-14 pt-4">
          <div className="md:flex-1">
            <div className="flex items-center justify-between gap-2 px-4 md:gap-4">
              <Button
                className="bg-[#2cd46b] font-semibold hover:bg-[#29c263]"
                asChild
              >
                <Link href="https://wa.link/rcd0jf" target="_blank">
                  <WhatsappIcon className="mr-2 size-4" />
                  Hubungi Kami
                </Link>
              </Button>
              <div
                className="hidden h-fit flex-1 items-center gap-2 rounded-md bg-background px-2 py-1 md:flex"
                style={{ opacity: sliderOpacity }}
                onMouseEnter={() => setSliderOpacity(1)}
                onMouseLeave={() => {
                  if (isMobile) return;
                  setSliderOpacity(0.8);
                }}
              >
                <div className="flex items-center gap-1 text-sm">
                  <p>
                    {secondsToTime(Number(progress.playedSeconds.toFixed(0)))}
                  </p>
                  <p>/</p>
                  <p>{secondsToTime(Number((videoDuration ?? 0).toFixed(0)))}</p>
                </div>
                <Slider
                  value={[progress.played * 100]}
                  className="w-full"
                  max={100}
                  step={0.1}
                  onValueChange={(number) => {
                    const newProgress = number[0] ? number[0] / 100 : 0;
                    if (videoDuration && playerRef.current) {
                      playerRef.current.seekTo(newProgress * videoDuration);
                    }
                  }}
                />
              </div>
              <div
                className="space-x-2"
                style={{ opacity }}
                onMouseEnter={() => setOpacity(1)}
                onMouseLeave={() => {
                  if (isMobile) return;
                  setOpacity(0.8);
                }}
              >
                <Button size="icon" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? (
                    <VolumeOff className="size-4" />
                  ) : (
                    <Volume2 className="size-4" />
                  )}
                </Button>
                <Button size="icon" onClick={handlePrev}>
                  <SkipBack className="size-4" />
                </Button>
                <Button size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? (
                    <Pause className="size-4" />
                  ) : (
                    <Play className="size-4" />
                  )}
                </Button>
                <Button size="icon" onClick={handleNext}>
                  <SkipForward className="size-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="text-center text-white md:flex-1">
            <p className="font-semibold leading-7 [&:not(:first-child)]:mt-6">
              Selamat Datang di Official Website
            </p>
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
              Pondok Tahfidz <span className="text-[#f7af2e]">Madina</span>
            </h1>
          </div>
          <div
            className="mx-auto flex w-10/12 items-center gap-2 rounded-md bg-background px-2 py-1 md:hidden"
            style={{ opacity: sliderOpacity }}
            onMouseEnter={() => setSliderOpacity(1)}
            onMouseLeave={() => {
              if (isMobile) return;
              setSliderOpacity(0.8);
            }}
          >
            <div className="flex items-center gap-1 text-sm">
              <p>{secondsToTime(Number(progress.playedSeconds.toFixed(0)))}</p>
              <p>/</p>
              <p>{secondsToTime(Number(videoDuration?.toFixed(0)) || 0)}</p>
            </div>
            <Slider
              value={[progress.played * 100]}
              className="w-full"
              max={100}
              step={0.1}
              onValueChange={(number) => {
                const newProgress = number[0] ? number[0] / 100 : 0;
                if (videoDuration && playerRef.current) {
                  playerRef.current.seekTo(newProgress * videoDuration);
                }
              }}
            />
          </div>
        </div>
      ) : (
        <Skeleton className="absolute inset-0 w-full" />
      )}
    </div>
  );
};
