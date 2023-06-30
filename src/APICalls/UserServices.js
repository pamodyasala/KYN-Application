import axios from "axios";
import { ACCESS_TOKEN } from "./Constants";

export const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

class UserUtils{
    APIURL =  "http://localhost:8080/kynapi";

    registerUser(user){
        return axios.post(this.APIURL + "/open/register", user);
    }

    login(payload){
        return axios.post(this.APIURL + "/open/login", payload);
    } 

    findByEmail(email){
        return axios.get(this.APIURL + "/open/email-exist/" + email);
    }
    
    storeListing(keyword){
        if(keyword == null) return request({
            url : this.APIURL + "/auth/store-listing-all",
            method: "GET"
        });
        
        return request({
            url : this.APIURL + "/auth/store-listing?search=" + keyword,
            method: "GET"
        });
    }

    getCurrentUser(){
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }
    
        return request({
            url: this.APIURL + "/auth/current-user",
            method: 'GET'
        });
    }


    updateImage(payload){
        // return axios({
        //     method: 'patch',
        //     url: this.APIURL + "/auth/edit-user-image",
        //     data: payload,
        //     headers: {
        //       'content-type': 'multipart/form-data; charset=utf-8',
        //       'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        //     }
        //   });
          return axios.patch(
            this.APIURL + "/auth/edit-user-image",
            payload,
            {headers : {
                'content-type': 'multipart/form-data; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }}
          );
    }
    
    isUserAdmin(){
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }
    
        return request({
            url: this.APIURL + "/auth/is-user-admin",
            method: 'GET'
        });
    }

    updateProfile(payload){
        return axios({
            method: 'patch',
            url: this.APIURL + "/auth/edit-user-profile",
            data: payload,
            headers: {
              'content-type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
          });
        //return axios.patch(this.APIURL + "/auth/edit-user-profile", payload, );
    }



}

export default new UserUtils();