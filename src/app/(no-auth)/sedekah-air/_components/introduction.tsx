"use client";
import { Button } from "~/components/ui/button";
import { secondsToTime } from "~/lib/string";
import { Slider } from "~/components/ui/slider";
import {
  Headphones,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeOff,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { type OnProgressProps } from "react-player/base";
import ReactPlayer from "react-player/youtube";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { Skeleton } from "~/components/ui/skeleton";

export const Introduction = () => {
  // mobile is below 768px
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
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

  // notify user beacuse of the autoplay, video will be muted initially
  useEffect(() => {
    if (isReady) {
      toast("Suara dimatikan", {
        description: "Karena fitur autoplay, video akan dimute secara default",
        icon: <Headphones className="size-4 mr-2" />,
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

  return (
    <div className="space-y-4">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Sedekah Air: Memberi Kehidupan untuk Sesama
      </h2>
      <div className="relative h-96 max-w-2xl mx-auto rounded-md overflow-hidden">
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
              className="space-x-2 ml-auto p-4"
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
            <div className="bg-secondary flex items-center gap-2 px-4">
              <div className="text-sm flex items-center gap-1">
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
          <Skeleton className="w-full absolute inset-0" />
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
