import React, { useState, useEffect } from 'react';
import { filterIntegerData, integerFilterTypes } from '@/lib/integerFilters';
import { filterStringData, stringFilterTypes } from '@/lib/stringFilters';

const FilterableTable = ({ data, columns }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [filters, setFilters] = useState({});
  const [filterTypes, setFilterTypes] = useState({});

  const integerColumns = ['id', 'age', 'salary', 'projectsCompleted'];
  const stringColumns = ['name', 'role', 'department', 'accessLevel'];

  useEffect(() => {
    let newFilteredData = data;
    Object.entries(filters).forEach(([column, value]) => {
      if (value || filterTypes[column] === 'isNull' || filterTypes[column] === 'isNotNull') {
        if (integerColumns.includes(column)) {
          newFilteredData = filterIntegerData(newFilteredData, column, filterTypes[column], value);
        } else if (stringColumns.includes(column)) {
          newFilteredData = filterStringData(newFilteredData, column, filterTypes[column], value);
        } else {
          newFilteredData = newFilteredData.filter(row =>
            String(row[column]).toLowerCase().includes(value.toLowerCase())
          );
        }
      }
    });
    setFilteredData(newFilteredData);
  }, [data, filters, filterTypes]);

  const handleFilterChange = (column, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  const handleFilterTypeChange = (column, type) => {
    setFilterTypes(prev => ({
      ...prev,
      [column]: type
    }));
  };

  const renderFilterInput = (column) => {
    const filterType = filterTypes[column] || 'contains';
    if (filterType === 'isNull' || filterType === 'isNotNull') {
      return null;
    }
    return (
      <input
        type="text"
        value={filters[column] || ''}
        onChange={(e) => handleFilterChange(column, e.target.value)}
        placeholder={`Filter ${column}`}
        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2"
      />
    );
  };

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {columns.map(column => (
              <th key={column} className="border border-gray-300 p-2">
                {column}
              </th>
            ))}
          </tr>
          <tr>
            {columns.map(column => (
              <th key={`filter-${column}`} className="border border-gray-300 p-2">
                {renderFilterInput(column)}
                {(integerColumns.includes(column) || stringColumns.includes(column)) && (
                  <select
                    value={filterTypes[column] || (integerColumns.includes(column) ? 'equals' : 'contains')}
                    onChange={(e) => handleFilterTypeChange(column, e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    {integerColumns.includes(column) && 
                      integerFilterTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))
                    }
                    {stringColumns.includes(column) && 
                      stringFilterTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))
                    }
                  </select>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map(column => (
                <td key={column} className="border border-gray-300 p-2">
                  {row[column] !== undefined ? String(row[column]) : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {filteredData.length === 0 && (
        <div className="text-center py-4 text-gray-500">No matching records found</div>
      )}
    </div>
  );
};

export default FilterableTable;