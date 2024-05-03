import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  fullScreen: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  },
  modalContainer: {
    position: "fixed",
    backgroundColor: "white",
    width: "80%",
    maxWidth: 800,
    padding: "1rem",
    maxHeight: "70%",
    top: "50%",
    borderRadius: "0.5rem",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    zIndex: 1,
  },
  modalHeader: {
    position: "sticky",
    top: 0,
    backgroundColor: "white",
    padding: "1rem",
  },
  modalBody: {
    flex: 1,
    padding: "1rem",
  },
  modalFooter: {
    position: "sticky",
    bottom: 0,
    backgroundColor: "white",
    padding: "1rem",
  },
});

export default useStyles;
