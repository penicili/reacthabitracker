import { Routes, Route } from "react-router";
import AppLayout from "./layout/AppLayout";
import Today from "./pages/Today/Today";
import Create from "./pages/Create/Create";
import Detail from "./pages/Detail/Detail";
function App() {
  return <Routes>
    <Route path="/" element={<AppLayout/>}>
      <Route index element={<Today/>}/>
      <Route path="create" element={<Create/>}/>
      <Route path="detail/:id" element={<Detail/>}/>
    </Route>
  </Routes>;
}

export default App;
