import { Container, Grid, Button } from '@mui/material'
import React from 'react'
import Appbar from './Appbar'
import Bloggers from './bloggers'
import PostsComp from './postsComp'
import { Link } from 'react-router-dom'

const Dashboard = () => 
{
    return(
        <> 
            <Appbar />
            <Container 
                maxWidth='lg'
                sx={{
                    height:'85vh',
                    pt: '30px'
                }}
                    >
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} md={8} sx={{}}>
                        <PostsComp />
                    </Grid>
                    <Grid 
                        item 
                        xs={12} 
                        sm={12} 
                        md={4}
                        sx={{
                            display:'flex',
                            flexDirection: 'column',
                            justifyContent:'center',
                            alignItems:'stretch',
                        }}
                    >
                        <Button
                            variant='contained'
                            color='secondary'
                            sx={{
                                fontSize:'18px',
                            }}
                        >
                            <Link 
                                style={{textDecoration:'none',color:'inherit'}}
                                to='/create-post'
                            >
                                Create a new post
                            </Link>
                        </Button>
                        <Bloggers />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Dashboard