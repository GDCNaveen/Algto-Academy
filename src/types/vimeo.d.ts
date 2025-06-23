
declare global {
  interface Window {
    Vimeo: {
      Player: new (element: HTMLElement, options?: any) => VimeoPlayer;
    };
  }
}

interface VimeoPlayer {
  play(): Promise<void>;
  pause(): Promise<void>;
  setCurrentTime(seconds: number): Promise<void>;
  getCurrentTime(): Promise<number>;
  getDuration(): Promise<number>;
  on(event: string, callback: (data: any) => void): void;
  destroy(): void;
}

export {};
