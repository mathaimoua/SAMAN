import React from 'react'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react'

function SideDrawer(){

  const PAGES = ["Dashboard", "Locations", "Add New Item", "About", "Logout"]
  const [openDrawer, setOpenDrawer] = useState(false)

  return(
    <React.Fragment>
      <Drawer open={openDrawer}
        onClose={()=> setOpenDrawer(false)}
      >
        <List>
          <h1>SAMAN</h1>
          {
            PAGES.map((page, index) => (
              <ListItemButton key={index} onClick={() => setOpenDrawer(!openDrawer)}>
              <ListItemIcon>
                <ListItemText>{page}</ListItemText>
              </ListItemIcon>
              </ListItemButton>
            ))
          }
        </List>
      </Drawer>
      <IconButton onClick={() => {setOpenDrawer(!openDrawer)}}>
        <MenuIcon sx={{color: 'white'}} />
      </IconButton>

    </React.Fragment>
  )
}

export default SideDrawer;