import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CreatedByMe from "./CreatedByMe";
import useSWR from "swr";
import { ICases } from "interfaces";
import { ICreatedBy } from "../../interfaces/cases";
import { FC, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import IhaveApplied from "./IhaveApplied";

export const ActivityUser = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Tabs
        defaultActiveKey="createdbyme"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab
          eventKey="createdbyme"
          title="Created by me"
          style={{ height: "650px", width: "100%" }}
        >
          <CreatedByMe createdBy={user!.number_col} />
        </Tab>
        <Tab
          eventKey="ihaveapplied"
          title="I have applied"
          style={{ height: "650px", width: "100%" }}
        >
          <IhaveApplied appliedBy={user!.number_col} />
        </Tab>
      </Tabs>
    </>
  );
};
