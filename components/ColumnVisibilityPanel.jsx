import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemSecondaryAction, Switch, Button, Divider } from '@mui/material';

const ColumnVisibilityPanel = ({ headers, visibleColumns, toggleColumnVisibility, open, onClose, onShowAllColumns, onApply }) => {
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div style={{ width: 450, padding: '20px' }}>
                <List>
                    {headers.map((header, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={header} />
                            <ListItemSecondaryAction>
                                <Switch
                                    edge="end"
                                    onChange={() => toggleColumnVisibility(index)}
                                    checked={visibleColumns[index]}
                                />
                                                            <Divider />

                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                    <Button variant="text" color="inherit" onClick={onShowAllColumns}>
                        Show all columns
                    </Button>
                    <Button variant="contained" color="primary" onClick={onApply}>
                        Apply
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

export default ColumnVisibilityPanel;
