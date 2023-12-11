import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Upper from './upperleft_icon';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Link from 'next/link';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface TemporaryDrawerProps {
  ButtonIcon: React.ReactNode;
}

export default function TemporaryDrawer({ ButtonIcon }: TemporaryDrawerProps) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    () => {
      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, backgroundColor: '#FFFAF6' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { text: 'Home', icon: <HomeIcon />, href: '/' },
          { text: 'Reservation', icon: <AccessTimeFilledIcon />, href: '/reservation' },
          { text: 'My Account', icon: <PersonIcon />, href: '/account' },
          { text: 'Help Center', icon: <MailIcon />, href: '/help_center' },
        ].map(({ text, icon, href }, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <Link href={href} passHref>
                <ListItemIcon>{icon}</ListItemIcon>
              </Link>
              <Link href={href} passHref>
                <ListItemText primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { text: 'Terms and Agreements', icon: <InboxIcon />, href: '/terms_and_agreements' },
        ].map(({ text, icon, href }, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <Link href={href} passHref>
                <ListItemIcon>{icon}</ListItemIcon>
              </Link>
              <Link href={href} passHref>
                <ListItemText primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Upper ButtonIcon={<MenuIcon style={{ fontSize: 30, color: "#D78215" }} onClick={toggleDrawer('left', true)} />} />
    
      <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
        {list('left')}
      </Drawer>
    </div>
  );
}
