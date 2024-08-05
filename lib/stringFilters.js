// stringFilter.js

export const filterStringData = (data, column, filterType, filterValue) => {
    return data.filter(row => {
      const cellValue = String(row[column]).toLowerCase();
      const lowercaseFilterValue = filterValue.toLowerCase();
  
      switch (filterType) {
        case 'contains':
          return cellValue.includes(lowercaseFilterValue);
        case 'notContains':
          return !cellValue.includes(lowercaseFilterValue);
        case 'equals':
          return cellValue === lowercaseFilterValue;
        case 'notEqual':
          return cellValue !== lowercaseFilterValue;
        case 'startsWith':
          return cellValue.startsWith(lowercaseFilterValue);
        case 'endsWith':
          return cellValue.endsWith(lowercaseFilterValue);
        case 'isNull':
          return cellValue === '' || row[column] === null || row[column] === undefined;
        case 'isNotNull':
          return cellValue !== '' && row[column] !== null && row[column] !== undefined;
        default:
          return true;
      }
    });
  };
  
  export const stringFilterTypes = [
    { value: 'contains', label: 'Contains' },
    { value: 'notContains', label: 'Not contains' },
    { value: 'equals', label: 'Equals' },
    { value: 'notEqual', label: 'Not equal' },
    { value: 'startsWith', label: 'Starts with' },
    { value: 'endsWith', label: 'Ends with' },
    { value: 'isNull', label: 'Is null' },
    { value: 'isNotNull', label: 'Is not null' }
  ];