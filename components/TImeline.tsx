"use client";

import React, { useEffect } from "react";
import {
  Button,
  Stack,
  Text,
  Box,
  Group,
  Paper,
  Slider,
  Title,
  Divider,
} from "@mantine/core";
import { MediaItem } from "@/lib/types";

type Props = {
  selected: MediaItem | undefined;
  timer: number;
  setTimer: (val: number) => void;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  onPlayPause: () => void;
};

export default function Timeline({
  selected,
  timer,
  setTimer,
  playing,
  setPlaying,
  onPlayPause,
}: Props) {
  if (!selected) return null;

  const maxEndTime = Math.ceil(selected.endTime ?? selected.duration ?? 10);

  return (
    <Box
      mt="xl"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "16px",
      }}
    >
      {/* Timer Display */}
      <Paper
        p="md"
        radius="md"
        shadow="xs"
        withBorder
        style={{ width: "100%", maxWidth: 600, paddingBottom: "20px" }}
      >
        <Stack spacing="sm" align="center">
          <Group position="apart" style={{ width: "100%" }}>
            <Text size="sm" c="dimmed">
              Start: {selected.startTime}s
            </Text>
            <Text size="sm" c="dimmed">
              End: {selected.endTime}s
            </Text>
          </Group>

          <Slider
            value={timer}
            onChange={setTimer}
            min={0}
            max={maxEndTime}
            step={1}
            label={(val) => `${val}s`}
            color="blue"
            radius="md"
            size="xl"
            style={{ width: "100%" }}
            marks={[
              { value: 0, label: "0s" },
              { value: maxEndTime, label: `${maxEndTime}s` },
            ]}
          />
        </Stack>
      </Paper>
      <Divider my="lg" style={{ width: "100%", maxWidth: 600 }} />

      <Group grow style={{ width: "100%", maxWidth: 600 }}>
        <Button
          variant="filled"
          radius="md"
          size="md"
          color="blue"
          onClick={onPlayPause}
        >
          {playing ? "Pause" : "Play"}
        </Button>

        <Button
          variant="light"
          color="gray"
          radius="md"
          size="md"
          onClick={() => {
            setTimer(0);
            setPlaying(false);
          }}
        >
          Reset
        </Button>
      </Group>

      <Text align="center" size="sm" c="dimmed" style={{ marginTop: "8px" }}>
        ⏱ {timer}s
      </Text>
    </Box>
  );
}
