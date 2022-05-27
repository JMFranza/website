import { Container, Typography, Box, Grid, Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import client from '../utils/client';
import { urlForThumbnail } from '../utils/image';
import { Store } from '../utils/Store';

export default function Home() {
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    products: [],
    error: '',
    loading: true,
  });
  //const { loading, error, products } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setState({ products, loading: false });
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={5} sm={3} marginTop={10}></Grid>

        <Grid item xs={5} sm={10}>
          <Box borderBottom={1} fontSize={30}>
            ASTIG 03 FAQS
          </Box>
          <Box sx={{ border: 1, borderRadius: '16px' }} marginTop={6}>
            <Typography color="inherit" marginTop={5} padding={3}>
              ⦁ What data do Astig03 Collect ?
              <Typography>
                Astig03 only collects your profile picture, address, email
                address, and contact number. We don't collect birthdate or other
                personal information to lessen the risk of hackers obtaining
                full information about you incase our system get attacked.
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ border: 1, borderRadius: '16px' }} marginTop={6}>
            <Typography color="inherit" marginTop={5} padding={3}>
              ⦁ What is the mode of payment Astig03 offers?
              <Typography>
                Currently our website only offer Cash On Delivery (COD) and
                PayPal. In our physical store, we offer COD & Online payments
                like PayPal.
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ border: 1, borderRadius: '16px' }} marginTop={6}>
            <Typography color="inherit" marginTop={5} padding={3}>
              ⦁ Does Astig03 have a physical store?
              <Typography>
                - Dragon 8 mall Divisor Second floor 2f-12(Dragon 8 Mall Divisor
                (Second floor) 2f-12 C.M Recto cor. Dagupan St., Divisoria,
                Manila.)
              </Typography>
              <Typography>
                - Unit 74 Ground Floor Acienda Designer Outlet Km. 48, Aguinaldo
                Hwy cor. Balubad Rd Brgy, Silang, 4118 Cavite
              </Typography>
              <Typography>We are open on;</Typography>
              <Typography>
                ⦁ Location: (Dragon 8 Mall) [Monday - Saturday] - 7 AM to 8 PM
              </Typography>
              <Typography>
                ⦁ Location: (Acienda) [Monday - Friday] - 10 AM to 7 PM
              </Typography>
              <Typography>
                We are looking to build more branches in the future to further
                serve our dear customer.
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ border: 1, borderRadius: '16px' }} marginTop={6}>
            <Typography color="inherit" marginTop={5} padding={3}>
              ⦁ How can you contact us?
              <Typography>
                You can send us a direct message on our Facebook Page or contact
                us at 091 6427 3049. If you have an account here, you can chat
                us directly. On navigation > your profile picture dropdown >
                Chat admin
              </Typography>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}
