import {useNavigate} from "react-router-dom";

const useRedirect = (condition: boolean, path: string) => {
  const navigate = useNavigate();
  if (condition) {
    navigate(path);
  }
}

export default useRedirect;