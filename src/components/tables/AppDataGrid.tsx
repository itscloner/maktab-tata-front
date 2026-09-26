import { DataGrid, type DataGridProps } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { faDataGridLocaleText } from './faDataGridLocale';
import EmptyState from '../common/EmptyState';

interface AppDataGridProps extends Omit<DataGridProps, 'localeText'> {
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function AppDataGrid({ emptyTitle, emptyDescription, sx, ...rest }: AppDataGridProps) {
  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          autoHeight
          disableRowSelectionOnClick
          localeText={faDataGridLocaleText}
          pageSizeOptions={[10, 25, 50]}
          initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
          slots={{
            noRowsOverlay: () => (
              <EmptyState
                title={emptyTitle ?? 'موردی یافت نشد'}
                description={emptyDescription ?? 'هنوز داده‌ای برای نمایش ثبت نشده است.'}
              />
            ),
          }}
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: 'action.hover',
              borderRadius: 0,
            },
            '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': { outline: 'none' },
            '& .MuiDataGrid-row': { cursor: rest.onRowClick ? 'pointer' : 'default' },
            ...sx,
          }}
          {...rest}
        />
      </Box>
    </Paper>
  );
}
