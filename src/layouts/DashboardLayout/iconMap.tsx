import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import type { ReactNode } from 'react';

export const iconMap: Record<string, ReactNode> = {
  dashboard: <DashboardRoundedIcon />,
  donors: <VolunteerActivismRoundedIcon />,
  beneficiaries: <GroupsRoundedIcon />,
  requests: <AssignmentRoundedIcon />,
  donations: <PaidRoundedIcon />,
  expenses: <ReceiptLongRoundedIcon />,
  projects: <FlagRoundedIcon />,
  funds: <SavingsRoundedIcon />,
  accounts: <AccountBalanceRoundedIcon />,
  reports: <AssessmentRoundedIcon />,
  users: <ManageAccountsRoundedIcon />,
  settings: <SettingsRoundedIcon />,
};
