import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../APICalls/Constants';
import { Navigate } from 'react-router-dom'

class OAuth2RedirectHandler extends Component {

    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        let windowHref = window.location;
        var results = regex.exec(windowHref.href);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    render() {        
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if(token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            return <Navigate to={"/"}/>; 
        } else {
            window.location.replace("/login?error=" + error);
        }
    }
}

export default OAuth2RedirectHandler;