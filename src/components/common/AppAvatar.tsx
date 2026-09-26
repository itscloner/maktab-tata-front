import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';

interface AppAvatarProps {
  name: string;
  color?: string;
  size?: number;
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '؟';
  if (parts.length === 1) return parts[0].slice(0, 1);
  return `${parts[0].slice(0, 1)}${parts[1].slice(0, 1)}`;
}

export default function AppAvatar({ name, color = '#0F6E5C', size = 36 }: AppAvatarProps) {
  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        bgcolor: alpha(color, 0.16),
        color,
        fontSize: size * 0.38,
        fontWeight: 700,
      }}
    >
      {getInitials(name)}
    </Avatar>
  );
}
