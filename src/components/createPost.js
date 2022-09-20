import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import React, {useContext,} from 'react'
import Appbar from './Appbar'
import { CurrentUser } from '../contexts/currentUserContext'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function CreatePost()
{
    const navigate = useNavigate()

    const [currentUser, setCurrentUser] = useContext(CurrentUser)

    const createPost = async (values) =>
    {
        try 
        {
            const res = await axios.post('https://jsonplaceholder.typicode.com/posts',
                values
            )
            toast.success(
                `Post Created with success code ${res.status}`
            )
            setTimeout(()=>{
                navigate('/user/posts',{replace: true})
            },1000)
        } 
        catch (error) 
        {
            toast.error(
                    error.message,
                    {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                    }
                )
        }
    }

    const formik = useFormik(
        {
            enableReinitialize:true,
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
            onSubmit: (values) =>
            {
                console.log(values)
                values.userId = currentUser.id
                createPost(values)
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
                            Create Post
                        </Button>
                    </Stack>
                </form>
            </Container>
        </>
    )
}

export default CreatePost