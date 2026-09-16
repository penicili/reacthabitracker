import { Routes, Route } from "react-router";
import AppLayout from "./layout/AppLayout";
function App() {
  return <Routes>
    <Route path="/" element={<AppLayout/>}>
    </Route>
  </Routes>;
}

export default App;
