import React, {FormEventHandler} from "react";

import classes from "./Settings.css";
import {CustomFC} from "types/CustomFC";
import Button from "components/Button";
import useTextfield from "hooks/useTextfield";
import {useNavigate} from "react-router-dom";
import useRedirect from "hooks/useRedirect";
import Textfield from "components/Textfield";

const Settings: CustomFC = () => {
  const navigate = useNavigate();
  const [apiKey, apiKeyHandler] = useTextfield('');

  const isApiKeyExist = !!localStorage.getItem('apiKey');
  useRedirect(isApiKeyExist, '/');

  const formHandler: FormEventHandler = (e) => {
    e.preventDefault();

    const isKeyApiExist = !!apiKey;
    if (isKeyApiExist) {
      localStorage.setItem('apiKey', apiKey);
      navigate('/');
    }
  }

  return (
    <section className={classes.page}>
      <div className={classes.popup}>
        <p className={classes.description}>Write your API key to continue using the app</p>
        <form className={classes.form} onSubmit={formHandler}>
          <Textfield
            className={classes.textfield}
            type="password"
            placeholder="API key"
            onChange={apiKeyHandler}
            value={apiKey}
            required
          />
          <Button>Save key</Button>
        </form>
      </div>
    </section>
  );
}

export default Settings;