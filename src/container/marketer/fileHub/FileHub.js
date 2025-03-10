import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions, filehubAction } from '_store';
import FileHubFilter from "./FileHubFilter";
import { Typography, Backdrop, CircularProgress, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FileHubList from "./FileHubList";
import { IconButton } from "@material-ui/core";
import {  mapCenterValidationSchema } from "_utils/validationSchema";
import { useForm } from 'react-hook-form';
import FileHubUpload  from './FIleHubUpload';
// import { marketerGetData } from '_utils/constant';
import { CommonConfimationmodal, ModalPopup } from '_components';
import { marketerAction } from '_store/marketer.slice';
import dayjs from 'dayjs';
import { AutocompleteInput, UploadFiles, UnderConstruction } from '_components';
import { raphaelinfo, materialsymbolsdownload, downloadIcon } from '../../../images';
import { yupResolver } from '@hookform/resolvers/yup';

const FileHub = () => {
  const header = "FileHub";
  const dispatch = useDispatch();
  const marketers = useSelector(x => x.marketer?.marketerList);
  const authUser = useSelector(x => x.auth?.value);
  const authUserId = useSelector(x => x.auth?.userId);
  const marketerData = useSelector(x => x.nominationgroup?.nominationGroupList?.MarketerData);
  const user = authUser?.Data;
  const userAccess = user?.UserAccess;
  const isAdmin = userAccess?.some(access => access.Role.toLowerCase().includes('admin'));
  const [data, setData] = useState([]);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [editedRowId, setEditedRowId] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [openComponent, setOpenComponent] = useState(null); // State to track which component is open
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [files,setfiles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(alertActions.clear());
      try {
        const result = await dispatch(marketerAction.get()).unwrap();
        const fileData = result?.Data;
        // const result = null;//await dispatch(marketerAction.get()).unwrap();
        // const marketerData = marketerGetData?.Data;
        setData(fileData);
      } catch (error) {
        dispatch(alertActions.error({
          message: error?.message || error,
          header: `${header} Failed`
        }));
      }
    };
    fetchData();
  }, [dispatch]);
    const { register, control, reset, formState: { errors, isValid }, trigger } = useForm({
        resolver: yupResolver(mapCenterValidationSchema)
    });
  const handleChange = (newValue, rowData, field) => {
    setEditedRowId((prev) => {
      const updatedRows = { ...prev };
      if (!updatedRows[rowData.MarketerID]) {
        updatedRows[rowData.MarketerID] = { ...rowData };
      }
      updatedRows[rowData.MarketerID][field] = newValue;
      return updatedRows;
    });
    const newData = data?.Marketers?.map(row => row.MarketerID === rowData.MarketerID ? { ...row, [field]: newValue } : row);
    setData(pre => ({ ...pre, Marketers: [...newData] }));
    setIsDataChanged(true);
  };

  const handleToggleStatusSubmit = async (data) => {
    try {
      let result;
      if (data) {
        result = await dispatch(marketerAction.deactivate(data));
      }
      if (result?.error) {
        dispatch(alertActions.error({ message: result?.payload || result?.error.message, header: header }));
        return;
      }
      handleRefresh();
    }
    catch (error) {
      dispatch(alertActions.error({ message: error?.message || error, header: header }));
    }
  };

  const handleSave = async(data) => {
    console.log(data);
    console.log(files);
    try {
 const transformData = files.map(item => ({
  Base64File:item.File,
  FileName:item.FileName

 }))
      console.log(transformData);
      let result;
      if (transformData.length > 0) {
        result = await dispatch(filehubAction.update(transformData));
        dispatch(alertActions.success({ message: "DRV Updated Successfully.", header: header, showAfterRedirect: true }));
      }
      if (result?.error) {
        dispatch(alertActions.error({ message: result?.payload || result?.error.message, header: header }));
        return;
      }
    }
    catch (error) {
      console.error('Fetch Error:', error); // Log any errors
      dispatch(alertActions.error({
        message: error?.message || error,
        header: `${header} Failed`
      }));
    }
  };

  const handleFilterSubmit = async (newData) => {
    setData(newData);
  };

  const handleCancelClick = async () => {
    handleRefresh();
  };

  const handleToggleActiveStatus = () => {
    const inActive = selectedRows.some(row => !row.IsActive);
    if (inActive) {
      dispatch(alertActions.error({ message: "Please deselect inactive marketers to proceed", header: header }));
    } else {
      setConfirmDialogOpen(true);
    }
  };

  const handleConfirmDeactivation = async () => {
    dispatch(alertActions.clear());
    selectedRows.forEach(row => {
      handleChange(false, row, 'IsActive');
    });

    const transformedData = selectedRows.map((item) => ({
      MarketerID: item.MarketerID,
      IsActive: false
    }));
    await handleToggleStatusSubmit(transformedData);
    setIsDataChanged(true);
    setConfirmDialogOpen(false);
    dispatch(alertActions.success({ message: "Marketers deactivated successfully", header: header }));
  };

  const handleLockToggle = async (row) => {
    dispatch(alertActions.clear());
    const transformedData = [{
      MarketerID: row.original.MarketerID,
      IsActive: !row.original.IsActive
    }];

    await handleToggleStatusSubmit(transformedData);
    setIsDataChanged(true);
    const message = row.original.IsActive ? "Marketers deactivated successfully" : "Marketers activated successfully";
    dispatch(alertActions.success({ message: message, header: header }));
  };

  const handleRefresh = async () => {
    const result = await dispatch(marketerAction.get()).unwrap();
    const marketerData = result?.Data;
    setData(marketerData);
    setSelectedRows([]);
    setRowSelection({});
  };

  const handleOpenComponent = (component) => {
    setOpenComponent(prev => prev === component ? null : component);
    setBackdropOpen(prev => prev === component ? false : true); // Toggle backdrop
  };

  const handleCloseBackdrop = () => {
    setBackdropOpen(false);
    setOpenComponent(null);
  };


  return (
    <>
      <Typography component="div" className='userprofilelist '>
        <Grid container direction="row" spacing={2}>
          <Grid size={{ xs: 12, sm: 4, md: 8 }}>
            <Grid container>
              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <Typography variant="h2" className='userprofilelistcontent'>File hub </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 8 }} >
                <Grid container spacing={2} justifyContent="flex-end" className="MarketerManagement">
                  <Grid size={{ xs: 12, sm: 12, md: 12 }} >
                    <Grid container spacing={2} justifyContent="flex-end">
                      <Grid size={{ xs: 6, sm: 6, md: 4 }}>
                        <FileHubFilter
                          handleFilterSubmit={handleFilterSubmit}
                          isOpen={openComponent === 'filter'}
                          onClose={handleCloseBackdrop}
                          onOpen={() => handleOpenComponent('filter')}
                        />
                      </Grid>

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }} ></Grid>
        </Grid>
      </Typography>
      <Grid container direction="row" spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 8 }}>
          <div className={backdropOpen ? 'backdrop' : ''}>
          </div>
            <div className='MarketerList'>
              <FileHubList
                marketerData={data}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onLockToggle={handleLockToggle}
                handleChange={handleChange}
                rowSelection={rowSelection}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                setRowSelection={setRowSelection}
                handleRefresh={handleRefresh}
                handleToggleActiveStatus={handleToggleActiveStatus}
              />
          </div>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
          <Typography component="div" className="UploadFiles-container mapcontainer">
            <FileHubUpload
            isAdmin={isAdmin}
            marketerData={marketerData}
            setIsDataChanged={setIsDataChanged}
            setfiles={setfiles}
            onSubmit={handleSave}/>
          </Typography>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 12 }} className="Personal-Information">
        <Button variant="contained" color="red" className="cancelbutton" onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className='submitbutton'
          onClick={() => handleSave()}
          disabled={!isDataChanged}
        >
          Save
        </Button>
      </Grid>

      {confirmDialogOpen && <ModalPopup
        header="Marketer"
        message1="Are you sure you want to deactivate selected marketers?"
        btnPrimaryText="Confirm"
        btnSecondaryText="Cancel"
        handlePrimaryClick={() => handleConfirmDeactivation()}
        handleSecondaryClick={() => setConfirmDialogOpen(false)}
      />
      }
    </>
  );
}

export default FileHub;