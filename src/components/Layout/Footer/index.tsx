import { FC, ReactNode } from "react";
import { Box } from "@material-ui/core";
import { Typography } from "@mui/material";
import { LanguageOutlined } from "@material-ui/icons";
import useStyles from "./Footer.styles";

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
