import { useState, useContext } from 'react';
import { 
  Button,
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Menu, 
  Container, 
  MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom'
import { CurrentUser } from '../contexts/currentUserContext'

const Appbar = () => 
{
  const [currentUser, setCurrentUser] = useContext(CurrentUser)

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
            <Typography
                variant="h5"
                component="div"
                noWrap
                sx={{
                pr: 6,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                Blog App
            </Typography>
          <Box sx={{display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography variant='body1' textAlign="center"
                    sx={{textDecoration:'none'}}
                  >
                    <Link 
                      className='link'
                      style={{ color: 'inherit', textDecoration: 'none'}} 
                      to='/dashboard'
                    >
                      Dashboard
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography variant='body1' sx={{textDecoration:'none'}} textAlign="center">
                    <Link 
                      style={{ color: 'inherit', textDecoration: 'inherit'}} 
                      to={`user/${currentUser.id}`}
                    >
                      My Posts
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  {/* <Typography variant='body1' sx={{textDecoration:'none'}} textAlign="center">
                    <Link 
                      to='/contact'
                    >
                      Contact
                    </Link>
                  </Typography> */}
                </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="h6"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Blog App
          </Typography>
          <Box sx={{ width:'100%', display: { xs: 'none', md: 'flex' }, justifyContent:'center' }}>
            <Typography
                variant='h5' component='h5'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', margin:'10px', textDecoration:'none' }}
              >
                <Link 
                  className='link'
                  style={{ color: 'inherit', textDecoration: 'none'}} 
                  to='/dashboard'
                >
                  Dashboard
                </Link>
              </Typography>
              <Typography
                variant='h5' component='h5'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', margin:'10px', textDecoration:'none' }}
              >
                <Link 
                  style={{ color: 'inherit', textDecoration: 'inherit'}} 
                  to={`/user/posts/${currentUser.id}`}
                >
                  My Posts
                </Link>
              </Typography>
              {/* <Typography
                variant='h5' component='h5' 
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block',margin:'10px', textDecoration:'none' }}
              >
                <Link 
                  to='/contact'
                >
                  Contact
                </Link>
              </Typography> */}
          </Box>
          <Box sx={{pr:2,whiteSpace:'nowrap'}}>
            <Typography variant='h5' component='div'>
                {currentUser.name}
            </Typography>
          </Box>
          <Button
            variant='contained'
            color='error'
            onClick={() => {setCurrentUser({
              id: null,
              name: '',
              email: '',
              })}}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Appbar;