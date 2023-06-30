import { Component } from "react";
import Layout from "../Components/PageTemplate";
import UserUtils from '../APICalls/UserServices';
import { GOOGLE_AUTH_URL } from "../APICalls/Constants";

function RegistrationForm({submitHandler}){
    function removeError(e){
        e.target.classList.remove("is-invalid");
        document.querySelector("#" + e.target.getAttribute("id") + "-feedback").value = "";
    }

    return(
        <form className="row g-3" onSubmit={submitHandler}>
            <div className="col-12">
                <div className="form-floating">
                    <input className="form-control" id="email-address" onBlur={removeError}/>
                    <label htmlFor="email-address">Email Address</label>
                    <div className = "invalid-feedback" id = "email-address-feedback">
                    
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="form-floating">
                    <input className="form-control" id="fname"  onBlur={removeError}/>
                    <label htmlFor="fname">First Name</label>
                    <div className = "invalid-feedback" id = "fname-feedback">
                    
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="form-floating">
                    <input className="form-control" id="lname"  onBlur={removeError}/>
                    <label htmlFor="lname">Last Name</label>
                    <div className = "invalid-feedback" id = "lname-feedback">
                    
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="form-floating">
                    <input className="form-control" id="rpw" type = "password"  onBlur={removeError}/>
                    <label htmlFor="rpw">Password</label>
                    <div className = "invalid-feedback" id = "rpw-feedback">
                    
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="form-floating">
                    <input className="form-control" id="cpw" type = "password"  onBlur={removeError}/>
                    <label htmlFor="cpw">Confirm Password</label>
                    <div className = "invalid-feedback" id = "cpw-feedback">
                    
                    </div>
                </div>
            </div>
            <div className="col-12">
                <button id = "register-button" className="w-100 btn btn-outline-kyn border rounded-3">
                    Register
                </button>
            </div>
            <div className="col-12">
                <span className="text-muted text-center d-block text-uppercase">or</span>
            </div>
            <div className="col-12">
                <a id = "register-button" className="w-100 btn btn-outline-kyn border rounded-3" href={GOOGLE_AUTH_URL}>
                    <span className="bi bi-google me-2"> 
                    </span>
                    Sign up with Google
                </a>
            </div>
        </form>
    );
}

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            register : null,
            code : null
        }
        this.emailExist = this.emailExist.bind(this);
        this.registerAction = this.registerAction.bind(this);
        this.validateEmail = this.validateEmail.bind(this);

    }
    
    emailExist(email){
        UserUtils.findByEmail(email.value.trim())
            .then(()=>{
                document.querySelector("#" + email.getAttribute("id") + "-feedback").innerHTML = "email is already in use";
                email.classList.add("is-invalid");
            }).catch(()=>{

                UserUtils.registerUser(
                    {
                        "email": email.value.trim(),
                        "password": document.querySelector("#rpw").value.trim(),
                        "firstName": document.querySelector("#fname").value.trim(),
                        "lastName": document.querySelector("#lname").value.trim()
                    }
                ).then(()=>{
                    window.location.replace("/login");
                });
            });
    }


    validateName(name) {
        var regex = /^[A-Z][a-z]*$/;
        return regex.test(name);
    }

    //email validator
    validateEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    registerAction(e){
        e.preventDefault();

        const emailaddress = document.querySelector("#email-address");
        const fname =  document.querySelector("#fname");
        const lname = document.querySelector("#lname");
        const rawPass = document.querySelector("#rpw");
        const confPass = document.querySelector("#cpw");

        if (emailaddress.value.trim().length === 0 || fname.value.trim().length === 0 || lname.value.trim().length === 0 
                || rawPass.value.trim().length === 0 || confPass.value.trim().length === 0){

                if (emailaddress.value.trim().length === 0){
                    emailaddress.classList.add("is-invalid");
                    document.querySelector("#" + emailaddress.getAttribute("id") + "-feedback").innerHTML = "field is required";;
                }

                if (fname.value.trim().length === 0){
                    fname.classList.add("is-invalid");
                    document.querySelector("#" + fname.getAttribute("id") + "-feedback").innerHTML = "field is required";
                }

                if (lname.value.trim().length === 0){
                    lname.classList.add("is-invalid");
                    document.querySelector("#" + lname.getAttribute("id") + "-feedback").innerHTML = "field is required";
                }

                if (rawPass.value.trim().length === 0){
                    rawPass.classList.add("is-invalid");
                    document.querySelector("#" + rawPass.getAttribute("id") + "-feedback").innerHTML = "field is required";;
                }

                if (confPass.value.trim().length === 0){
                    confPass.classList.add("is-invalid");
                    document.querySelector("#" + confPass.getAttribute("id") + "-feedback").innerHTML = "field is required";
                }
                    
            }else{
                if (!this.validateName(fname.value) || !this.validateName(lname.value) || !this.validateEmail(emailaddress.value) 
                   || rawPass.value !== confPass.value){
                    
                    if (!this.validateName(fname.value.trim())){
                        fname.classList.add("is-invalid");
                        document.querySelector("#" + fname.getAttribute("id") + "-feedback").innerHTML = "invalid name format";
                    }

                    if (!this.validateName(lname.value.trim())){
                        lname.classList.add("is-invalid");
                        document.querySelector("#" + lname.getAttribute("id") + "-feedback").innerHTML = "invalid name format";
                    }

                    if (!this.validateEmail(emailaddress.value.trim())){
                        emailaddress.classList.add("is-invalid");
                        document.querySelector("#" + emailaddress.getAttribute("id") + "-feedback").innerHTML = "invalid email format";
                    }

                    if (rawPass.value.trim() !== confPass.value.trim()){
                        confPass.classList.add("is-invalid");
                        document.querySelector("#" + confPass.getAttribute("id") + "-feedback").innerHTML = "confirm password should match password";
                    }

                }else{
                    this.emailExist(emailaddress);
                }
            }

    }

    render() {
        return (
            <Layout>
                <div className="d-flex justify-content-center p-5">
                    <div className="card p-5 shadow-lg" style={{width: "40rem"}}>
                        <div className="card-header bg-transparent border-0">
                            <h1 className="display-6 fw-bold text-center" style={{color:"maroon"}}>Sign Up</h1>
                        </div>
                        <div className="card-body">
                            <div className="px-7">
                                <RegistrationForm submitHandler={this.registerAction}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Register;