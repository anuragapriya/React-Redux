import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { Button, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { alertActions, myprofileAction } from "_store";
import { MobileNumberInput, CustomFormControl } from "_components";
import { profileInformationUpdateSchema } from '_utils/validationSchema';
import {Box} from "@mui/material";

const MyProfileSD = ({ portalKey }) => {
    const header = "Profile Update";
    const authUserId = useSelector((x) => x.auth?.userId);
    const [userId, setUserId] = useState(authUserId);
    const profileDetails = useSelector((x) => x.profileupdate?.individualDetails);
    console.log('sssssssssssssssssssssssssssssssssssssssssssssssssssss', profileDetails?.loading);
    const dispatch = useDispatch();

    // const portalkey = "MC";
    const isDisable = portalKey?.toLowerCase() == 'sd' ? false : true;


    //    console.log(isDisable);
    // console.log("portalkey------",portalKey.PortalKey);
    const { register, handleSubmit, control, reset, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(profileInformationUpdateSchema)
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch(alertActions.clear());
            try {
                const result = await dispatch(myprofileAction.getUserDetails(userId)).unwrap();
                // setName(result?.Data?.FullName);
                reset(result.Data);
                console.log("sssssssssssssssssssss", profileDetails)
            } catch (error) {
                dispatch(
                    alertActions.error({
                        message: error?.message || error,
                        header: `${header} Failed`,
                    })
                );
            }
        };
        fetchData();
    }, [dispatch, userId, reset]);


    const [expandedAccordion, setExpandedAccordion] = useState("basic");

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpandedAccordion(isExpanded ? panel : false);
    };

    // const handleBlur =  (e) => {
    //     await trigger(e.target.name);
    // };

    const onSubmit = async (data) => {
        try {
            dispatch(alertActions.clear());
            const transformedData = {
                id: userId,
                FullName: data.FullName,
                CompanyName: data.CompanyName,
                FirstName: data.FirstName,
                LastName: data.LastName
            };
            console.log(transformedData);

            let result;
            if (transformedData) {
                result = await dispatch(myprofileAction.updateProfile(transformedData)).unwrap();
            }
            if (result?.error) {
                dispatch(alertActions.error({ message: result?.payload || result?.error.message, header: header }));
                return;
            }
        } catch (error) {
            dispatch(alertActions.error({ message: error?.message || error, header: header }));
        }


    };

    return (
        <Accordion
            expanded={expandedAccordion === "basic"}
            onChange={handleAccordionChange("basic")}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" className="AccordionSummaryheading">Personal Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {!(profileDetails?.loading) && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                       
                        <Grid container >
                        <Box className="heightmin">
                            <Grid item xs={12}>
                                <CustomFormControl
                                    id="FullName"
                                    label="Name"
                                    type="text"
                                    register={register}
                                    errors={errors}
                                // handleBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomFormControl
                                    id="CompanyName"
                                    label="Company Name"
                                    type="text"
                                    register={register}
                                    errors={errors}
                                    disable={isDisable}
                                // handleBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomFormControl
                                    id="EmailID"
                                    label="Email Address"
                                    type="text"
                                    register={register}
                                    errors={errors}
                                    // handleBlur={handleBlur}
                                    disable={true}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MobileNumberInput
                                    control={control}
                                    name="MobileNumber"
                                    label="Phone Number"
                                    errors={errors}
                                // handleBlur={handleBlur}
                                />
                            </Grid>
                            </Box>
                            <Grid item xs={12}>
                            <Typography component="div" className="CreateMarketerbutton">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className='submitbutton'
                                    color="primary"
                                    
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className="cancelbutton"
                                    onClick={handleAccordionChange(false)}
                                >
                                    Cancel
                                </Button>
                            </Typography>
                            </Grid>
                           
                        </Grid>
                      
                    </form>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

export default MyProfileSD;
