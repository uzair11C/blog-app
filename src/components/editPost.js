import React, { useEffect, useState } from 'react'
import { 
    Button,
    Typography,
    Stack,
    TextField,
    Container
 } from '@mui/material'
 import Appbar from './Appbar'
 import { useFormik } from 'formik'
 import * as Yup from 'yup'
 import { useParams, useNavigate } from 'react-router-dom'
 import axios from 'axios'

function EditPost() 
{
    const [currentPost,setCurrentPost] = useState({})

    const navigate = useNavigate()

    const params = useParams()

    const getPost = async () => 
    {
        const res = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${parseInt(params.id)}`
            )
        const post = res.data
        setCurrentPost(post)
        console.log(currentPost)
    }

    useEffect(() => {
        getPost()
    },[])

    const formik = useFormik(
        {
            enableReinitialize:true,
            initialValues:{
                title: currentPost.title,
                body: currentPost.body
            },
            validationSchema: Yup.object(
                {
                    title: Yup.string().required('Required').min(5,'Minimum 5 characters'),
                    body: Yup.string().required('Required').min(10,'At least one line'),
                }
            ),
            onSubmit: (values) =>
            {
                editPost(values)
                console.log(values)
            }
        }
    )

    const editPost = (values) =>
    {
        axios.patch(`https://jsonplaceholder.typicode.com/users/${currentPost.id}`,
        values)
        .then(
            alert(`Successfully Updated Post ${currentPost.id}`),
            navigate('/user/posts',{replace:'true'})
        )
    }

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
                            id="title"
                            placeholder="Post Title"
                            style={{marginBottom:'40px'}}
                            value={formik.values.title} 
                            onChange={formik.handleChange}
                            name='title'
                        />
                        <Typography
                            variant='h4'
                        >
                            Body: 
                        </Typography>
                        <TextField
                            id="body"
                            multiline
                            placeholder='Post Body'
                            rows={7}
                            value={formik.values.body} 
                            onChange={formik.handleChange}
                            style={{marginBottom:'15px'}}
                            name='body'
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            color='warning'
                        >
                            Update Post
                        </Button>
                    </Stack>
                </form>
            </Container>
        </>
    )
}

export default EditPost