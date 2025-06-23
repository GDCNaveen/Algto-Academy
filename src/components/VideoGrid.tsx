import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from './VideoPlayer';

interface Video {
  id: string;
  videoId: string;
  title: string;
  description: string;
  category: string;
}

interface VideoGridProps {
  activeTab: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ activeTab }) => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample video data
  const videos: Video[] = [
    {
      id: '1',
      videoId: '1089573650',
      title: 'Advanced Calculus - Differential Equations',
      description: 'Learn advanced calculus concepts including differential equations and their real-world applications.',
      category: 'mathematics'
    },
    {
      id: '2',
      videoId: '1095495803',
      title: 'Physics - Quantum Mechanics Basics',
      description: 'Introduction to quantum mechanics and wave-particle duality principles.',
      category: 'physics'
    },
    {
      id: '3',
      videoId: '1089573650',
      title: 'Chemistry - Organic Compounds',
      description: 'Understanding organic chemistry and molecular structures.',
      category: 'science'
    },
    {
      id: '4',
      videoId: '1089573650',
      title: 'Linear Algebra - Matrix Operations',
      description: 'Master matrix operations and vector spaces in linear algebra.',
      category: 'mathematics'
    },
    {
      id: '5',
      videoId: '1089573650',
      title: 'Computer Science - Algorithms',
      description: 'Learn fundamental algorithms and data structures.',
      category: 'computer-science'
    },
    {
      id: '6',
      videoId: '1089573650',
      title: 'World History - Ancient Civilizations',
      description: 'Explore ancient civilizations and their contributions to modern society.',
      category: 'social'
    },
    {
      id: '7',
      videoId: '1089573650',
      title: 'Trigonometry - Advanced Functions',
      description: 'Advanced trigonometric functions and their applications.',
      category: 'mathematics'
    },
    {
      id: '8',
      videoId: '1089573650',
      title: 'Physics - Electromagnetic Fields',
      description: 'Understanding electromagnetic fields and wave propagation.',
      category: 'physics'
    }
  ];

  // Filter videos based on active tab
  const filteredVideos = activeTab === 'all' 
    ? videos 
    : videos.filter(video => video.category === activeTab);

  // Handle scroll to pause videos
  useEffect(() => {
    const handleScroll = () => {
      if (activeVideoId) {
        setActiveVideoId(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeVideoId]);

  const handleVideoPlay = (videoId: string) => {
    setActiveVideoId(videoId);
  };

  const handleVideoPause = () => {
    // Video paused, but keep the activeVideoId for potential resume
  };

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto px-4 py-6">
      <div className="space-y-6">
        {filteredVideos.map((video) => (
          <VideoPlayer
            key={video.id}
            videoId={video.videoId}
            title={video.title}
            description={video.description}
            isActive={activeVideoId === video.id}
            onPlay={() => handleVideoPlay(video.id)}
            onPause={handleVideoPause}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
