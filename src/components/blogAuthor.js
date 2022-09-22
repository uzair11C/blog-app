import React, { useContext, useEffect, useState } from 'react'
import { Stack, Paper, Typography, Box } from '@mui/material'
import { AllPosts } from '../contexts/allPostsContext'
import { AllUsers } from '../contexts/allUsersContext'
import { useParams } from 'react-router-dom'

const BlogAuthor = () => 
{
    const posts = useContext(AllPosts)
    const [users, setUsers] = useContext(AllUsers)

    const params = useParams()

    const thisPost = posts.filter(post => post.id === parseInt(params.id))

    const thisUser = users.filter(user => user.id === parseInt(thisPost[0].userId))
    return (
        <Paper 
            elevation={5}
            sx={{
                borderRadius: '15px',
                p: '20px',
                pl:'40px',
                mt: '30px',
                maxHeight: '50vh'
            }}
        >
            <Box>
                <Typography  
                    variant='h5'
                    component='h3'
                    sx={{
                        fontWeight: 700,
                        mb: '10px',
                    }}
                    >
                        About the Author:
                </Typography >
                <Box
                    sx={{
                        maxHeight:'45vh',
                        overflow: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '12px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#6c67b5',
                            borderRadius: '5px',
                        },
                    }}
                >
                    <Stack
                        direction='column'
                        justifyContent='center'
                        alignItems='flex-start'
                        spacing={1}
                    >
                        {/* {
                            users&&users.map((user) => 
                            (
                                <Typography key={user.id} variant='h6' component='div'>
                                    {user.name}
                                </Typography >
                            ))
                        } */}
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{fontSize:'14px'}}
                        >
                            Name: {thisUser[0].name}
                        </Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{fontSize:'14px'}}
                        >
                            Phone: {thisUser[0].phone}
                        </Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{fontSize:'14px'}}
                        >
                            Email: {thisUser[0].email}
                        </Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{fontSize:'14px'}}
                        >
                            Website: {thisUser[0].website}
                        </Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{fontSize:'14px'}}
                        >
                            Company: {thisUser[0].company.name}
                        </Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{fontSize:'14px'}}
                        >
                            Address: {thisUser[0].address.suite},&nbsp;{thisUser[0].address.street}, 
                                    &nbsp;{thisUser[0].address.city},&nbsp;
                                     {thisUser[0].address.zipcode}
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Paper>
    )
}

export default BlogAuthor