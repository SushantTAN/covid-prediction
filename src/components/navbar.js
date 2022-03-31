import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
// import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
// import Typography from '@mui/material/Typography';

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [pages, setPages] = React.useState(['Home', 'Predictor', 'login', 'register', 'Profile']);
  const [routes, setRoutes] = React.useState(['/', '/form', '/login', '/register', '/profile']);
  const [settings, setSettings] = React.useState(['Home', 'Predictor', 'login', 'register', 'Profile']);

  // const [refresh, setRefresh] = React.useState(1);

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      setPages(['Home', 'Predictor', 'Profile']);
      setRoutes(['/', '/form', '/profile']);
      setSettings(['Home', 'Predictor', 'Profile']);
    } else {
      setPages(['Home', 'Predictor', 'login', 'register']);
      setRoutes(['/', '/form', '/login', '/register']);
      setSettings(['Home', 'Predictor', 'login', 'register']);
    }
  }, [props.refreshInt]);

  // React.useEffect(()=>{
  //   setRefresh(refresh+1);
  // }, [props.refreshInt, refresh]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = (e) => {
    // console.log(e)
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#FF2E31' }} enableColorOnDark>
      <Container maxWidth="xl" sx={{ backgroundColor: '#FF2E31' }}>
        <Toolbar disableGutters>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            ASCOL
          </Typography> */}

          <img src="http://amritcampus.edu.np/wp-content/uploads/2017/06/amrit-campus-logo.png" alt="Ascol logo" />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton> */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                textAlign: 'right',
              }}
            >
              {pages.map((page, index) => (
                // <MenuItem key={page} onClick={handleCloseNavMenu}>
                // <span style={{ color: 'white'}}>
                <a key={index} className="nav-link" href={routes[index]}>{page}</a>
                // </span>
                // </MenuItem>
              ))}

              {/* <div onClick={() => { localStorage.removeItem('token') }}></div> */}

              {localStorage.getItem('token') && <a className="nav-link" href={'/login'} onClick={() => { localStorage.removeItem('token') }}>Logout</a>}
            </Menu>
          </Box>
          {/* <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              LOGO
            </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: "center" }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <a className="nav-link" style={{ color: 'white' }} href={routes[index]}>{page}</a>
              </Button>
            ))}
            <div className="nav-container">
              {localStorage.getItem('token') && <a className="nav-link logout" href={'/login'} onClick={() => { localStorage.removeItem('token') }}>LOGOUT</a>}
            </div>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
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
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <p>{setting}</p>
                </MenuItem>
              ))}

              <a className="nav-link" href={'/login'} onClick={() => { localStorage.removeItem('token') }}>Logout</a>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;