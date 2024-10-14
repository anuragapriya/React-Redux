import NavTab from "_components/NavTab";

export const tabConfig = [
  {
    id: 1,
    label: "Profiles Awaiting Approval",
    name: "Profiles Awaiting Approval",
    pathname: '/userManagement/users/view',
    //active: false,
  },
  {
    id: 2,
    label: "Manage Organization Name Profiles",
    name: "Manage Organization Name Profiles",
    pathname: '/userManagement/users/add',
   // active: false,
  }
];

const ManagedProfile =()=>{
    return <>
    <NavTab tabConfig={tabConfig}></NavTab>
    </>;
};

export default ManagedProfile;