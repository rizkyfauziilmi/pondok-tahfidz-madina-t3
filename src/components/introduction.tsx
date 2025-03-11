"use client";
import { Button } from "~/components/ui/button";
import { secondsToTime } from "~/lib/string";
import { Slider } from "~/components/ui/slider";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeOff,
} from "lucide-react";
import { useState, useRef } from "react";
import { type OnProgressProps } from "react-player/base";
import ReactPlayer from "react-player/youtube";
import { useMediaQuery } from "usehooks-ts";
import { Skeleton } from "~/components/ui/skeleton";

export const Introduction = () => {
  // mobile is below 768px
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<ReactPlayer>(null);
  const [opacity, setOpacity] = useState(isMobile ? 1 : 0.8);
  const [urlIndex, setUrlIndex] = useState(0);
  const [progress, setProgress] = useState<OnProgressProps>({
    loaded: 0,
    loadedSeconds: 0,
    played: 0,
    playedSeconds: 0,
  });

  const urls = [
    "https://www.youtube.com/watch?v=ugnVSCBiP0c",
    "https://www.youtube.com/watch?v=C44bUDBSk6c",
    "https://www.youtube.com/watch?v=rkqJKYEatuM",
    "https://www.youtube.com/watch?v=qCVUIJLjpbw",
    "https://www.youtube.com/watch?v=CT0uVacPDOM",
    "https://www.youtube.com/watch?v=iRuHAaUikeQ",
  ];

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

  return (
    <div className="space-y-4">
      <h1 className="text-center text-lg font-bold md:text-2xl">
        Sedekah Air: Memberi Kehidupan untuk Sesama
      </h1>
      <div className="relative mx-auto h-96 max-w-2xl overflow-hidden rounded-md">
        <ReactPlayer
          ref={playerRef}
          width="100%"
          height="100%"
          style={{
            top: 0,
            left: 0,
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
        {isReady ? (
          <div className="absolute inset-0 flex flex-col justify-between">
            <div
              className="ml-auto space-x-2 p-4"
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
            <div className="flex items-center gap-2 bg-secondary px-4">
              <div className="flex items-center gap-1 text-sm">
                <p>
                  {secondsToTime(Number(progress.playedSeconds.toFixed(0)))}
                </p>
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
                  if (videoDuration) {
                    playerRef.current?.seekTo(newProgress * videoDuration);
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <Skeleton className="absolute inset-0 w-full" />
        )}
      </div>
      <div className="flex-1">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Air adalah sumber kehidupan bagi semua makhluk. Namun, masih banyak
          saudara kita yang mengalami kesulitan untuk mendapatkan akses air
          bersih. Melalui sedekah air, Anda bisa membantu menyediakan kebutuhan
          air yang mendesak bagi mereka yang hidup di daerah kekeringan.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Sedekah air bukan hanya memberikan manfaat fisik, tapi juga menjadi
          pahala yang terus mengalir. Dengan donasi yang Anda berikan, kita
          bersama-sama bisa membangun sumur dan sumber air di daerah yang sangat
          membutuhkan.
        </p>
      </div>
    </div>
  );
};
