import React, { useEffect, useState } from 'react'
import { Stack, Typography, Card,Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const BlogBody = () => 
{
    const params = useParams()

    const [single, setSingle] = useState({})

    const fetchSingle = async () =>
    {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
        const data = await res.data
        setSingle(data)
    }

    useEffect(() => {
        fetchSingle()
    },[])

    return(
        <Card
            raised
            sx={{
                mt:'30px',
                p: '30px',
                pb: '40px',
                maxHeight: '60vh',
            }}>
            {/* <Typography variant='h4' component='h2'
                sx={{
                    fontWeight: 700
                }}
            >
                Latest Posts for You: 
            </Typography> */}
            <Box 
                sx={{
                    maxHeight:'55vh',
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
                    //divider={<Divider flexItem />}
                    spacing={2}
                    sx={{mt:'20px'}}
                >
                    <Typography 
                        variant='h4'
                        component='div'
                    >
                        {single.title}
                    </Typography>
                    {/* {
                        posts&&posts.map((post) => 
                        (
                            <Typography 
                                key={post.id}
                                variant='h6'
                                component='div'
                                sx={{
                                    letterSpacing: '0.1rem'
                                }}
                            >
                                &#10148;  {post.title} &#10140;
                            </Typography>
                        ))
                    } */}
                    {/* <Typography 
                        variant='body'
                        cmoponent='div'
                    >
                        Post exerpt
                    </Typography> */}
                    <Typography 
                        variant='h6'
                        component='div'
                    >
                        {single.body}
                    </Typography>
                </Stack>
            </Box>
        </Card>
    )
}

export default BlogBody