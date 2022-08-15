import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { UIContext, AuthContext } from 'context'
import { DashboardOutlined } from '@mui/icons-material'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material'

export const SideMenu = () => {
  const router = useRouter()

  const { isMenuOpen, toggleSideMenu } = useContext(UIContext)
  const [searchTerm, setSearchTerm] = useState('')
  const { isLoggedIn, user, logout } = useContext(AuthContext)
  const isAdmin = isLoggedIn && user?.role === 'admin'

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return
    navigateTo(`/search/${searchTerm}`)
  }
  const navigateTo = (url: string) => {
    toggleSideMenu()
    router.push(url)
  }

  return (
    <Drawer
      open={isMenuOpen}
      onClose={toggleSideMenu}
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearchTerm()}
              type='text'
              placeholder='Search...'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={onSearchTerm} aria-label='toggle password visibility'>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {isLoggedIn && (
            <>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={'Profile'} />
              </ListItem>

              <ListItem button onClick={() => navigateTo('/orders/history')}>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={'My orders'} />
              </ListItem>
            </>
          )}

          <ListItem onClick={() => navigateTo('/category/men')} button sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Men'} />
          </ListItem>

          <ListItem onClick={() => navigateTo('/category/women')} button sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Women'} />
          </ListItem>

          <ListItem onClick={() => navigateTo('/category/children')} button sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={'Children'} />
          </ListItem>

          {!isLoggedIn ? (
            <ListItem
              button
              onClick={() => {
                const dest = router.asPath !== '/' ? `/auth/login?p=${router.asPath}` : '/auth/login'
                navigateTo(dest)
              }}
            >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={'Login'} />
            </ListItem>
          ) : (
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
          )}

          {/* Admin */}
          {isAdmin && (
            <>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>
              <ListItem button onClick={() => navigateTo('/admin')}>
                <ListItemIcon>
                  <DashboardOutlined />
                </ListItemIcon>
                <ListItemText primary={'Dashboard'} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CategoryOutlined />
                </ListItemIcon>
                <ListItemText primary={'Products'} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={'Orders'} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={'Users'} />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  )
}
