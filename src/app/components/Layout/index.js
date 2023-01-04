import Header from "../Header";
import Footer from "../Footer";

import "./index.css";

function Layout({ children }) {
  return (
    <div className="Layout">
      <Header />
      <main className="Layout__main">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
