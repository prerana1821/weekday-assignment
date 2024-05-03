import { IconButton, IconButtonProps } from "@mui/material";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import useStyles from "./ScrollToTopButton.styles";

interface ScrollToTopButtonProps {
  scrollToTop: () => void;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps & IconButtonProps> = ({
  scrollToTop,
  ...props
}) => {
  const classes = useStyles();

  return (
    <IconButton className={classes.iconButton} onClick={scrollToTop} {...props}>
      <KeyboardArrowUpIcon />
    </IconButton>
  );
};

export default ScrollToTopButton;
