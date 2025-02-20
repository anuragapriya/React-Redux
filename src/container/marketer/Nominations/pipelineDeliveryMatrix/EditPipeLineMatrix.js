import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions, nominationsAction } from '_store';
import { Typography, Button, Box, TextField, InputAdornment } from '@mui/material';
import Popper from '@mui/material/Popper';
import Grid from "@material-ui/core/Grid";
import { MaterialReactTable } from 'material-react-table';
import { codiconsave, materialsymbolsclose } from "images";
import { CommonSelect } from '_components';
import EditIcon from "@mui/icons-material/Edit";
const EditPipeLineMatrix = () => {
    const header = "PipeLine Delivery Matrix";
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth?.value);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [data,setData] = useState();
    const [matrixTypeName, setMatrixTypeName] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const authUserId = useSelector(x => x.auth?.userId);

    const PipelineStatus = [
        { value: 1, label: "Actual DRV Consumption" },
        { value: 2, label: "Storage & Payback" }
    ];


    useEffect(() => {
        // console.log('authed-user',`${authUser.Data.UserDetails.FirstName} ${authUser.Data.UserDetails.LastName}`);
        const fetchData = async () => {
            dispatch(alertActions.clear());
            try {
                const result = await dispatch(nominationsAction.getDeliveryMatrix(matrixTypeName)).unwrap();
                const deliveryGuide = result;
                console.log('deliveryguideMatrix------------',deliveryGuide);
                setData(deliveryGuide);
                // setTableData(deliveryGuide)
                // setData(pipelineGuideData?.Data);
               
            } catch (error) {
                dispatch(alertActions.error({
                    message: error?.message || error,
                    header: `${header} Failed`
                }));
            }
        };
        fetchData();
    }, [dispatch,matrixTypeName]);
    useEffect(() => {
        const { transformedRows, columns } = transformDataForMRT(data);
        setTableData(transformedRows);
        setOriginalData(transformedRows);
        setColumns(columns);
    }, [data]);

    // useEffect(() => {
    //     updateLastRowMin();
    // }, [tableData]);

    // const updateLastRowMin = () => {
    //     setTableData((prevData) => {
    //         if (prevData.length > 1) {
    //             const updatedData = [...prevData];
    //             const prevMax = updatedData[updatedData.length - 2]?.Range.split("-")[1]?.trim();
    //             if (prevMax) {
    //                 updatedData[updatedData.length - 1].Range = `${parseInt(prevMax.replace(/,/g, ""), 10) + 1}`;
    //             }
    //             return updatedData;
    //         }
    //         return prevData;
    //     });
    // };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };


    const handleSubmit = async () => {
        try{
            const formattedData = tableData.map((row, index) => {
                // Extract range values
                const rangeParts = row.Range.split("-");
                const isLastRow = index === tableData.length - 1; // Check if it's the last row
        
                const rangeMin = parseInt(rangeParts[0]?.trim().replace(/,/g, ""), 10);
                let rangeMax = 0; // Default 0 for last row
        
                if (!isLastRow) {
                    rangeMax = parseInt(rangeParts[1]?.trim().replace(/,/g, ""), 10);
                }
        
                return {
                    Range: isLastRow ? `${rangeMin}+` : row.Range, // Append + for last row
                    RangeID: index + 1, // Adjust RangeID if needed
                    RangeMinValue: rangeMin,
                    RangeMaxValue: isLastRow ? 0 : rangeMax, // Ensure last row max is 0
                    CreatedBy: `${authUser?.Data?.UserDetails?.FirstName} ${authUser?.Data?.UserDetails?.LastName}`,
                    Matrix: Object.keys(row)
                        .filter((key) => key !== "Range")
                        .map((pipelineName, idx) => {
                            const [min, max] = row[pipelineName]
                                .split(" - ")
                                .map((v) => parseInt(v.trim(), 10));
        
                            // Find matching pipeline from the database data
                            const pipelineData = data.Data.find((item) =>
                                item.Matrix.some((m) => m.PipelineName === pipelineName)
                            )?.Matrix.find((m) => m.PipelineName === pipelineName);
        
                            return {
                                MatrixID: 0, // Use existing ID or generate new one
                                PipelineID: pipelineData?.PipelineID, // Use existing ID or generate new one
                                MatrixTypeID: pipelineData?.MatrixTypeID || 1, // Adjust as needed
                                MatrixTypeName: pipelineData?.MatrixTypeName || "",
                                PipelineName: pipelineName,
                                MinValue: min,
                                MaxValue: max,
                                PipeNomination: pipelineData?.PipeNomination || "", // Use existing or set default
                            };
                        }),
                };
            });
        
            console.log("Formatted Data:", formattedData);
        
            let result;
            if (formattedData) {
                result = await dispatch(nominationsAction.updateDeliveryMatrix(formattedData));
            }
            if (result?.error) {
                dispatch(alertActions.error({ message: result?.payload || result?.error.message, header: header }));
                return;
            }
        }catch (error) {
            dispatch(alertActions.error({ message: error?.message || error, header: header }));
        }
       
    };
    


    const transformDataForMRT = (apiData) => {
        const transformedRows = [];
        const uniquePipelines = new Set();

        apiData?.Data.forEach((entry) => {
            const row = { Range: entry.Range };
            entry.Matrix.forEach((matrix) => {
                const pipelineName = matrix.PipelineName;
                uniquePipelines.add(pipelineName);
                row[pipelineName] = `${matrix.Min} - ${matrix.Max}`;
            });
            transformedRows.push(row);
        });

        // const handleRangeInputChange = (rowIndex, newMaxValue) => {
        //     setTableData((prevData) => {
        //         let updatedData = [...prevData];
        
        //         // Parse and sanitize input values
        //         let [minValue, oldMax] = updatedData[rowIndex].Range.split("-").map(val => val.trim());
        
        //         let newMax = newMaxValue.trim() === "" ? "" : parseInt(newMaxValue.trim().replace(/,/g, ""), 10);
        //         minValue = parseInt(minValue, 10);
        
        //         // Update the max of the current row
        //         updatedData[rowIndex].Range = `${minValue} - ${newMax}`;
        
        //         // Automatically update min of the next rows
        //         for (let i = rowIndex + 1; i < updatedData.length; i++) {
        //             let [nextMin, nextMax] = updatedData[i].Range.split("-").map(val => val.trim());
        //             let newMin = newMax + 1;
        
        //             // If it's the last row, only update the min value (no max)
        //             if (i === updatedData.length - 1) {
        //                 updatedData[i].Range = `${newMin}`;
        //             } else if (!isNaN(newMin)) {
        //                 updatedData[i].Range = `${newMin} - ${nextMax}`;
        //             }
        
        //             newMax = parseInt(nextMax); // Move max forward for further rows
        //         }
        
        //         return updatedData;
        //     });
        // };

        const handleRangeInputChange = (rowIndex, newMaxValue) => {
            setTableData((prevData) => {
                let updatedData = [...prevData];
        
                let [minValue] = updatedData[rowIndex].Range.split("-").map(val => val.trim());
                let newMax = newMaxValue.trim() === "" ? "" : parseInt(newMaxValue.trim().replace(/,/g, ""), 10);
                minValue = parseInt(minValue, 10);
        
                // Update max of the current row
                updatedData[rowIndex].Range = `${minValue} - ${newMax}`;
        
                // Ensure last row updates immediately
                for (let i = rowIndex + 1; i < updatedData.length; i++) {
                    let [nextMin, nextMax] = updatedData[i].Range.split("-").map(val => val.trim());
                    let newMin = newMax + 1;
        
                    if (i === updatedData.length - 1) {
                        //  Force update last row immediately
                        updatedData[i].Range = `${newMin}`;
                    } else {
                        updatedData[i].Range = `${newMin} - ${nextMax}`;
                    }
        
                    newMax = parseInt(nextMax); // Move max forward for further rows
                }
        
                return updatedData;
            });
        };
        
        
        
        
        


        // const handleMinUpdate = (rowIndex, newMinValue) => {
        //     setTableData((prevData) => {
        //         let updatedData = [...prevData];
        //         let [_, max] = updatedData[rowIndex].Range.split("-").map(val => val.trim());

        //         // Ensure last row min value is updated correctly
        //         updatedData[rowIndex].Range = `${newMinValue} - ${max}`;

        //         return updatedData;
        //     });
        // };







        const handleInputChange = (rowIndex, pipeline, index, value) => {
            let numericValue = value.replace("%", "").trim();
            numericValue = numericValue === "" ? "" : parseFloat(numericValue);
            if (isNaN(numericValue)) return;
            if (numericValue < 0) numericValue = 0;
            if (numericValue > 100) numericValue = 100;

            setTableData((prevData) => {
                const updatedData = [...prevData];
                const existingValues = updatedData[rowIndex][pipeline].split(" - ");
                existingValues[index] = numericValue;
                updatedData[rowIndex][pipeline] = `${existingValues[0]} - ${existingValues[1]}`;
                return updatedData;
            });
        };

        // Create dynamic MRT columns
        const columns = [
            {
                accessorKey: "Range",
                header: "Dry Load Range",
                // Prevents full-cell editing
                Cell: ({ cell }) => {
                    //  const rowIndex = cell.row.index;
                    const rangeValue = cell.getValue();
                    let min = "", max = "";
                    const totalRows = tableData.length;
                    let isLastRow = cell.row.index === totalRows - 1; // Check if it's the last row

                    if (rangeValue.includes("-")) {
                        [min, max] = rangeValue.split("-").map(val => val.trim());
                    }else {
                        min = rangeValue.split("+")[0].trim();
                    }
                    if (isLastRow && cell.row.index > 0) {
                        const prevRowMax = tableData[cell.row.index - 1]?.Range.split("+")[1]?.trim();
                        if (prevRowMax) {
                            min = (parseInt(prevRowMax.replace(/,/g, ""), 10) + 1).toString();
                        }
                    }
                    return (
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <TextField
                                size="small"
                                value={min} // Non-editable min value
                                style={{ width: "110px" }}
                                InputProps={{ readOnly: true }}

                            />

                            {isLastRow ? (
                                <span style={{ fontSize: "20px", fontWeight: "bold" }}>+</span>
                            ) : (
                                <>
                                    -
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={isLastRow ? `${max}+` : `${max}`}
                                        onChange={(e) => !isLastRow && handleRangeInputChange(cell.row.index, e.target.value)}
                                        style={{ width: "120px" }}
                                        InputProps={isLastRow ? { readOnly: true } : {}}
                                    />
                                </>
                            )}
                        </div>
                    );
                },
            },

            ...Array.from(uniquePipelines).map((pipeline) => ({
                accessorKey: pipeline,
                header: `${pipeline}`,
                Cell: ({ cell }) => {
                    const [Min, Max] = cell.getValue().split(" - ");
                    return (
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <TextField
                                size="small"
                                type='number'
                                value={Min}
                                inputProps={{ Min: 0, Max: 100 }}
                                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                                onChange={(e) => handleInputChange(cell.row.index, pipeline, 0, e.target.value)}
                                style={{ width: "70px" }}
                            />
                            -
                            <TextField
                                size="small"
                                type='number'
                                value={Max}
                                inputProps={{ Min: 0, Max: 100 }}
                                InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                                onChange={(e) => handleInputChange(cell.row.index, pipeline, 1, e.target.value)}
                                style={{ width: "70px" }}
                            />
                        </div>
                    );
                },
            })),
        ];

        return { transformedRows, columns };
    };

    const id = open ? "simple-popper" : undefined;
    const datalist = [
        {
            title: "GAS FLOW LIMIT",
            description: "Total gas of 1000 DTHs or less can flow up to 100% on any pipe. (Excludes storage injection gas)"
        },
        {
            title: "VOLUME PRE-APPROVAL",
            description: "Volumes exceeding posted % for Day Ahead require pre-approval before 8:45 AM EST."
        },
        {
            title: "MONTHLY PRE-APPROVAL",
            description: "Volumes exceeding posted % for the next month require pre-approval before the first day of bid week."
        }
    ];
    return (
        <>
            <Button className="Filter EditPipeLineMatrix" variant="contained" color="primary" aria-describedby={id} onClick={handleClick}>
                Edit Matrix
            </Button>
            <Box className="container">
                <Popper id={id} open={open} anchorEl={anchorEl} className="marketrtableContainer EditPipeLineMatrixcontainer">
                    <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }} className="marketrtableContainertable">
                        <Typography component="div" className="marketrtableContainertableinner">
                            <Typography component="div" className="userprofilelist">
                            <Grid container direction="row" spacing={{ xs: 2, md: 3 }}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Grid container direction="row" spacing={{ xs: 2, md: 3 }}>
                                        <Grid item xs={12} sm={12} md={8}>
                                            <CommonSelect value={matrixTypeName} onChange={(value) => setMatrixTypeName(value)} options={PipelineStatus} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} >
                                    <Grid container direction="row" spacing={{ xs: 2, md: 3 }} justifyContent="flex-end">
                                        <Grid item xs={12} sm={12} md={4} className='Deactivate'>

                                            <Button className='Filter' type="button" variant="contained" color="primary" onClick={handleSubmit}>
                                                <img src={codiconsave} alt='codiconsave'></img>
                                            </Button>
                                            <Button className='materialsymbolsclose' type="button" variant="contained" color="primary" onClick={handleClick}>

                                                <img src={materialsymbolsclose} alt='materialsymbolsclose'></img>

                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* <Grid item xs={5}>
                                        <Grid container justifyContent="flex-end">
                                            <Button className="Filter" onClick={handleSubmit} variant="contained" color="primary">
                                                <img src={codiconsave} alt="Save" />
                                            </Button>
                                            <Button className="materialsymbolsclose" variant="contained" color="primary" onClick={handleClick}>
                                                <img src={materialsymbolsclose} alt="Close" />
                                            </Button>
                                        </Grid>
                                    </Grid> */}
                            </Grid>
                        </Typography>
                        <MaterialReactTable columns={columns} data={tableData} enableSorting={false} enableEditing={false} enablePagination={false} />
                        <Box className="gasflowpadding">
                            <Grid container spacing={2} className='gasflowcontainer '>
                                {datalist.map((item, index) => (
                                    <Grid item xs={12} md={4} key={index}>
                                        <Typography className='subtitle' variant="subtitle1" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
                                            {item.title}

                                            <EditIcon fontSize="small" />

                                        </Typography>
                                        <Typography className="gasflowdescription" variant="body2">{item.description}</Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Typography>
            </Box>
        </Popper >
            </Box >
        </>
    );
};

export default EditPipeLineMatrix;
