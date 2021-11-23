import { render } from "react-dom";
import { StrictMode } from "react";

import Board from "./views/Board";
import { Provider } from "react-redux";
import { store } from "./store";

render(
  <StrictMode>
    <Provider store={store}>
      <Board />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
