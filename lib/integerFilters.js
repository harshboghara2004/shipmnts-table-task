// integerFilter.js

export const filterIntegerData = (data, column, filterType, filterValue) => {
  return data.filter(row => {
    const cellValue = Number(row[column]);
    const parsedFilterValue = Number(filterValue);

    switch (filterType) {
      case 'equals':
        return cellValue === parsedFilterValue;
      case 'lessThan':
        return cellValue < parsedFilterValue;
      case 'lessThanOrEqual':
        return cellValue <= parsedFilterValue;
      case 'greaterThan':
        return cellValue > parsedFilterValue;
      case 'greaterThanOrEqual':
        return cellValue >= parsedFilterValue;
      case 'notEqual':
        return cellValue !== parsedFilterValue;
      case 'range':
        const [min, max] = filterValue.split('-').map(Number);
        return cellValue >= min && cellValue <= max;
      default:
        return true;
    }
  });
};

export const integerFilterTypes = [
  { value: 'equals', label: 'Equals' },
  { value: 'lessThan', label: 'Less than' },
  { value: 'lessThanOrEqual', label: 'Less than or equal' },
  { value: 'greaterThan', label: 'Greater than' },
  { value: 'greaterThanOrEqual', label: 'Greater than or equal' },
  { value: 'range', label: 'Range' },
  { value: 'notEqual', label: 'Not equal' }
];