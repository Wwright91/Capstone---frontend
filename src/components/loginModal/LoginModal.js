import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SignIn from "../sign_in/Sign_In";
import "./LoginModal.scss";

const LoginModal = ({ openLoginModal, setOpenLoginModal }) => {
  const handleClose = () => {
    setOpenLoginModal(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={openLoginModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <SignIn setOpenLoginModal={setOpenLoginModal} />
        </Typography>
      </Box>
    </Modal>
  );
};

export default LoginModal;
