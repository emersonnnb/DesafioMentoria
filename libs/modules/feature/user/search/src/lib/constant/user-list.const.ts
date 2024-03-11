import { DataTable } from '../model/user-table.model';

export const DATATABLE = [
  { title: 'ID', dataKey: 'id' },
  { title: 'Avatar', dataKey: 'avatar' },
  { title: 'Nome', dataKey: 'name' },
  { title: 'E-mail', dataKey: 'email' },
  { title: 'Biografia', dataKey: 'biography' },
] as Array<DataTable>;

export const DATATABLEKEY = [
    'id',
    'avatar',
    'name',
    'email',
    'biography'
] as Array<string>

export const URL_BASE_IMAGES  = Object.freeze("https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/");