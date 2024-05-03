import { IconButton, IconButtonProps } from "@mui/material";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

interface ScrollToTopButtonProps {
  scrollToTop: () => void;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps & IconButtonProps> = ({
  scrollToTop,
  ...props
}) => {
  return (
    <IconButton
      sx={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        backgroundColor: "primary.main",
        color: "white",
        "&:hover": {
          backgroundColor: "primary.dark",
        },
      }}
      onClick={scrollToTop}
      {...props}
    >
      <KeyboardArrowUpIcon />
    </IconButton>
  );
};

export default ScrollToTopButton;
