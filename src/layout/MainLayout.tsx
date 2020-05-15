import React from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "..";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout: React.FC = (props) => {
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);

  return (
    <div>
      <Header />
      {!auth.isEmpty && <Sidebar />}
      <div className="main">{props.children}</div>
    </div>
  );
};

export default MainLayout;
