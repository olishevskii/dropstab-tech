import React, {FC} from "react";

import classes from "./App.css";
import GraphToolbar from "./components/GraphToolbar";

const App: FC = () => {
  return (
    <div className={classes.app}>
      <GraphToolbar />
    </div>
  );
}

export default App;
