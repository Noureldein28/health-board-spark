import React from 'react';

interface Column<T = Record<string, unknown>> {
  header: string;
  accessor: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface DataTableProps<T = Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

export const DataTable = <T extends Record<string, unknown>>({ columns, data, className = '' }: DataTableProps<T>) => {
  return (
    <div className={`bg-card rounded-lg overflow-hidden shadow-sm ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="bg-table-header text-table-header-foreground">
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-table-row hover:bg-table-row-hover transition-colors"
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm">
                  {column.render
                    ? column.render(row[column.accessor], row)
                    : String(row[column.accessor])
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};