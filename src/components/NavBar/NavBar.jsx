import { AppBar, Toolbar, Tabs, Tab, Button, useMediaQuery, useTheme } from '@mui/material';
import React,{useState} from 'react';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SideDrawer from '../SideDrawer/SideDrawer';

function NavBar(){

  const PAGES = ["Locations", "Dashboard", "Add New Item", "About"]
  const [currentTab, setCurrentTab] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  console.log(isMatch)

  return (
    <React.Fragment>
      <AppBar sx={{background: 'black'}}>
        <Toolbar>
          {isMatch ? (
            <>
            <SideDrawer />
            SAMAN
            </>
            
          ) : (
            <>
          <Tabs 
            textColor="inherit" 
            value={currentTab}
            onChange={(e, currentTab) => setCurrentTab(currentTab)}
            indicatorColor="white"
            >
              {
              PAGES.map((page, index) => (
                <Tab key={index} label={page} />
              ))

              }
          </Tabs>
          <Button sx={{marginLeft: 'auto', color: 'white'}}><PowerSettingsNewIcon/></Button>
          </>
        )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default NavBar;