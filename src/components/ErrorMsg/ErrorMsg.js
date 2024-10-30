import Swal from "sweetalert2";
import { resetErrAction } from "../../redux/slices/globalActions/globalActions";
import { useDispatch } from "react-redux";

const ErrorMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "error",
    title: "Ops...",
    text: message,
  });
  dispatch(resetErrAction());
};

export default ErrorMsg;
