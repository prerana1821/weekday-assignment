import { FC, ReactNode } from "react";
import { Box, useTheme } from "@material-ui/core";
import { LanguageOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: "0.5rem",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  socialButton: {
    backgroundColor: "#edf2f7",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.primary.main,
  },
}));

type SocialButtonProps = {
  children: ReactNode;
  label: string;
  href: string;
};

const SocialButton: FC<SocialButtonProps> = ({ children, label, href }) => {
  const classes = useStyles();
  return (
    <a
      className={classes.socialButton}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={label}
    >
      {children}
    </a>
  );
};

const Footer: FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <footer className={classes.footer}>
      <Typography variant='h6' fontSize={"smaller"}>
        © 2024 Weekday | All rights reserved
      </Typography>
      <Box className='social-icons'>
        <SocialButton label={"Website"} href={"https://www.weekday.works/"}>
          <LanguageOutlined />
        </SocialButton>
      </Box>
    </footer>
  );
};

export default Footer;
