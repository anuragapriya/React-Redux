import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ModalPopup } from '_components';
import PiplineNominationList from './PiplineNominationList';
import PipelineNominationFilter from './PipelineNominationFilter';
import PipelineNominationCreate from './PiplineNominationCreate';
import { alertActions, nominationpipelineAction } from '_store';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const PipelineNomination = () => {
  const header = " Nomination By Pipeline";
  const dispatch = useDispatch();
  const nominationData = useSelector(x => x.nominationpipeline?.nominationPipelineList);
  const marketerData=nominationData?.MarketerData;
  const pipelineData= nominationData?.PipelineData;
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState(dayjs().utc().startOf('month').toDate());
  const [toDate, setToDate] = useState(dayjs().utc().endOf('month').toDate());
  const [marketerId, setMarketerId] = useState(null);
  const [pipelineID, setPipelineID] = useState(null);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [editedRecords, setEditedRecords] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [openComponent, setOpenComponent] = useState(null);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(alertActions.clear());
      try {
        const result = await dispatch(nominationpipelineAction.get()).unwrap();
        const nominationData = result?.Data;
        setMarketerId(nominationData?.NominationData?.CompanyId);
        setPipelineID(nominationData?.NominationData?.PipelineID);
        console.log(dayjs().utc().startOf('month').toDate());
        setFromDate(dayjs().utc().startOf('month').toDate());
        setToDate(dayjs().utc().endOf('month').toDate());
        setData(nominationData);
      } catch (error) {
        console.error('Fetch Error:', error); // Log any errors
        dispatch(alertActions.error({
          message: error?.message || error,
          header: `${header} Failed`
        }));
      }
    };
    fetchData();
  }, [dispatch, setData]);

  const handleChange = (newValue, rowData, columnId) => {
    // Create a new copy of the data object to ensure it's not read-only
    let newData = JSON.parse(JSON.stringify(data));
  
    // Create a new array for the updated contract data
    const updatedContractData = newData.NominationData.ContractData.map(contract => {
      // Create a shallow copy of the contract object
      const newContract = { ...contract };
  
      if (newContract.ContractID === rowData.ContractID) {
        const date = dayjs(columnId, 'DD/MM').format('YYYY-MM-DD');
        const detail = newContract.ContractDetails.find(d => dayjs(d.ContractDate).format('YYYY-MM-DD') === date);
        newContract.ContractDetails = [...newContract.ContractDetails];
        if (detail) {
          detail.ContractValue = newValue;
        } else {
          newContract.ContractDetails.push({ ContractDate: date, ContractValue: newValue });
        }
      }
  
      return newContract;
    });
  
    newData.NominationData.ContractData = updatedContractData;
  
    setData(newData);
    setEditedRecords(prev => {
      const updatedRecords = { ...prev };
      const contract = updatedContractData.find(c => c.ContractID === rowData.ContractID);
      if (contract) {
        const editedDetails = contract.ContractDetails.filter(d => d.ContractValue === newValue);
        if (!updatedRecords[contract.ContractID]) {
          updatedRecords[contract.ContractID] = { ContractDetails: [] };
        }
        // Replace the existing details for the contract with the new ones
        updatedRecords[contract.ContractID].ContractDetails = updatedRecords[contract.ContractID].ContractDetails.filter(
          d => dayjs(d.ContractDate).format('YYYY-MM-DD') !== dayjs(editedDetails[0].ContractDate).format('YYYY-MM-DD')
        );
        updatedRecords[contract.ContractID].ContractDetails.push(...editedDetails);
      }
      return updatedRecords;
    });
    setIsDataChanged(true);
  };

  const handleSubmit = async () => {
    dispatch(alertActions.clear());
    try {
      const transformedData = Object.entries(editedRecords).flatMap(([contractID, contract]) =>
        contract.ContractDetails.map(detail => ({
          CompanyID: data?.NominationData?.CompanyId,
          PipelineID: data?.NominationData?.PipelineID,
          ContractID: contractID, // Use the contractID from the key
          NominationDate: detail?.ContractDate,
          NominationAmount: detail?.ContractValue
        }))
      );
      let result;
      if (transformedData.length > 0) {
        result = await dispatch(nominationpipelineAction.update(transformedData));
      }
      if (result?.error) {
        dispatch(alertActions.error({ message: result?.payload || result?.error.message, header: header }));
        return;
      }
      setIsDataChanged(true);
      handleRefresh();
      dispatch(alertActions.success({ message: "Marketed Group data updated Successfully.", header: header, showAfterRedirect: true }));
    } catch (error) {
      dispatch(alertActions.error({ message: error?.message || error, header: header }));
    }
  };

    const handleRefresh = async () => {
      const data = {
        marketerID:marketerId,
        pipelineID:pipelineID,
        FromDate:fromDate,
        ToDate:toDate       
      }
      const newData = await dispatch(nominationpipelineAction.filter(data)).unwrap();
      const nominationpipelineData = newData?.Data;
      const nominationData = nominationpipelineData?.NominationData;
      setMarketerId(nominationData?.CompanyId);
      setPipelineID(nominationData?.PipelineID);
      setData(nominationpipelineData);
      setSelectedRows([]);
      setRowSelection({});
    };

    const handleFilterSubmit = async (newData) => {
      setData(newData);
      setMarketerId(newData?.MarketerID);
    };

  const handleCancelClick = async () => {
      handleRefresh();
  };

    const handleToggleActiveStatus = () => {
      setConfirmDialogOpen(true);
    };

  const handleConfirmDeactivation = async () => {
    dispatch(alertActions.clear());
    await handleDelete(selectedRows);
    setIsDataChanged(true);
    setConfirmDialogOpen(false);
  };

    const handleDelete = async (rowsToDelete) => {
      dispatch(alertActions.clear());
      try {

        const dataToDelete = Array.isArray(rowsToDelete)
        ? rowsToDelete.map((row) => row) // For bulk delete
        : [rowsToDelete];

        const transformedData = dataToDelete.map(row => ({
          ContractID: row.ContractID.toString(),
          FromDate: fromDate, 
          CompanyID: data?.NominationData?.CompanyId,
          PipelineID: data?.NominationData?.PipelineID
        }));
        let result;
        result = await dispatch(nominationpipelineAction.delete(transformedData));
        if (result?.error) {
          dispatch(alertActions.error({ message: result?.payload || result?.error.message, header: header }));
          return;
        }
        await setMarketerId(prevMarketerId => prevMarketerId);
        handleRefresh();
        dispatch(alertActions.success({ message: "Contract deleted successfully.", header: header, showAfterRedirect: true }));
      } catch (error) {
        dispatch(alertActions.error({ message: error?.message || error, header: header }));
      }
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
          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <Grid container>
              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                <Typography variant="h2" className='userprofilelistcontent'>Nomination By Pipline</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 8 }} >
            <Grid container spacing={2} justifyContent="flex-end" className="MarketerManagement">
              <Grid size={{ xs: 12, sm: 12, md: 8 }} >
                <Grid container spacing={2} justifyContent="flex-end">
                  <Grid size={{ xs: 6, sm: 6, md: 4 }}>
                    <PipelineNominationFilter
                      marketerData={marketerData}
                      pipelineData={pipelineData}
                      fromDate={fromDate}
                      setFromDate={setFromDate}
                      toDate={toDate}
                      setToDate={setToDate}
                      marketerId={marketerId}
                      setMarketerId={setMarketerId}
                      pipelineID={pipelineID}
                      setPipelineID={setPipelineID}
                      handleFilterSubmit={handleFilterSubmit}
                      isOpen={openComponent === 'filter'}
                      onClose={() => handleCloseBackdrop()}
                      onOpen={() => handleOpenComponent('filter')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                    <PipelineNominationCreate
                      pipelineData={pipelineData}
                      marketerId={marketerId}
                      fromDate={fromDate}
                      toDate={toDate}
                      isOpen={openComponent === 'create'}
                      onClose={() => handleCloseBackdrop()}
                      onOpen={() => handleOpenComponent('create')}
                      handleRefresh={handleRefresh}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Typography>
      <>
        <div className={backdropOpen ? 'backdrop' : ''}>
          <PiplineNominationList
            data={data}
            fromDate={fromDate}
            toDate={toDate}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            handleChange={handleChange}
            handleDelete={handleDelete}
            handleRefresh={handleRefresh}
            handleToggleActiveStatus={handleToggleActiveStatus}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
        <Grid size={{ xs: 12, sm: 12, md: 12 }} className="Personal-Information">
          <Button variant="contained" color="red" className="cancelbutton" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className='submitbutton'
            onClick={handleSubmit}
            disabled={!isDataChanged}>
            Save
          </Button>
        </Grid>
      </>
      {confirmDialogOpen && <ModalPopup
        header="Marketer Group"
        message1="Are you sure you want to delete selected contracts?"
        btnPrimaryText="Confirm"
        btnSecondaryText="Cancel"
        handlePrimaryClick={handleConfirmDeactivation}
        handleSecondaryClick={() => setConfirmDialogOpen(false)}
      />}
    </>
  );
}

export default PipelineNomination;