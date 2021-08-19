import "./App.css";
import { BrowserRouterHook } from "./utils/use-router";
import { Switch, Route } from "react-router-dom";
import Index from "./pages/index";
import Meeting from "./pages/meeting";
import ShareScreen from "./pages/shareScreen";
import RoomListPage from "./components/roomListPage/js/App";

function App() {
  return (
    <BrowserRouterHook>
      <Switch>
        <Route exact path="/roomList" component={RoomListPage}></Route>
        <Route exact path="/shareScreen" component={ShareScreen}></Route>
        <Route exact path="/meeting" component={Meeting}></Route>
        <Route path="/" component={Index}></Route>
      </Switch>
    </BrowserRouterHook>
  );
}

export default App;
