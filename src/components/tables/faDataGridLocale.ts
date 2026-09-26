import type { GridLocaleText } from '@mui/x-data-grid';

// متن‌های فارسی برای MUI DataGrid
export const faDataGridLocaleText: Partial<GridLocaleText> = {
  noRowsLabel: 'داده‌ای برای نمایش وجود ندارد',
  footerRowSelected: (count) => `${count.toLocaleString('fa-IR')} ردیف انتخاب شده`,
  footerTotalRows: 'مجموع ردیف‌ها:',
  columnMenuLabel: 'منو',
  columnMenuShowColumns: 'نمایش ستون‌ها',
  columnMenuFilter: 'فیلتر',
  columnMenuHideColumn: 'مخفی کردن',
  columnMenuUnsort: 'حذف مرتب‌سازی',
  columnMenuSortAsc: 'مرتب‌سازی صعودی',
  columnMenuSortDesc: 'مرتب‌سازی نزولی',
  toolbarDensity: 'تراکم',
  toolbarDensityLabel: 'تراکم',
  toolbarDensityCompact: 'فشرده',
  toolbarDensityStandard: 'استاندارد',
  toolbarDensityComfortable: 'راحت',
  toolbarColumns: 'ستون‌ها',
  toolbarFilters: 'فیلترها',
  toolbarExport: 'خروجی',
  toolbarExportCSV: 'دانلود CSV',
  toolbarQuickFilterPlaceholder: 'جستجو...',
  MuiTablePagination: {
    labelRowsPerPage: 'ردیف در هر صفحه:',
    labelDisplayedRows: ({ from, to, count }) => `${from}–${to} از ${count !== -1 ? count : `بیش از ${to}`}`,
  },
} as Partial<GridLocaleText>;
