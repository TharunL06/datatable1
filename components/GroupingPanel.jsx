import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, TextField, Button, Typography } from '@mui/material';

const GroupingPanel = ({ headers, open, onClose, onClearGrouping, onApplyGrouping }) => {
    const [selectedHeaders, setSelectedHeaders] = useState([]);

    const handleAddGrouping = (e) => {
        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedHeaders(selected);
    };

    const handleRemoveGrouping = (header) => {
        setSelectedHeaders(selectedHeaders.filter(item => item !== header));
    };

    const handleClearGrouping = () => {
        setSelectedHeaders([]);
    };

    const handleApplyGrouping = () => {
        onApplyGrouping(selectedHeaders);
    };

    // Filter out headers to display only category and subcategory
    const filteredHeaders = headers.filter(header => header === 'category' || header === 'subcategory');

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div style={{ width: 450, padding: '20px' }}>
                <List>
                    <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '20px' }}>Create Groups</Typography>
                    <Divider />
                    {selectedHeaders.map((header, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={header} />
                            <Divider />
                            <Button size="small" onClick={() => handleRemoveGrouping(header)}>Remove</Button>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <TextField
                    select
                    label="Select a Column"
                    value={selectedHeaders}
                    onChange={handleAddGrouping}
                    fullWidth
                    variant="outlined"
                    SelectProps={{
                        multiple: true,
                        renderValue: (selected) => (
                            <div>
                                {selected.map((value) => (
                                    <span key={value} style={{ marginRight: 5 }}>{value}</span>
                                ))}
                            </div>
                        )
                    }}
                    InputProps={{
                        style: { backgroundColor: '#f5f5f5', marginBottom: 10 }
                    }}
                >
                    {filteredHeaders.map((header, index) => (
                        <option key={index} value={header}>
                            {header}
                        </option>
                    ))}
                </TextField>
                <div style={{ marginBottom: '10px' }}>
                    <Button variant="outlined" color="primary" onClick={handleClearGrouping} fullWidth>
                        Clear Grouping
                    </Button>
                </div>
                <Button variant="contained" color="primary" onClick={handleApplyGrouping} fullWidth>
                    Apply Grouping
                </Button>
            </div>
        </Drawer>
    );
};

export default GroupingPanel;
