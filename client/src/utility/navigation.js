import { useNavigate } from "react-router-dom";

const useHandleNavigation = () => {
  const navigate = useNavigate();

  const handleNavigation = ({ route }) => {
    navigate(route);
  };

  return handleNavigation;
};

export default useHandleNavigation;
