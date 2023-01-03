import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const useRedirect = (condition: boolean, path: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (condition) {
      navigate(path);
    }
  }, [condition]);
}

export default useRedirect;