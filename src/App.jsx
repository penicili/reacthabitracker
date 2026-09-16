import { Routes, Route } from "react-router";
import AppLayout from "./layout/AppLayout";
import Today from "./pages/Today/Today";
function App() {
  return <Routes>
    <Route path="/" element={<AppLayout/>}>
      <Route index element={<Today/>}/>
    </Route>
  </Routes>;
}

export default App;
