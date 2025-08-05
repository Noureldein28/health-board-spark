import React from 'react';

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  className?: string;
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data, className = '' }) => {
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
                    : row[column.accessor]
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