import React, {useContext,useState,useEffect} from 'react'
import { Container, Paper, Typography, Button, Stack } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CurrentUser } from '../contexts/currentUserContext'
import { AllUsers } from '../contexts/allUsersContext'
// import { Link } from 'react-router-dom'

const Login = () => 
{
    let error = ''
    const [users, setUsers] = useContext(AllUsers)
    const [currentUser, setCurrentUser] = useContext(CurrentUser)

    const formik = useFormik(
        {
            initialValues:{
                name: '',
                email: '',
            },
            validationSchema: Yup.object(
                {
                    name: Yup.string().required('Required'),
                    email: Yup.string().email('Invalid Email').required('Required'),
                }
            ),
            onSubmit: (values) =>
            {
                console.log(values)
                submitHandler()
            }
        }
    )

    const submitHandler = () =>
    {
        users && users.map((user) => {
            if( user.email === formik.values.email )
            {
                setCurrentUser(
                    {
                        ...currentUser, 
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    }
                )
            }
            else
            {
                error = 'Details do not match'
            }
        })
    }

    console.log(users)

    return(
    <Container maxWidth='lg' sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
        <Paper sx={{width:'400px',height:'400px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'20px',backgroundColor:'#878dfa'}}>
            <Typography variant='h2' component='div' sx={{textAlign:'left',mb:'10px'}}>
                Login
            </Typography>
            <Typography variant='p' component='p' sx={{color:'red'}}>
                {error}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3} >
                    <div>
                        <label htmlFor='name'>
                            <Typography variant='h4'>
                                Name:
                            </Typography>
                        </label>
                        <input onBlur={formik.handleBlur} type='text' id='name' name='name' placeholder='Name' value={formik.values.name} onChange={formik.handleChange}/>
                        {formik.touched.name && formik.errors.name?<Typography variant='subtitle' component='p'>{formik.errors.name}</Typography>:null}
                    </div>
                    
                    <div>
                        <label htmlFor='email'>
                            <Typography variant='h4'>
                                Email
                            </Typography>
                        </label>
                        <input onBlur={formik.handleBlur} type='email' id='email' name='email' placeholder='Email' value={formik.values.email} onChange={formik.handleChange}/>
                        {formik.touched.email && formik.errors.email?<Typography variant='subtitle' component='p'>{formik.errors.email}</Typography>:null}
                    </div>

                    <Button type='submit' variant='contained' sx={{mt:'10px'}} onSubmit={formik.handleSubmit}>
                        Submit
                    </Button>
                    {/* <Typography>
                        Don&#39;t have an account? <Link href='/sign-up'><Button variant='contained' color='success'>Sign-Up!</Button></Link>
                    </Typography> */}
                </Stack>
            </form>
        </Paper>
    </Container>
    )
}

export default Login