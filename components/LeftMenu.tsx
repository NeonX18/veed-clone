'use client';

import { NumberInput, Paper, Stack, Title } from '@mantine/core';
import { MediaItem } from '@/lib/types';

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

  const handleWidthChange = (val: string | number | null) => {
    const width = typeof val === 'number' ? val : parseFloat(val as string) || 0;
    onUpdate(selected.id, { width });
  };

  const handleHeightChange = (val: string | number | null) => {
    const height = typeof val === 'number' ? val : parseFloat(val as string) || 0;
    onUpdate(selected.id, { height });
  };

  return (
    <Paper p="md" radius="md" shadow="xs" withBorder>
      <Stack gap="sm">
        <Title order={5}>Size</Title>

        <NumberInput
          label="Width"
          value={selected.width}
          onChange={handleWidthChange} 
          radius="md"
          size="sm"
        />

        <NumberInput
          label="Height"
          value={selected.height}
          onChange={handleHeightChange}
          radius="md"
          size="sm"
        />
      </Stack>
    </Paper>
  );
}
