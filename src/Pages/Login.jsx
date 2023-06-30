import { Component } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../Components/PageTemplate";
import UserUtils from '../APICalls/UserServices';
import { ACCESS_TOKEN, GOOGLE_AUTH_URL } from "../APICalls/Constants";
import { useEffect } from "react";
import { useState } from "react";

function LoginForm(){

    const [searchParam, setSearchParam] = useSearchParams();
    const [providerError, setProviderError] = useState();

    useEffect(()=>{
        setProviderError(searchParam.get("error"));
    },[searchParam]);

    function removeError(e){
        e.target.classList.remove("is-invalid");
        document.querySelector("#" + e.target.getAttribute("id") + "-feedback").innerHTML = "";
    }

    function submitHandler(e){
        e.preventDefault();
        let emailIsValid = true;
        let passwordIsValid = true;

        const emailAddress = document.querySelector("#email-address");
        const password = document.querySelector("#rpw");

        if (emailAddress.value.length === 0){
            emailIsValid = false;
            emailAddress.classList.add("is-invalid");
            document.querySelector("#" + emailAddress.getAttribute("id") + "-feedback").innerHTML = "do not leave the field empty"
        }

        if (password.value.length === 0){
            passwordIsValid = false;
            password.classList.add("is-invalid");
            document.querySelector("#" + password.getAttribute("id") + "-feedback").innerHTML = "do not leave the field empty";
        }

        if (emailIsValid && passwordIsValid){
            UserUtils.findByEmail(emailAddress.value).then((resp) => {
                if (resp.status === 200){
                    UserUtils.login({
                        email : emailAddress.value,
                        password : password.value
                    }).then((resp)=>{
                        authenticate(resp.data);
                    }).catch((err)=>{
                        password.classList.add("is-invalid");
                        document.querySelector("#" + password.getAttribute("id") + "-feedback").innerHTML = "Incorrect password";
                    });
                }
            }).catch(()=>{
                emailAddress.classList.add("is-invalid");
                document.querySelector("#" + emailAddress.getAttribute("id") + "-feedback").innerHTML = "email does not exist";
            });
        }
    }

    function authenticate(resp){
        localStorage.setItem(ACCESS_TOKEN, resp.accessToken);
        window.location.replace("/");
    }

    return(
        <form onSubmit={submitHandler}>
            <div className = "row gx-2 gy-3">
                <div className = "col-12">
                    <div className = "form-floating">
                        <input className = {providerError != null ? "form-control is-invalid" : "form-control"} id = "email-address" name = "email" onBlur={removeError}/>
                        <label htmlFor  = "email-address">Email Address</label> 
                        <div className = "invalid-feedback" id = "email-address-feedback">
                            {
                                providerError
                            }
                        </div>
                    </div>
                </div>
                <div className ="col-12">
                    <div className = "form-floating">
                        <input className = "form-control" type = "password" id = "rpw" name = "password" onBlur={removeError}/>
                        <label htmlFor  = "rpw">Password</label>
                        <div className = "invalid-feedback" id = "rpw-feedback">
                            
                        </div>

                    </div>
                </div>
                <div className ="col-12">
                    <button className ="w-100 btn btn-outline-kyn rounded-3">
                        Login
                    </button>
                </div>
            </div>
        </form>
    );
}


class Login extends Component{

    render(){
        return(
            <Layout>
                <div className="d-flex justify-content-center p-5">
                    <div className="card p-5 shadow-lg" style={{width: "40rem"}}>
                        <div className="card-header bg-transparent border-0">
                            <h1 className="display-6 fw-bold text-center" style={{color:this.newMethod()}}>Sign In</h1>
                            <span className = "text-muted text-center d-block">New to the platform?
                                <Link to = "/registration" className ="fw-bold form-links" style = {{textDecoration : "none !important", color: "maroon"}}> Register</Link>
                            </span>
                        </div>
                        <div className="card-body">
                            <div className="px-3 row gy-3">
                                <div className="col-12">
                                    <a id = "register-button" className="w-100 btn btn-outline-kyn border rounded-3" href = {GOOGLE_AUTH_URL}>
                                        <span className="bi bi-google me-2"> 
                                        </span>
                                        Sign In with Google
                                    </a>
                                </div>
                                <div className="col-12">
                                    <span className="text-muted text-center d-block text-uppercase">or</span>
                                </div>
                                <div className="col-12">
                                    <LoginForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }


    newMethod() {
        return "maroon";
    }
}

export default Login;