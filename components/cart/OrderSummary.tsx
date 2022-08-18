import { useContext, FC } from 'react'
import { Grid, Typography } from '@mui/material'
import { CartContext } from 'context'
import { currency } from 'utils'
import { IOrder } from '../../interfaces/order'

interface Props {
  order?: IOrder
}

export const OrderSummary: FC<Props> = ({ order }) => {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContext)
  const summaryValues = order ? order : { numberOfItems, subTotal, tax, total }

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Num. Products</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{summaryValues.numberOfItems}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(summaryValues.subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Taxes ({`${Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%`})</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(summaryValues.tax)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant='subtitle1'>Total</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
        <Typography variant='subtitle1'>{currency.format(summaryValues.total)}</Typography>
      </Grid>
    </Grid>
  )
}
