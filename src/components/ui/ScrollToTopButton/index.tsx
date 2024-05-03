import { IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

interface ScrollToTopButtonProps {
  scrollToTop: () => void;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  scrollToTop,
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
    >
      <KeyboardArrowUpIcon />
    </IconButton>
  );
};

export default ScrollToTopButton;
