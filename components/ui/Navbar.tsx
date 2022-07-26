import { useContext, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { CartContext, UIContext } from 'context'

export const Navbar = () => {
  const { asPath, push } = useRouter()
  const { toggleSideMenu } = useContext(UIContext)
  const { numberOfItems } = useContext(CartContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return
    push(`/search/${searchTerm}`)
  }

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref>
          <Link display='flex' alignItems='center'>
            <Typography variant='h6'>Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />
        <Box className='fadeIn' sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}>
          <NextLink href='/category/men' passHref>
            <Link>
              <Button color={asPath === '/category/men' ? 'primary' : 'info'}>Men</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' passHref>
            <Link>
              <Button sx={{ ml: 1, mr: 1 }} color={asPath === '/category/women' ? 'primary' : 'info'}>
                Women
              </Button>
            </Link>
          </NextLink>
          <NextLink href='/category/children' passHref>
            <Link>
              <Button color={asPath === '/category/children' ? 'primary' : 'info'}>Children</Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />
        {/* Desktop */}

        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            className='fadeIn'
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearchTerm()}
            type='text'
            placeholder='Search...'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={() => setIsSearchVisible(false)} aria-label='toggle password visibility'>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            className='fadeIn'
            onClick={() => setIsSearchVisible(true)}
          >
            <SearchOutlined />
          </IconButton>
        )}
        {/* Mobile */}
        <IconButton sx={{ display: { xs: 'flex', sm: 'none' } }} onClick={toggleSideMenu}>
          <SearchOutlined />
        </IconButton>
        <NextLink href='/cart' passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={numberOfItems} color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  )
}
