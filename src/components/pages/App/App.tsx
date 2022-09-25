import Body from "../Body/Body";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState } from "react";
import "./App.css"

export default function App() {
  const [page, setPage] = useState("login");

  return (
    <div className="App">
      <Header setPage={setPage} />
      <Body page={page} />
      <Footer />
    </div>
  );
}
