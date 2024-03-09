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