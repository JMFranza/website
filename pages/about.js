import { Container, Typography, Box, Grid, Link } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import client from '../utils/client';
import { urlForThumbnail } from '../utils/image';
import { Store } from '../utils/Store';
import PhoneIcon from '@mui/icons-material/Phone';
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
        <Typography> ASTIG 03 ABOUT</Typography>
        <Grid item xs={5} sm={10}>
          <Box borderBottom={1} fontSize={30}>
            <Typography textAlign="center" variant="h4">
              Who we are and why we do what we do!
            </Typography>
          </Box>
          <Box sx={{ border: 1, borderRadius: '16px' }} marginTop={6}>
            <Typography color="inherit" marginTop={5} padding={3}>
              We Astig03 General Merchandise offer latest trends, unique and
              stylish products from our stores to you for a cheaper price.
              Costumes for your kids that gives them a sprinkle of cuteness.
              Shoes and bags that can make your style shine at a cheaper price.
            </Typography>
          </Box>
          <Box sx={{ border: 1, borderRadius: '16px' }} marginTop={3}>
            <Typography color="inherit" marginTop={5} padding={3}>
              Join Astig03 to find everything you need at the best prices. Buy
              the products you want in a worry-free manner. Refer to shop
              ratings and reviews to find trusted review from other shoppers.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h3" textAlign="center" marginTop={10}>
        BRANCHES AND STORE HOURS
      </Typography>

      <Box olor="black">
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={5} sm={3}>
              <Box marginTop={10} fontSize={35}>
                MERCHANDISE
              </Box>
            </Grid>

            <Grid item xs={5} sm={4}>
              <Box borderBottom={1} marginTop={3}>
                <Box
                  component="img"
                  sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="location jpg."
                  src="https://scontent.fmnl25-4.fna.fbcdn.net/v/t39.30808-6/272147734_5353166681395031_8513818380821404129_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHQQTlWrZnGKnyoNB8sg_rBwERuc6QI0kDARG5zpAjSQJBrjcXogIpFKHjnNwQyaiDIcKKRbEHRD-9YZ-TDLC2c&_nc_ohc=2zERrT4kY08AX-jjrGp&_nc_ht=scontent.fmnl25-4.fna&oh=00_AT9HaXRzWiIxzZsVokqbJwe8sXewVq9nsdO1pkTDFyhlVA&oe=6292799C"
                />
              </Box>
              <Box marginTop={1}>
                <Link href="/" color="inherit">
                  Dragon 8 mall Divisor Second floor 2f-12
                </Link>
              </Box>
              <Box marginTop={1}>
                <Link href="/search" color="inherit">
                  (Dragon 8 Mall Divisor (Second floor) 2f-12 C.M Recto cor.
                  Dagupan St., Divisoria, Manila. )
                </Link>
              </Box>
              <Box marginTop={1}>
                <Link href="/faqs" color="inherit">
                  Location: (Acienda) = 10 AM to 7 PM [ Monday - Friday ]
                </Link>
              </Box>
            </Grid>
            <Grid item xs={5} sm={5}>
              <Box borderBottom={1} marginTop={3}>
                <Box
                  component="img"
                  sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="location jpg."
                  src="https://scontent.fmnl25-4.fna.fbcdn.net/v/t1.6435-9/76730708_3105299982848390_5582876298415439872_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHQPR9Dswa1ikZT_5lGvStw6xQoKUXdVKvrFCgpRd1Uq_XnGTMa3GcK5mO8d3jQrZbMoNWvI5dfcfmBvUD0jZbL&_nc_ohc=0O7QfOahyzYAX-mgVpA&_nc_ht=scontent.fmnl25-4.fna&oh=00_AT92s3h7ptLSu_AjCNv6hGqp8ZMqsgGJQzeZJwJ_MgoFMA&oe=62B47821"
                />
              </Box>
              <Box marginTop={1}>
                Unit 74 Ground Floor Acienda Designer Outlet Km. 48, Aguinaldo
                Hwy cor. Balubad Rd Brgy, Silang, 4118 Cavite
              </Box>
              <Box marginTop={1}>
                Location:(Dragon 8 Mall) = 7 AM to 8 PM [ Monday - Saturday ]
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={2}></Grid>
        </Container>
      </Box>
      <Typography align="center" marginTop={5}>
        Contact Us
        <Typography>
          <PhoneIcon /> 091 6427 3049
        </Typography>
      </Typography>
    </Layout>
  );
}
