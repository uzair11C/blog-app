import { Container, Grid, Button } from '@mui/material'
import Appbar from './Appbar'
import MyPosts from './myPosts'
import Bloggers from './bloggers'

function MyPostsPage()
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
                        <MyPosts />
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
                            Create a new post
                        </Button>
                        <Bloggers />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default MyPostsPage