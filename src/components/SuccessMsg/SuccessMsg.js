import Swal from "sweetalert2";

const SuccessMsg = ({ message }) => {
  Swal.fire({
    icon: "success",
    title: "Bom trabalho",
    text: message,
  });
};

export default SuccessMsg;
