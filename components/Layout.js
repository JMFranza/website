import { createTheme } from '@mui/material/styles';
import {
  AppBar,
  Grid,
  Badge,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  Link,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import Head from 'next/head';
import NextLink from 'next/link';
import classes from '../utils/classes';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    jsCookie.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    jsCookie.remove('userInfo');
    jsCookie.remove('cartItems');
    jsCookie.remove('shippingAddress');
    jsCookie.remove('paymentMethod');
    router.push('/');
  };

  const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: 'error' });
      }
    };
    fetchCategories();
  }, [enqueueSnackbar]);

  const isDesktop = useMediaQuery('(min-width:600px)');

  const [query, setQuery] = useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };
  const styles = {
    paperContainer: {
      height: 400,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url(${'/public/images/b10.jpg'})`,
    },
  };
  return (
    <>
      <Head>
        <title>{title ? `${title} -ASTIG 03 MERCHANDISE` : 'ASTIG03'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={sidebarOpenHandler}
                sx={classes.menuButton}
              >
                <MenuIcon sx={classes.navbarButton} />
              </IconButton>
              <NextLink href="/" passHref>
                <Link>
                  <Typography sx={classes.brand}>
                    {' '}
                    METRCHANDISE ASTIG 03{' '}
                  </Typography>
                </Link>
              </NextLink>
            </Box>
            <NextLink href="/" passHref>
              <Link>HOME</Link>
            </NextLink>

            <NextLink href="/search" passHref>
              <Link>PRODUCTS</Link>
            </NextLink>
            <NextLink href="/faqs" passHref>
              <Link>FAQS</Link>
            </NextLink>
            <NextLink href="/about" passHref>
              <Link>ABOUT</Link>
            </NextLink>
            <Drawer
              anchor="left"
              open={sidbarVisible}
              onClose={sidebarCloseHandler}
            >
              <List>
                <ListItem>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography> CATEGORIES </Typography>
                    <IconButton
                      aria-label="close"
                      onClick={sidebarCloseHandler}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider light />
                {categories.map((category) => (
                  <NextLink
                    key={category}
                    href={`/search?category=${category}`}
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                      onClick={sidebarCloseHandler}
                    >
                      <ListItemText primary={category}></ListItemText>
                    </ListItem>
                  </NextLink>
                ))}
              </List>
            </Drawer>
            <Box sx={isDesktop ? classes.visible : classes.hidden}>
              <form onSubmit={submitHandler}>
                <Box sx={classes.searchForm}>
                  <InputBase
                    name="query"
                    sx={classes.searchInput}
                    placeholder="Search products"
                    onChange={queryChangeHandler}
                  />
                  <IconButton
                    type="submit"
                    sx={classes.searchButton}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Box>
              </form>
            </Box>

            <Box>
             
              <NextLink href="/cart" passHref>
                <Link>
                  <Typography component="span">
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        badgeContent={cart.cartItems.length}
                      >
                        Cart
                      </Badge>
                    ) : (
                      'Cart'
                    )}
                  </Typography>
                </Link>
              </NextLink>

              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    sx={classes.navbarButton}
                    onClick={loginClickHandler}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, '/order-history')
                      }
                    >
                      Order History
                    </MenuItem>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          component="header"
          bgcolor="text.disabled"
          color="dark"
          marginTop={2}
          style={styles.paperContainer}
        >
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={5} sm={3}>
                <Box marginTop={10} fontSize={35}>
                  ASTIG 03
                </Box>
              </Grid>
              <Grid item xs={5} sm={3} marginTop={10}></Grid>
              <Grid item xs={5} sm={6}>
                <Box borderBottom={1} fontSize={30}>
                  YOUR SHOPPING VENTURES STARTS HERE
                </Box>
                <Box>
                  <Typography color="inherit" marginTop={5}>
                    Check out more products that suit your style
                  </Typography>
                  <Box marginTop={4}></Box>
                  <Button variant="contained" marginTop={10} href="/search">
                    VIEW PRODUCTS
                  </Button>
                </Box>
                <Box marginTop={10}></Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box marginTop={10}></Box>
        <Container component="main" sx={classes.main}>
          {children}
        </Container>

        <footer>
          <Box
            component="footer"
            sx={classes.footer}
            bgcolor="text.secondary"
            color="white"
          >
            <Container maxWidth="lg">
              <Grid container spacing={2}>
                <Grid item xs={5} sm={3}>
                  <Box marginTop={10} fontSize={35}>
                    ASTIG 03
                  </Box>
                </Grid>

                <Grid item xs={5} sm={4}>
                  <Box borderBottom={1} marginTop={3}>
                    QUICK LINKS
                  </Box>
                  <Box marginTop={1}>
                    <Link href="/" color="inherit">
                      HOME
                    </Link>
                  </Box>
                  <Box marginTop={1}>
                    <Link href="/search" color="inherit">
                      PRODUCTS
                    </Link>
                  </Box>
                  <Box marginTop={1}>
                    <Link href="/faqs" color="inherit">
                      FAQS
                    </Link>
                  </Box>
                  <Box marginTop={1}>
                    <Link href="/about" color="inherit">
                      ABOUT
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={5} sm={5}>
                  <Box borderBottom={1} marginTop={3}>
                    CONTACT INFO
                  </Box>
                  <Box marginTop={1}>
                    <Link
                      href="https://www.facebook.com/Astig03-General-Merchandise-1908583755853358/"
                      color="inherit"
                    >
                      FACEBOOK
                    </Link>
                  </Box>
                  <Box marginTop={1}>
                    <Link href="/" color="inherit">
                      09164273049
                    </Link>
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={2}></Grid>
              <Typography align="center" marginTop={5}>
                © 2022 astig03 All rights reserved.
              </Typography>
            </Container>
          </Box>
        </footer>
      </ThemeProvider>
    </>
  );
}
