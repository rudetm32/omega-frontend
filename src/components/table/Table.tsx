// components/Table.tsx
import React from "react";

interface TableProps {
  columns: string[];
  data: any[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          {columns.map((column, index) => (
            <th key={index} className="px-4 py-2">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-t">
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="px-4 py-2">
                {row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
