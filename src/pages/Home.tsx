import React from "react";

import {CustomFC} from "../types/CustomFC";
import GraphToolbar from "../components/GraphToolbar";
import useRedirect from "../hooks/useRedirect";

const Home:CustomFC = () => {

  const isApiKeyExist = !!localStorage.getItem('apiKey');
  useRedirect(!isApiKeyExist, '/settings');

  return (
    <div>
      <GraphToolbar />
    </div>
  )
}

export default Home;