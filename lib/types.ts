export type MediaItem = {
  id: string;
  type: "image" | "video";
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  startTime: number;
  endTime: number;
  duration?: number;
};
