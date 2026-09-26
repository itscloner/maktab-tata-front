import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { alpha } from '@mui/material/styles';
import type { PermissionMenu } from '@/permissions/permission.types';
import { getNodeCheckState } from '@/permissions/permission.utils';

interface PermissionTreeNodeProps {
  node: PermissionMenu;
  selected: Set<string>;
  onToggle: (node: PermissionMenu, checked: boolean) => void;
  depth?: number;
  forceExpanded?: boolean; // هنگام جستجو، همه گروه‌ها باز نگه داشته می‌شوند
}

export default function PermissionTreeNode({ node, selected, onToggle, depth = 0, forceExpanded }: PermissionTreeNodeProps) {
  const [open, setOpen] = useState(true);
  const hasChildren = !!node.children?.length;
  const state = getNodeCheckState(node, selected);
  const expanded = forceExpanded || open;

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{
          py: 0.5,
          pr: depth * 3,
          borderRadius: 1.5,
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        {hasChildren ? (
          <IconButton size="small" onClick={() => setOpen((o) => !o)} sx={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
            <ExpandMoreRoundedIcon fontSize="small" />
          </IconButton>
        ) : (
          <Box sx={{ width: 34 }} />
        )}
        <Checkbox
          size="small"
          checked={state === 'checked'}
          indeterminate={state === 'indeterminate'}
          onChange={(e) => onToggle(node, e.target.checked)}
        />
        <Typography
          variant="body2"
          fontWeight={depth === 0 ? 700 : 500}
          sx={{ color: depth === 0 ? 'text.primary' : 'text.secondary' }}
        >
          {node.title}
        </Typography>
        {hasChildren && (
          <Chip
            size="small"
            label={node.children!.length}
            sx={{
              height: 18,
              fontSize: '0.68rem',
              bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
              color: 'primary.main',
            }}
          />
        )}
      </Stack>
      {hasChildren && (
        <Collapse in={expanded} timeout="auto" unmountOnExit={false}>
          <Box>
            {node.children!.map((child) => (
              <PermissionTreeNode
                key={child.id}
                node={child}
                selected={selected}
                onToggle={onToggle}
                depth={depth + 1}
                forceExpanded={forceExpanded}
              />
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
}
