import React, { FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";

import { CustomFC } from "types/CustomFC";
import { Button, Textfield, Link } from "components";
import { useTextfield, useRedirect } from "hooks";
import classes from "./Settings.css";

const Settings: CustomFC = function () {
  const navigate = useNavigate();
  const [apiKey, apiKeyHandler] = useTextfield("");

  const isApiKeyExist = !!localStorage.getItem("apiKey");
  useRedirect(isApiKeyExist, "/");

  const formHandler: FormEventHandler = (e) => {
    e.preventDefault();

    const isKeyApiExist = !!apiKey;
    if (isKeyApiExist) {
      localStorage.setItem("apiKey", apiKey);
      navigate("/");
    }
  };

  return (
    <section className={classes.page}>
      <div className={classes.popup}>
        <p className={classes.description}>
          Write your{" "}
          <Link
            target="_blank"
            href="https://www.cryptocompare.com/cryptopian/api-keys"
          >
            API key
          </Link>{" "}
          to continue using the app
        </p>
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
};

export default Settings;
