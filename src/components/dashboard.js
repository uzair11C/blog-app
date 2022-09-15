import { Stack, Container, Divider, Paper, Grid, Typography } from '@mui/material'
import React from 'react'
import Appbar from './Appbar'

import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1A2027',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'white',
  height: '80px'
}));

const Dashboard = () => 
{
    return(
        <> 
            <Appbar />
            <Container 
                maxWidth='lg'
                sx={{
                    height:'85vh',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}
                    >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={8}>
                        <div
                            sx={{}}>
                            <Typography variant='h3' component='h2'
                                sx={{
                                    fontWeight: 700
                                }}
                            >
                                All your posts
                            </Typography>
                            <Stack
                                direction='column-reverse'
                                justifyContent='center'
                                alignItems='flex-start' 
                                divider={<Divider flexItem />}
                                spacing={2}
                            >
                                <Paper>post</Paper>
                                <Paper>post</Paper>
                                <Paper>post</Paper>
                            </Stack>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Paper 
                            elevation={5}
                            sx={{
                                borderRadius: '12px',
                                p: '20px'
                            }}
                        >
                            <Stack
                                direction='column'
                                justifyContent='center'
                                alignItems='flex-start'
                            >
                                <Typography  
                                    variant='h5'
                                    component='h3'
                                    sx={{
                                        fontWeight: 700,
                                        mb: '5px',
                                    }}
                                >
                                    All our bloggers
                                </Typography >
                                <Typography variant='h6' component='div'>
                                    A User
                                </Typography >
                                <Typography variant='h6' component='div'>
                                    A User
                                </Typography >
                                <Typography variant='h6' component='div'>
                                    A User
                                </Typography >
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Dashboard