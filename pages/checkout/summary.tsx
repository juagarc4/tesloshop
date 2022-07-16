import { Typography, Grid, CardContent, Divider, Card, Box, Button, Link } from '@mui/material'
import NextLink from 'next/link'
import { ShopLayout } from 'components/layouts'
import { CartList, OrderSummary } from 'components/cart'

const SummaryPage = () => {
  return (
    <ShopLayout title='Order summary' pageDescription='Order summary'>
      <Typography variant='h1' component='h1'>
        Order summary
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Summary (3 Products)</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Delivery Adress</Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'>Edit</Link>
                </NextLink>
              </Box>
              <Typography>Raul Garcia</Typography>
              <Typography>schwannstr. 25</Typography>
              <Typography>40476 Düsseldorf</Typography>
              <Typography>Germany</Typography>
              <Typography>+49 15236215698</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>Edit</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>
                  Confirm Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage
