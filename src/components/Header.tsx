import { AppBar, Toolbar, Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar position='sticky' color='secondary'>
      <Toolbar>
        <Typography variant='h4'>👋 Prerana</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
