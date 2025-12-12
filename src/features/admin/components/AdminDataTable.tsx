/**
 * AdminDataTable component
 * Generic data table for admin CRUD operations
 */

import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import type { AdminEntity, TableColumn } from '../types'
import { truncateText } from '../utils'

type AdminDataTableProps<T extends AdminEntity> = {
  readonly title: string
  readonly data: T[]
  readonly totalCount: number
  readonly columns: Array<TableColumn<T>>
  readonly loading?: boolean
  readonly searchQuery: string
  readonly page: number
  readonly rowsPerPage: number
  readonly sortColumn: keyof T | null
  readonly sortDirection: 'asc' | 'desc'
  readonly onSearchChange: (query: string) => void
  readonly onPageChange: (page: number) => void
  readonly onRowsPerPageChange: (rows: number) => void
  readonly onSort: (column: keyof T) => void
  readonly onAdd: () => void
  readonly onEdit: (item: T) => void
  readonly onDelete: (item: T) => void
}

export const AdminDataTable = <T extends AdminEntity>({
  title,
  data,
  totalCount,
  columns,
  loading = false,
  searchQuery,
  page,
  rowsPerPage,
  sortColumn,
  sortDirection,
  onSearchChange,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  onAdd,
  onEdit,
  onDelete,
}: AdminDataTableProps<T>): React.ReactElement => {
  const handleChangePage = (_: unknown, newPage: number): void => {
    onPageChange(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onRowsPerPageChange(Number.parseInt(event.target.value, 10))
    onPageChange(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {loading ? <LinearProgress aria-label="Loading" /> : null}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}>
        <Box sx={{ minWidth: 240 }}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {totalCount} total
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            sx={{ minWidth: { xs: '100%', sm: 280 } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
            aria-label={`Add new ${title.toLowerCase().slice(0, -1)}`}>
            Add
          </Button>
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label={`${title} table`}>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={String(column.id)} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.id !== 'actions' ? (
                    <TableSortLabel
                      active={sortColumn === column.id}
                      direction={sortColumn === column.id ? sortDirection : 'asc'}
                      onClick={() => onSort(column.id as keyof T)}>
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                    {loading ? 'Loading…' : 'No items found'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map(row => (
                <TableRow hover key={row.id} tabIndex={-1}>
                  {columns.map(column => {
                    if (column.id === 'actions') {
                      return (
                        <TableCell key={String(column.id)} align={column.align}>
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => onEdit(row)} aria-label={`Edit ${row.id}`}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => onDelete(row)}
                              aria-label={`Delete ${row.id}`}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      )
                    }

                    const value = row[column.id]
                    const displayValue = column.format
                      ? column.format(value)
                      : typeof value === 'string'
                        ? truncateText(value)
                        : String(value)

                    return (
                      <TableCell key={String(column.id)} align={column.align}>
                        {displayValue}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
