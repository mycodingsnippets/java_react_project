import axios from 'axios';

class AuthenticationService {

    registerSuccessfulLogin(username, password){

        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);

        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosInterceptors(basicAuthHeader);
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser');
        if(user===null){
            return false;
        }
        return true;
    }

    getLoggedInUsername(){
        let user = sessionStorage.getItem('authenticatedUser');
        if(user===null){
            return '';
        }
        return user;
    }

    setupAxiosInterceptors(basicAuthHeader){
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                }
                return config;
            }
        )
    }

    executeBasicAuthenticationService(username, password){
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);
        return axios.get(`http://localhost:8080/basic-auth`, {
            headers: {
                authorization: basicAuthHeader
            }
        });
    }
}

// For components, we export class directly
// For services, we export instance
export default new AuthenticationService()