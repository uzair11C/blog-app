import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import React, {useContext,useEffect,useState} from 'react'
import Appbar from './Appbar'
import { CurrentUser } from '../contexts/currentUserContext'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function CreatePost()
{
    const [currentUser, setCurrentUser] = useContext(CurrentUser)

    const [newPost, setNewPost] = useState({
        id:'',
        userId: '',
        title: '',
        body: ''
    })

    const createPost = () =>
    {
        setNewPost({
            id: Math.random(),
            userId: currentUser.id,
            title: formik.values.title,
            body: formik.values.body
        })

        console.log(newPost)
        axios.post('https://jsonplaceholder.typicode.com/posts',{
            id: newPost.id,
            userId: newPost.id,
            title: newPost.title,
            body: newPost.body
        })
        .then(alert(`Successfully Created Post ${newPost.id}`))
        .then(setNewPost({
            id:'',
            userId: '',
            title: '',
            body: ''
        }))
    }

    const formik = useFormik(
        {
            initialValues:{
                title: '',
                body: ''
            },
            validationSchema: Yup.object(
                {
                    title: Yup.string().required('Required').min(5,'Minimum 5 characters'),
                    body: Yup.string().required('Required').min(10,'At least one line'),
                }
            ),
            onSubmit: () =>
            {
                createPost()
            }
        }
    )

    return(
        <>
            <Appbar />
            <Container 
                maxWidth='md'
                sx={{
                    height:'85vh',
                    mt:'15px',
                    pt:'50px',
                }}
            >
                <form onSubmit={formik.handleSubmit}
                    style={{
                        width:'inherit',
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'center',
                        alignItems:'stretch'
                    }}    
                >
                <Stack 
                    direction='column'
                    justifyContent='flex-start'
                    alignItems='stretch'
                    spacing={1}
                    sx={{width:'inherit'}}
                >
                    <Typography
                        variant='h4'
                    >
                        Title: 
                    </Typography>
                    <TextField
                        id="outlined-textarea"
                        placeholder="Post Title"
                        style={{marginBottom:'40px'}}
                        value={formik.values.name} 
                        onChange={formik.handleChange}
                    />
                    <Typography
                        variant='h4'
                    >
                        Body: 
                    </Typography>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        placeholder='Post Body'
                        rows={7}
                        value={formik.values.name} 
                        onChange={formik.handleChange}
                        style={{marginBottom:'15px'}}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='warning'
                        onSubmit={formik.handleSubmit}
                    >
                        Create Post
                    </Button>
                </Stack>
                </form>
            </Container>
        </>
    )
}

export default CreatePost