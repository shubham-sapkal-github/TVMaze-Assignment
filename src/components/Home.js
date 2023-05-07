import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowList from "./ShowList";
import ShowDetails from "./ShowDetails";

function Home() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ShowList />} />
          <Route path="/show/:id" element={<ShowDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Home;
