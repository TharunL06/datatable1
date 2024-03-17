import React from 'react';
import { List, ListItem, ListItemText, Divider, Button, Drawer, Typography, IconButton } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const SortingPanel = ({ headers, onSort, onClearSort, onClose }) => {
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div style={{ width: 450, padding: '20px' }}>
                <List>
                    <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '20px' }}>Sorting Options</Typography>

                    {headers.map((header, index) => (
                        <div key={index}>
                            <ListItem button onClick={() => onSort(header)}>
                                <ListItemText primary={header} />
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton size="small" onClick={() => onSort(header, 'asc')} style={{ padding: '4px' }}>
                                        <ArrowUpward fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => onSort(header, 'desc')} style={{ padding: '4px' }}>
                                        <ArrowDownward fontSize="small" />
                                    </IconButton>
                                </div>
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <Button variant="outlined" onClick={onClearSort} style={{ marginTop: 10 }}>Clear Sort</Button>
                </div>
            </div>
        </Drawer>
    );
};

export default SortingPanel;
