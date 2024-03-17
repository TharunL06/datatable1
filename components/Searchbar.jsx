import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ onSearch }) => {
    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        onSearch(searchTerm);
    };

    return (
        <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            shape="rounded"
            onChange={handleSearch}
        />
    );
};

export default SearchBar;