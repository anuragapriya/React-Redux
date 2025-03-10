import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { materialsymbolsdownload } from './../images';
import exportPDF from '_utils/exportPdf';
import exportCSV from '_utils/exportCsv';
import exportExcel from '_utils/exportExcel';

const Download = ({ rows, headers, filename, supportedFiles }) => {
    const files = supportedFiles || [];
    const [anchorEl, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
console.log(rows);
    const handleExport = (name) => {
        switch (name.toLowerCase()) {
            case 'pdf':
                exportPDF(rows, headers, filename);
                break;
            case 'xls':
                exportExcel(rows, headers, filename);
                break;
            case 'csv':
                exportCSV(rows, headers, filename);
                break;
            default:
                return;
        }
        handleCloseUserMenu();
    }

    return (
        <>
            <Button
                variant="contained"
                className='Download'
                color="primary"
                onClick={handleOpenUserMenu}
            >
                <img src={materialsymbolsdownload} alt="Download" /> Download
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
            >
                {files.map((file) => (<MenuItem key={file} onClick={()=>handleExport(file)}>{file}</MenuItem>))}
            </Menu>
        </>
    );
}

export default Download;