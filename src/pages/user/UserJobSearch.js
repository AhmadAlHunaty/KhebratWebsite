import { Typography, Box } from '@mui/material'
import { Stack } from '@mui/system'
import StatComponent from '../../component/StatComponent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import { useSelector } from 'react-redux'
import moment from 'moment'
import Navbar from '../../component/Navbar';
import { Card, Container, ListItemIcon, MenuItem, MenuList, Pagination, useTheme } from '@mui/material'
import SelectComponent from '../../component/SelectComponent';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Header from '../../component/Header';
import { Link, useParams } from 'react-router-dom'
import LoadingBox from '../../component/LoadingBox'
import { jobLoadAction } from '../../redux/actions/jobAction'
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardElement from '../../component/CardElement'


const UserJobSearch = () => {
    const dispatch = useDispatch();
    const { jobs, setUniqueLocation, pages, loading } = useSelector(state => state.loadJobs);
    const { user } = useSelector(state => state.userProfile);
    const { palette } = useTheme();
    const { keyword, location } = useParams();
    const [page, setPage] = useState(1);
    const [cat, setCat] = React.useState('');






    useEffect(() => {
        dispatch(jobLoadAction(page, keyword, cat, location));
    }, [page, keyword, cat, location]);

    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, []);


    const handleChangeCategory = (e) => {
        setCat(e.target.value);

    }



    return (

        <>

            <Box sx={{ minHeight: "100vh" }}>


                <Container>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <Box sx={{ flex: 2, p: 2 }}>
                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2, bgcolor: palette.primary.white }}>
                                <Box sx={{ pb: 2 }}>
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filter job by category
                                    </Typography>
                                </Box>
                                <SelectComponent handleChangeCategory={handleChangeCategory} cat={cat} />

                            </Card>

                            {/* jobs by location */}
                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2, bgcolor: palette.primary.white }}>
                                <Box sx={{ pb: 2 }}>
                                    {/* <h4>Filter by category</h4> */}
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filter job by location
                                    </Typography>
                                    <MenuList>
                                        {
                                            setUniqueLocation?.map((location, i) => (
                                                <MenuItem key={i}>
                                                    <ListItemIcon>
                                                        <LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} />
                                                    </ListItemIcon>
                                                    <Link style={{ color: palette.secondary.main }} to={`/user/jobList/search/location/${location}`}>{location}</Link>
                                                </MenuItem>

                                            ))
                                        }

                                    </MenuList>

                                </Box>
                            </Card>
                        </Box>
                        <Box sx={{ flex: 5, p: 2 }}>
                            {
                                loading ?
                                    <LoadingBox /> :
                                    jobs?.length === 0 ?
                                        <Box
                                            sx={{
                                                minHeight: '350px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>

                                            <h2>No result found!</h2>
                                        </Box>
                                        :
                                        jobs?.map((job, i) => (
                                            <CardElement
                                                key={i}
                                                id={job._id}
                                                jobTitle={job.title}
                                                description={job.description}
                                                category={job.jobType ? job.jobType.jobTypeName : "No category"}
                                                location={job.location}
                                            />
                                        ))
                            }
                            <Stack spacing={2} >
                                <Pagination color="primary" variant="outlined" page={page} count={pages === 0 ? 1 : pages} onChange={(event, value) => setPage(value)} />
                            </Stack>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default UserJobSearch