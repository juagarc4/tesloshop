import { FC } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'

interface Props {
  currentValue: number
  maxValue: number
  updateQuantity: (quantity: number) => void
}
export const ItemCounter: FC<Props> = ({ currentValue, maxValue, updateQuantity }) => {
  const AddOrRemove = (value: number) => {
    if (value === -1) {
      // Althoug we disable the component, we want to avoid manual modifications
      if (currentValue === 1) return
      return updateQuantity(currentValue - 1)
    }
    if (value === +1) {
      // Althoug we disable the component, we want to avoid manual modifications
      if (currentValue >= maxValue) return
      return updateQuantity(currentValue + 1)
    }
  }
  return (
    <Box display='flex' alignItems='center'>
      <IconButton disabled={currentValue === 1} onClick={() => AddOrRemove(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}> {currentValue} </Typography>
      <IconButton disabled={currentValue >= maxValue} onClick={() => AddOrRemove(+1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}
