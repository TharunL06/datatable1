import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const FilterPanel = ({ data }) => {
  const [filters, setFilters] = useState({
    name: '',
    category: [],
    subcategory: [],
    createdAt: { startDate: null, endDate: null },
    updatedAt: { startDate: null, endDate: null },
    price: [0, getMaxValue(data, 'price')],
    salePrice: [0, getMaxValue(data, 'salePrice')]
  });

  // Function to get the maximum value of a field from the data
  const getMaxValue = (data, field) => {
    return Math.max(...data.map(item => item[field]));
  };

  // Function to filter data based on the selected filters
 const filterData = () => {
    return data.filter(item => {
      // Filter by name
      if (filters.name && !item.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }
      // Filter by category
      if (filters.category.length > 0 && !filters.category.includes(item.category)) {
        return false;
      }
      // Filter by subcategory
      if (filters.subcategory.length > 0 && !filters.subcategory.some(sub => item.subcategory.includes(sub))) {
        return false;
      }
      // Filter by createdAt date range
      const createdAt = new Date(item.createdAt);
      if (filters.createdAt.startDate && createdAt < filters.createdAt.startDate) {
        return false;
      }
      if (filters.createdAt.endDate && createdAt > filters.createdAt.endDate) {
        return false;
      }
      // Filter by updatedAt date range
      const updatedAt = new Date(item.updatedAt);
      if (filters.updatedAt.startDate && updatedAt < filters.updatedAt.startDate) {
        return false;
      }
      if (filters.updatedAt.endDate && updatedAt > filters.updatedAt.endDate) {
        return false;
      }
      // Filter by price range
      if (item.price < filters.price[0] || item.price > filters.price[1]) {
        return false;
      }
      // Filter by salePrice range
      if (item.salePrice < filters.salePrice[0] || item.salePrice > filters.salePrice[1]) {
        return false;
      }
      return true;
    });
  };

  // Handle input change for name filter
  const handleNameChange = (e) => {
    setFilters({ ...filters, name: e.target.value });
  };

  // Handle category select change
  const handleCategoryChange = (e) => {
    const selectedCategories = e.target.value;
    setFilters({ ...filters, category: selectedCategories });
  };

  // Handle subcategory select change
  const handleSubcategoryChange = (e) => {
    const selectedSubcategories = e.target.value;
    setFilters({ ...filters, subcategory: selectedSubcategories });
  };

  // Handle createdAt date range change
  const handleCreatedAtChange = (dates) => {
    const [startDate, endDate] = dates;
    setFilters({ ...filters, createdAt: { startDate, endDate } });
  };

  // Handle updatedAt date range change
  const handleUpdatedAtChange = (dates) => {
    const [startDate, endDate] = dates;
    setFilters({ ...filters, updatedAt: { startDate, endDate } });
  };

  // Handle price range change
  const handlePriceChange = (event, newValue) => {
    setFilters({ ...filters, price: newValue });
  };

  // Handle salePrice range change
  const handleSalePriceChange = (event, newValue) => {
    setFilters({ ...filters, salePrice: newValue });
  };

  // Render filtered data
  const filteredData = filterData();

  return (
    <div>
      {/* Input for name filter */}
      <TextField
        label="Search by name"
        value={filters.name}
        onChange={handleNameChange}
      />

      {/* Select for category filter */}
      <Select
        multiple
        value={filters.category}
        onChange={handleCategoryChange}
      >
        {/* Render category options */}
      </Select>

      {/* Select for subcategory filter */}
      <Select
        multiple
        value={filters.subcategory}
        onChange={handleSubcategoryChange}
      >
        {/* Render subcategory options */}
      </Select>

      {/* Date picker for createdAt filter */}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          label="Created At"
          value={[filters.createdAt.startDate, filters.createdAt.endDate]}
          onChange={handleCreatedAtChange}
          format="MM/dd/yyyy"
          minDate={new Date(Math.min(...data.map(item => new Date(item.createdAt))))}
          maxDate={new Date(Math.max(...data.map(item => new Date(item.createdAt))))}
        />
      </MuiPickersUtilsProvider>

      {/* Date picker for updatedAt filter */}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          label="Updated At"
          value={[filters.updatedAt.startDate, filters.updatedAt.endDate]}
          onChange={handleUpdatedAtChange}
          format="MM/dd/yyyy"
          minDate={new Date(Math.min(...data.map(item => new Date(item.updatedAt))))}
          maxDate={new Date(Math.max(...data.map(item => new Date(item.updatedAt))))}
        />
      </MuiPickersUtilsProvider>

      {/* Slider for price range filter */}
      <Slider
        value={filters.price}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        aria-labelledby="price-slider"
        min={0}
        max={getMaxValue(data, 'price')}
      />

      {/* Slider for salePrice range filter */}
      <Slider
        value={filters.salePrice}
        onChange={handleSalePriceChange}
        valueLabelDisplay="auto"
        aria-labelledby="salePrice-slider"
        min={0}
        max={getMaxValue(data, 'salePrice')}
      />

      {/* Render filtered data */}
      <ul>
        {filteredData.map(item => (
          <li key={item.id}>{/* Render item details */}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterPanel;