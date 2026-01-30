import React from 'react'
import UndoRedo from './UndoRedo'
import Box from '../ui/Box'


const Footer = () => {
  return (
    <footer className='fixed bottom-0 left-0 right-0 py-2 container'>
        <Box className={'py-1! border-primary! bg-primary/5'}>
            <UndoRedo />
        </Box>
    </footer>
  )
}

export default Footer