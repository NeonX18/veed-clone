import React from "react";
import {
  Button,
  Stack,
  Text,
  Box,
  Group,
  Paper,
  Slider,
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
  if (!selected) {
    return (
      <Box
        mt="xl"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text size="sm" c="dimmed" style={{ textAlign: "center" }}>
          No media selected
        </Text>
      </Box>
    );
  }

  // Ensure that `maxEndTime` is a valid number
  const maxEndTime = Math.ceil(selected.endTime ?? selected.duration ?? 10);

  return (
    <Box
      mt="xl"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Paper
        p="md"
        radius="md"
        shadow="xs"
        withBorder
        style={{ width: "100%", maxWidth: 600, paddingBottom: "20px" }}
      >
        <Stack gap="sm" align="center">
          <Group justify="apart" style={{ width: "100%" }}>
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

      <Text
        size="sm"
        c="dimmed"
        style={{ marginTop: "8px", textAlign: "center" }}
      >
        ⏱ {timer}s
      </Text>
    </Box>
  );
}
