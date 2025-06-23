import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Maximize, Minimize, GraduationCap } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description: string;
  isActive: boolean;
  onPlay: () => void;
  onPause: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  title,
  description,
  isActive,
  onPlay,
  onPause
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Load Vimeo Player API
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.onload = () => {
      if (videoRef.current && window.Vimeo) {
        playerRef.current = new window.Vimeo.Player(videoRef.current);
        
        playerRef.current.on('play', () => {
          setIsPlaying(true);
          onPlay();
        });
        
        playerRef.current.on('pause', () => {
          setIsPlaying(false);
          onPause();
        });
        
        playerRef.current.on('timeupdate', (data: any) => {
          setCurrentTime(data.seconds);
        });
        
        playerRef.current.getDuration().then((duration: number) => {
          setDuration(duration);
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!isActive && isPlaying) {
      handlePause();
    }
  }, [isActive]);

  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.play();
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.pause();
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * duration;
    
    if (playerRef.current) {
      playerRef.current.setCurrentTime(newTime);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden shadow-lg group ${
        isFullscreen ? 'fixed inset-0 z-50' : 'mb-6'
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(true)}
    >
      {/* Video Container */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          ref={videoRef}
          src={`https://player.vimeo.com/video/${videoId}?h=55eac0fa5a&badge=0&autopause=0&controls=0&title=0&byline=0&portrait=0`}
          
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          title={title}
        />
        
        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className={`bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-200 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>
        </div>

        {/* Controls Overlay */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Timeline */}
          <div className="flex items-center space-x-3">
            <span className="text-white text-sm min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            <div 
              className="flex-1 h-2 bg-white/30 rounded-full cursor-pointer"
              onClick={handleTimelineClick}
            >
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-100"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <span className="text-white text-sm min-w-[40px]">
              {formatTime(duration)}
            </span>
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Video Info (only in normal mode) */}
      {!isFullscreen && (
        <div className="p-4 bg-white">
          <div className="flex items-start space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-full">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-blue-600">Algot Academy</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800 mb-1">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
