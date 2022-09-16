import React, { useContext } from 'react'
import { Stack, Divider, Typography, Card, Box, IconButton } from '@mui/material'
import { AllPosts } from '../contexts/allPostsContext'
import { CurrentUser } from '../contexts/currentUserContext'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'

const MyPosts = () => 
{
    const posts = useContext(AllPosts)

    const [currentUser, setCurrentUser] = useContext(CurrentUser)

    const myPosts = posts.filter(post => post.userId === currentUser.id)

    const deletePost = (id) =>
    {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(
            alert(`Post ${id} deleted successfully!`))
    }

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
                All Your Posts:  
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
                        myPosts&&myPosts.map((post) => 
                        (
                            <Typography 
                                key={post.id}
                                variant='h6'
                                component='div'
                                sx={{
                                    letterSpacing: '0.1rem'
                                }}
                            >
                                <Stack
                                    direction='row'
                                    spacing={3}
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Link 
                                        to={`/user/posts/${post.id}`}
                                    >
                                        &#10148;  {post.title} &#10140;
                                    </Link>
                                    <IconButton 
                                        aria-label="delete" 
                                        size="large"
                                        color='error'
                                        onClick={() => { deletePost(post.id) }}
                                    >
                                        <DeleteIcon fontSize="medium" />
                                    </IconButton>
                                </Stack>
                            </Typography>
                        ))
                    }
                </Stack>
            </Box>
        </Card>
    )
}

export default MyPosts