import React, { useContext, useEffect, useState } from 'react'
import { Stack, Paper, Typography, Box } from '@mui/material'
import { AllPosts } from '../contexts/allPostsContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const BlogAuthor = () => 
{
    const params = useParams()

    const posts = useContext(AllPosts)

    const thisPost = posts.filter(post => post.id === parseInt(params.id))

    const [author, setAuthor] = useState([])

    const fetchSingle = async () =>
    {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${thisPost[0].userId}`)
        const data = await res.data
        setAuthor(data)
    }

    useEffect(() => {
        fetchSingle()
        console.log(thisPost)
        console.log(author.address.city)
    },[])

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
                        About the author:
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
                        {/* <Typography
                            variant='h6'
                            component='p'
                            sx={{fontSize:'14px'}}
                        >
                            Name: {author.name}
                        </Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{fontSize:'14px'}}
                        >
                            Phone: {author.phone}
                        </Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{fontSize:'14px'}}
                        >
                            Email: {author.email}
                        </Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{fontSize:'14px'}}
                        >
                            Website: {author.website}
                        </Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{fontSize:'14px'}}
                        >
                            Company: {author.company.name}
                        </Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{fontSize:'14px'}}
                        >
                            Address: {author.address.suite}, {author.address.street}, 
                                     {author.address.city}
                                     {author.address.zipcode}
                        </Typography> */}
                    </Stack>
                </Box>
            </Box>
        </Paper>
    )
}

export default BlogAuthor