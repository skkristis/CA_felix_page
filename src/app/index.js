import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Content from "./pages/Content";
import Layout from "./components/Layout";
import store from "./state";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/content" element={<Content />} />
            <Route path="*" element={<p>Your Lost! No Page Here!</p>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
