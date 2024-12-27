import { getMapCenterData, user } from '_utils/constant';
import { portalAccessData } from '_utils/constant';
import { portalData, userRegistrationVerified } from '_utils/constant';

// array in local storage for registered users
const usersKey = 'react-18-redux-registration-login-example-users';
const portalAccessKey = 'portal-access-data';
const mapCenterUserKey = 'map-center-user-datas';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];
let registerPortalData = portalData;
let userVerifyData = userRegistrationVerified;

const fakeBackend = () => {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/Authenticate') && opts.method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/refreshToken') && opts.method === 'POST':
                        return refreshToken();
                    case url.endsWith('/registration/Register') && opts.method === 'POST':
                        return register();
                    case url.endsWith('/users') && opts.method === 'GET':
                        return getUsers();
                    case url.match(/\/users\/\d+$/) && opts.method === 'GET':
                        return getUserById();
                    case url.match(/\/users\/\d+$/) && opts.method === 'PUT':
                        return updateUser();
                    case url.match(/\/users\/\d+$/) && opts.method === 'DELETE':
                        return deleteUser();
                    case url.match(/\/users\/\d+$/) && opts.method === 'POST':
                        return upload();
                    case url.endsWith('/users/GetUserPortalRoleMapping') && opts.method === 'GET':
                        return getAccessData();
                    case url.endsWith('/users/postAccessData') && opts.method === 'POST':
                        return postAccessData();
                    case url.endsWith('/master/GetPortalDetails') && opts.method === 'GET':
                        return getPortalData();
                    case url.match(/\/registration\/VerifiedEmailByUser\?userId=([a-zA-Z0-9_-]+)$/) && opts.method === 'POST':
                        return getVerifiedUserData();
                    case url.match(/\/mapcenter\/GetRegisterMapCentreAsync\?userId=([a-zA-Z0-9_-]+)$/) && opts.method === 'GET':
                        return getMapCenterUser(url);
                    case url.match('/mapcenter/Register-MC') && opts.method === 'POST':
                        return updateMapCenterUser();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function authenticate() {
                const { Email, Password } = body();
                const user = users.find(x => x.EmailAddress === Email && x.Password === Password);

                if (!user) return error('You have entered an incorrect password for the profile associated with this email address.');

                let currentDateTime = new Date();
                let expiryTime = currentDateTime.setMinutes(currentDateTime.getMinutes() + 5)
                user.jwtToken = 'fake-jwt-token';
                user.tokenExpiry = expiryTime;
                return ok({
                    ...basicDetails(user)
                    // token: ,
                    // tokenExpiry : /*'2024-09-25 21:03:24.789150'*/
                });
            }

            function refreshToken() {
                if (!isAuthenticated()) return unauthorized();
                // let auth = JSON.parse(localStorage.getItem('auth')) || [];
                //const user = users.find(x => x.id === auth?.id);               

                let currentDateTime = new Date();
                let expiryTime = currentDateTime.setMinutes(currentDateTime.getMinutes() + 7)

                return ok({
                    token: 'fake-jwt-refreshtoken',
                    tokenExpiry: expiryTime/*'2024-09-25 21:05:24.789150'                 */
                });
            }

            function register() {
                const user = body();

                if (users.find(x => x.EmailAddress === user.EmailAddress)) {
                    return error('email "' + user.EmailAddress + '" is already taken')
                }

                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                user.createdDate = new Date();
                user.status = 1;
                users.push(user);
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok();
            }

            function getUsers() {
                if (!isAuthenticated()) return unauthorized();
                return ok(users.map(x => basicDetails(x)));
            }

            function getUserById() {
                if (!isAuthenticated()) return unauthorized();

                const user = users.find(x => x.id === idFromUrl());
                return ok(basicDetails(user));
            }

            function updateUser() {
                if (!isAuthenticated()) return unauthorized();

                const { data, portalName } = body();
                let params = data;
                console.log(data);
                let user = users.find(x => x.id === idFromUrl());

                // only update password if entered
                if (!params.password) {
                    delete params.password;
                }

                // if email changed check if taken
                if (params.emailAddress !== user.emailAddress && users.find(x => x.emailAddress === params.emailAddress)) {
                    return error('email "' + params.emailAddress + '" is already taken')
                }

                // update and save user

                let userAccess = {
                    ...params,
                    UserAccess: params.UserAccess.map(portal =>
                        portal.PortalName === portalName
                            ? { ...portal, IsProfileCompleted: 1 }
                            : portal
                    )
                };
                console.log(userAccess);

                Object.assign(user, userAccess);

                localStorage.setItem(usersKey, JSON.stringify(users));
                return ok();
            }

            function deleteUser() {
                if (!isAuthenticated()) return unauthorized();

                users = users.filter(x => x.id !== idFromUrl());
                localStorage.setItem(usersKey, JSON.stringify(users));
                return ok();
            }

            function upload() {

                return ok({
                    viewuri: 'https://freeimage.host/i/dyXxVKN',

                });
            }

            function getAccessData() {
                let accessData = JSON.parse(localStorage.getItem(portalAccessKey)) || portalAccessData;;
                return ok(accessData);
            }

            function postAccessData() {
                // Retrieve the access data from the body function
                const accessData = body();
                let portalAccess = JSON.parse(localStorage.getItem(portalAccessKey)) || portalAccessData;
                console.log(accessData);
                let newAccesData = { ...portalAccess };

                // Create a new array for the updated portal access data
                const updatedPortalAccess = portalAccess?.Data.map(portal => {
                    // Create a shallow copy of the portal object
                    const newPortal = { ...portal };
                    newPortal.PortalRoleAccess = portal.PortalRoleAccess.map(roleAccess => {
                        // Create a shallow copy of the roleAccess object
                        const newRoleAccess = { ...roleAccess };
                        newRoleAccess.FeatureAccess = roleAccess.FeatureAccess.map(permission => {
                            // Create a shallow copy of the permission object
                            const newPermission = { ...permission };
                            // Find the corresponding changed data
                            const changedData = accessData.find(x => x.RoleAccessMappingID === permission.RoleAccessMappingID);
                            // Update the permission if there is a corresponding change
                            if (changedData && permission.RoleAccessMappingID === changedData.RoleAccessMappingID) {
                                newPermission.IsActive = changedData.IsActive;
                            }
                            return newPermission;
                        });
                        return newRoleAccess;
                    });
                    return newPortal;
                });

                newAccesData.Data = updatedPortalAccess;
                // Store the updated portal access data in localStorage
                localStorage.setItem(portalAccessKey, JSON.stringify(newAccesData));

                // Return a successful response
                return ok();
            }

            function getPortalData() {
                return ok(registerPortalData);
            }

            function getVerifiedUserData() {

                return ok(userVerifyData);
            }

            function getMapCenterUser() {
                try {                   
                    let mapCenterUser = JSON.parse(localStorage.getItem(mapCenterUserKey)) || getMapCenterData;;
                    return ok(mapCenterUser);
                }
                catch (error) {
                    return error('Failed to get map center user');
                }
            }

            function updateMapCenterUser() {
                try {
                    const mapCenterData = body();

                    let mapCenterUserData = JSON.parse(localStorage.getItem(mapCenterUserKey)) || getMapCenterData;

                    // Create a deep copy of the object to avoid modifying read-only properties
                    let newData = JSON.parse(JSON.stringify(mapCenterData));

                    newData.Data.DocumentData = [...mapCenterUserData.Data.DocumentData];

                    // Save the updated data back to localStorage
                    localStorage.setItem(mapCenterUserKey, JSON.stringify(newData));

                    // Return a successful response
                    return ok();
                } catch (err) {
                    console.error('Error updating map center user:', err);
                    return error('Failed to update map center user');
                }
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, ...headers(), json: () => Promise.resolve(body) })
            }

            function unauthorized() {
                resolve({ status: 401, ...headers(), json: () => Promise.resolve({ message: 'Unauthorized' }) })
            }

            function error(message) {
                resolve({ status: 400, ...headers(), json: () => Promise.resolve({ message }) })
            }

            function isAuthenticated() {
                return opts.headers['Authorization'] === 'Bearer fake-jwt-token' || 'Bearer fake-jwt-refreshtoken';
            }

            function body() {
                return opts.body && JSON.parse(opts.body);
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function headers() {
                return {
                    headers: {
                        get(key) {
                            return ['application/json'];
                        }
                    }
                }
            }

            function basicDetails(userdetail) {
                // const {id,userName,email,roles,isVerified,jwtToken,tokenExpiry,refreshToken,refreshTokenExpiry} = user;
                const updatedUser = {
                    ...user,
                    Data: {
                      ...user.Data,
                      UserDetails: {
                        ...user.Data.UserDetails,
                        ...userdetail
                      }
                    }
                  };
                return updatedUser;
            }
        });
    }
}

export default fakeBackend;