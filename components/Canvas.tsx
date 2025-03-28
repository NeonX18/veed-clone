"use client";

import { Rnd } from "react-rnd";
import React, { useEffect, useState } from "react";
import { MediaItem } from "@/lib/types";
import ReactPlayer from "react-player";
import { Button } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";

type Props = {
  media: MediaItem[];
  timer: number;
  playing: boolean;
  onUpdate: (id: string, data: Partial<MediaItem>) => void;
  onDelete: (id: string) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  playerRefs: React.MutableRefObject<{ [id: string]: ReactPlayer | null }>;
  onAddMedia: (file: File) => void;
};

export default function Canvas({
  media,
  timer,
  playing,
  onUpdate,
  onDelete,
  selectedId,
  setSelectedId,
  playerRefs,
  onAddMedia,
}: Props) {
  // Function to handle duration reading
  const handleDuration = (id: string, duration: number) => {
    const roundedDuration = Math.ceil(duration); // Round up to the next integer
    onUpdate(id, { endTime: roundedDuration });
  };

  useEffect(() => {
    if (!playing) return;
    media.forEach((item) => {
      const player = playerRefs.current[item.id];
      if (player && item.type === "video" && timer === item.startTime) {
        player.seekTo(0, "seconds");
      }
    });
  }, [timer, playing, media, playerRefs]);

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#f1f3f5",
        borderRadius: 12,
        minHeight: 500,
        position: "relative",
        overflow: "hidden",
        border: "1px solid #dee2e6",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      {/* Conditionally display Dropzone only when there is no media */}
      {media.length === 0 && (
        <Dropzone
          onDrop={(files) => {
            files.forEach((file) => onAddMedia(file));
          }}
          onReject={(files) => console.log("Rejected files", files)}
          maxSize={1024 * 1024 * 100} // Limit to 100MB
          accept={[MIME_TYPES.mp4, MIME_TYPES.jpeg, MIME_TYPES.png]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
          }}
        >
          <div style={{ textAlign: "center", color: "#fff" }}>
            Drag & Drop Media Here
          </div>
        </Dropzone>
      )}

      {/* Render media items when they are added */}
      {media.map((item) =>
        timer >= item.startTime && timer < item.endTime ? (
          <Rnd
            key={item.id}
            size={{ width: item.width, height: item.height }}
            position={{ x: item.x, y: item.y }}
            onDragStop={(e, d) => onUpdate(item.id, { x: d.x, y: d.y })}
            onResizeStop={(e, dir, ref, delta, position) =>
              onUpdate(item.id, {
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                x: position.x,
                y: position.y,
              })
            }
            onClick={() => setSelectedId(item.id)}
            style={{
              border:
                selectedId === item.id
                  ? "2px solid #228be6"
                  : "1px solid #ced4da",
              borderRadius: 8,
              zIndex: selectedId === item.id ? 10 : 1,
              position: "absolute",
              backgroundColor: "#fff",
            }}
          >
            <div
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              {selectedId === item.id && (
                <Button
                  size="xs"
                  color="red"
                  radius="xl"
                  onClick={() => onDelete(item.id)}
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    zIndex: 99,
                    padding: "2px 6px",
                  }}
                >
                  ✖
                </Button>
              )}

              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <ReactPlayer
                  ref={(ref) => {
                    playerRefs.current[item.id] = ref;
                  }}
                  url={item.src}
                  playing={
                    playing && timer >= item.startTime && timer < item.endTime
                  }
                  muted
                  controls={false}
                  width="100%"
                  height="100%"
                  onDuration={(duration) => handleDuration(item.id, duration)}
                />
              )}
            </div>
          </Rnd>
        ) : null
      )}
    </div>
  );
}
