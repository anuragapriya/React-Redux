import NavTab from "_components/NavTab";
import UserList from "./UserList";
import { Jurisdiction } from "container/energyAssistance";



const Home =()=>{
  const tabConfig = [
    { label: "PROFILE AWAITING FOR APPROVAL", component: <UserList /> },
    { label: " MANAGE ORGANIZATION NAME PROFILES", component: <Jurisdiction /> },
   
  ];

  return <NavTab tabConfig={tabConfig} />;
};

export default Home;