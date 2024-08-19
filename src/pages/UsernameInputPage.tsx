import { useNavigate } from "react-router-dom";
import { UsernameInputs } from "../components/UsernameInputs";
import { useSettingsContext } from "../context";

export const UsernameInputPage = () => {
  const { usernames, setUsernames } = useSettingsContext();
  const navigate = useNavigate();

  const onSubmit = (values: string[]) => {
    setUsernames(values);
    navigate("/");
  };

  return <UsernameInputs usernames={usernames} onSubmit={onSubmit} />;
};
