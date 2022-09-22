import React, { useContext } from 'react'
import { Stack, Divider, Typography, Card,Box } from '@mui/material'
import { AllPosts } from '../contexts/allPostsContext'
import { Link } from 'react-router-dom'

const PostsComp = () => 
{
    const posts = useContext(AllPosts)

    return(
        <Card
            raised
            sx={{
                mt:'30px',
                p: '30px',
                pb: '40px',
                maxHeight: '60vh',
            }}>
            <Typography variant='h4' component='h2'
                sx={{
                    fontWeight: 700
                }}
            >
                Latest Posts for You: 
            </Typography>
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
                    direction='column-reverse'
                    justifyContent='center'
                    alignItems='flex-start' 
                    divider={<Divider flexItem />}
                    spacing={2}
                    sx={{mt:'20px'}}
                >
                    {
                        posts&&posts.map((post) => 
                        (
                            <Typography 
                                key={post.id}
                                variant='h6'
                                component='div'
                                sx={{
                                    letterSpacing: '0.1rem',
                                    textDecoration:'none',
                                    '&:hover':{
                                        color:'green',
                                        transition:'0.3s ease-in-out'
                                    }
                                }}
                            >
                                <Link
                                    to={`/post/${post.id}`}
                                >
                                    &#10148;  {post.title} &#10140;
                                </Link>
                            </Typography>
                        ))
                    }
                    {/* <Typography 
                        variant='body'
                        cmoponent='div'
                    >
                        Post exerpt
                    </Typography> */}
                </Stack>
            </Box>
        </Card>
    )
}

export default PostsComp