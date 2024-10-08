import { user } from '_utils/constant';

// array in local storage for registered users
const usersKey = 'react-18-redux-registration-login-example-users';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];

const fakeBackend = () => {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/authenticate') && opts.method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/refreshToken') && opts.method === 'POST':
                        return refreshToken();
                    case url.endsWith('/users/register') && opts.method === 'POST':
                        return register();
                    case url.endsWith('/users') && opts.method === 'GET':
                        return getUsers();
                    case url.match(/\/users\/\d+$/) && opts.method === 'GET':
                        return getUserById();
                    case url.match(/\/users\/\d+$/) && opts.method === 'PUT':
                        return updateUser();
                    case url.match(/\/users\/\d+$/) && opts.method === 'DELETE':
                        return deleteUser();
                    case url.match(/\/users\/\d+$/) && opts.method === 'UPLOAD':
                        return upload();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function authenticate() {
                const { email, password } = body();
                const user = users.find(x => x.email === email && x.password === password);

                if (!user) return error('email or password is incorrect');

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

                if (users.find(x => x.email === user.email)) {
                    return error('email "' + user.email + '" is already taken')
                }

                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
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

                let params = body();
                let user = users.find(x => x.id === idFromUrl());

                // only update password if entered
                if (!params.password) {
                    delete params.password;
                }

                // if email changed check if taken
                if (params.email !== user.email && users.find(x => x.email === params.email)) {
                    return error('email "' + params.email + '" is already taken')
                }

                // update and save user
                Object.assign(user, params);
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
                    viewuri:'https://freeimage.host/i/dyXxVKN',
			
                });
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

            function basicDetails(userdetail) {
                // const {id,userName,email,roles,isVerified,jwtToken,tokenExpiry,refreshToken,refreshTokenExpiry} = user;
                const updatedUser = Object.assign({}, user, userdetail);
                return updatedUser;

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
        });
    }
}

export default fakeBackend;