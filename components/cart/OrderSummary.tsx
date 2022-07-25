import { useContext } from 'react'
import { Grid, Typography } from '@mui/material'
import { CartContext } from 'context'
import { format } from 'utils'

export const OrderSummary = () => {
  const { numberOfItems, subTotal, taxes, total } = useContext(CartContext)
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Num. Products</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{numberOfItems}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{format(subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Taxes ({`${Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%`})</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{format(taxes)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant='subtitle1'>Total</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
        <Typography variant='subtitle1'>{format(total)}</Typography>
      </Grid>
    </Grid>
  )
}
