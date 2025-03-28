"use client";

import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, Container, Stack, Title, FileInput, Paper } from "@mantine/core";
import { MediaItem } from "@/lib/types";
import Canvas from "@/components/Canvas";
import LeftMenu from "@/components/LeftMenu";
import Timeline from "@/components/TImeline";
import ReactPlayer from "react-player";

export default function HomePage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [playing, setPlaying] = useState(false);
  const playerRefs = useRef<{ [id: string]: ReactPlayer | null }>({});

  const selected = media.find((m) => m.id === selectedId);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (playing) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playing]);

  const handleAddMedia = (file: File | null) => {
    if (!file) return; // If the file is null, return early

    const type = file.type.startsWith("image") ? "image" : "video";
    const src = URL.createObjectURL(file);

    const newMedia: MediaItem = {
      id: uuidv4(),
      type,
      src,
      x: 50,
      y: 50,
      width: 300,
      height: 200,
      startTime: 0,
      endTime: 10, // Duration to be updated
    };

    setMedia([...media, newMedia]);
    setSelectedId(newMedia.id);
  };

  const updateMedia = (id: string, data: Partial<MediaItem>) => {
    setMedia((prev) => prev.map((m) => (m.id === id ? { ...m, ...data } : m)));
  };

  const deleteMedia = (id: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handlePlayPause = () => {
    if (!playing && selected) {
      const player = playerRefs.current[selected.id];
      if (player) player.seekTo(0, "seconds");
      setTimer(selected.startTime);
    }
    setPlaying((prev) => !prev);
  };

  return (
    <Box>
      <Box
        px="xl"
        py="sm"
        style={{
          borderBottom: "1px solid #eee",
          background: "#fff",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title order={3}>🎬 Veed Clone Editor</Title>
      </Box>

      <Container size="xl" pt="lg">
        <Box style={{ display: "flex", gap: "32px" }}>
          {/* Sidebar */}
          <Stack gap={10} style={{ width: 300 }}>
            <Paper p="md" radius="md" shadow="xs" withBorder>
              <Stack gap={10}>
                <Title order={5}>Add Media</Title>
                <FileInput
                  accept="image/*,video/*"
                  onChange={(file) => handleAddMedia(file)}
                  placeholder="Upload file"
                />
              </Stack>
            </Paper>
            <LeftMenu selected={selected} onUpdate={updateMedia} />
          </Stack>

          <Canvas
            media={media}
            timer={timer}
            playing={playing}
            onUpdate={updateMedia}
            onDelete={deleteMedia}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            playerRefs={playerRefs}
            onAddMedia={handleAddMedia}
          />
        </Box>

        <Timeline
          selected={selected}
          timer={timer}
          setTimer={setTimer}
          playing={playing}
          setPlaying={setPlaying}
          onPlayPause={handlePlayPause}
        />
      </Container>
    </Box>
  );
}
