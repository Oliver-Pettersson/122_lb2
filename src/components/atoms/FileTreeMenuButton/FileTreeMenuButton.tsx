import { Button, ButtonProps } from '@mui/material'
import React from 'react'

export default function FileTreeMenuButton({children, ...props}: ButtonProps) {
  return (
    <Button variant='outlined' size="small" {...props}>{children}</Button>
  )
}
