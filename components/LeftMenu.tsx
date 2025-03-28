"use client";

import { NumberInput, Paper, Stack, Title } from "@mantine/core";
import { MediaItem } from "@/lib/types";

type Props = {
  selected: MediaItem | undefined;
  onUpdate: (id: string, data: Partial<MediaItem>) => void;
};

export default function LeftMenu({ selected, onUpdate }: Props) {
  if (!selected)
    return (
      <Paper p="md" radius="md" shadow="xs" withBorder>
        Select a media item
      </Paper>
    );

  return (
    <Paper p="md" radius="md" shadow="xs" withBorder>
      <Stack spacing="sm">
        <Title order={5}>Size</Title>

        <NumberInput
          label="Width"
          value={selected.width}
          onChange={(val) =>
            onUpdate(selected.id, { width: val || selected.width })
          }
          radius="md"
          size="sm"
        />

        <NumberInput
          label="Height"
          value={selected.height}
          onChange={(val) =>
            onUpdate(selected.id, { height: val || selected.height })
          }
          radius="md"
          size="sm"
        />
      </Stack>
    </Paper>
  );
}
