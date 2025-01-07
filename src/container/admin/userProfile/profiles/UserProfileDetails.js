import React from "react";


const UserProfileDetails = ({userData}) => {
    return(
        <div>
            <h2>User Details</h2>
            <p>User Name: {userData.FullName}</p>
            <p>Company Name: {userData.AgencyID}</p>
            <p>Company Email: {userData.EmailAddress}</p>
            <p>Phone Number: 123-456-6543</p>
            <p>Portal Access : {userData.JurisdictionID}</p>
            <p>Portal Role : {userData.RoleID}</p>

        </div>
    );
};

export default UserProfileDetails;