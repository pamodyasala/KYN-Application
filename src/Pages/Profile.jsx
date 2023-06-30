import Layout from "../Components/PageTemplate";
import "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js";
import placeholderImg from "../Static/img/sampleimage.jpg";
import UserUtils from '../APICalls/UserServices';
import $ from '../../node_modules/jquery/dist/jquery';

import { useEffect, useState } from "react";

function Profile({authUser, setAuthUser}){
    
    const [contextUser, setContextUser] = useState({});
    const [selectedFlag, setSelectedFlag] = useState("");
    const [imageUpdate, setImageUpdate] = useState({});

    useEffect(()=>{
        UserUtils.getCurrentUser().then((resp)=>{
            setContextUser(resp);
        })
    },[authUser]);

    useEffect(()=>{
        setAuthUser(imageUpdate);
    },[imageUpdate, setAuthUser]);

    useEffect(()=>{

        const phoneInputField = document.querySelector("#phone");
        const phoneInput = window.intlTelInput(phoneInputField, {
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });

        $('.iti__flag-container').on('click', function() {
            setSelectedFlag($('.iti__selected-flag').attr('title').replace(/[^0-9]/g, ''));
        });
        
        return()=>{
            $('.iti__flag-container').off('click');
        }
    },[]);

    useEffect(()=>{
        document.querySelector("#phone").value = "";
        document.querySelector("#phone").value = "+" + selectedFlag + " "  + document.querySelector("#phone").value;
    },[selectedFlag]);

    function removeError(e){
        e.target.classList.remove("is-invalid");
        document.querySelector("#" + e.target.getAttribute("id") + "-feedback").value = "";
    }

    function validateName(name) {
        var regex = /^[A-Z][a-z]*$/;
        return regex.test(name);
    }

    function updateProfile(e){
        e.preventDefault();

        let fNameIsValid = true;
        let lNameIsValid = true;

        if (e.target[0].value.trim().length == 0){
            fNameIsValid = false;
            e.target[0].classList.add("is-invalid");
            document.querySelector("#" + e.target[1].getAttribute("id") + "-feedback").innerHTML = "do not leave the field empty"
        }else{
            if (!validateName(e.target[0].value.trim())){
                fNameIsValid = false;
                e.target[1].classList.add("is-invalid");
                document.querySelector("#" + e.target[1].getAttribute("id") + "-feedback").innerHTML = "invalid name format"
            }
        }

        if (e.target[1].value.trim().length == 0){
            lNameIsValid = false;
            e.target[1].classList.add("is-invalid");
            document.querySelector("#" + e.target[2].getAttribute("id") + "-feedback").innerHTML = "do not leave the field empty"
        }else{
            if (!validateName(e.target[1].value.trim())){
                lNameIsValid = false;
                e.target[2].classList.add("is-invalid");
                document.querySelector("#" + e.target[1].getAttribute("id") + "-feedback").innerHTML = "invalid name format"
            }
        }

        if (fNameIsValid && lNameIsValid){
           
            UserUtils.updateProfile(
                {
                    firstName : e.target[0].value.trim(),
                    lastName : e.target[1].value.trim(),
                    birthDate : e.target[2].value.trim(),
                    contactNo : e.target[3].value.trim(),
                }
    
            ).then((resp)=>{
                setAuthUser(resp.data);
            });
        }     
    }

    return(
        <Layout>
            <div className="px-5 mx-5 pt-5 pb-2">
                <div className ="card mb-5">
                    <div className = "card-header bg-transparent border-0">
                        <h1 className = "fw-bolder" style={{color : "maroon"}}>
                            Personal Information
                        </h1>
                    </div>

                    <div className = "card-body">
                        <form className ="row gy-5" encType = "multipart/form-data" onSubmit={updateProfile}>
                            <div className = "col-md-6 col-12">
                                <div className = "row gy-3">
                                    <div className = "col-12 form-floating">
                                        <input className ="form-control" id = "fname" name = "firstName" placeholder = ".." defaultValue={contextUser.firstName} onBlur={removeError}/>
                                        <label htmlFor = "fname" className = "ms-2">
                                            First Name
                                        </label>
                                        <span className = "invalid-feedback" id = "fname-feedback">
                                            
                                        </span>
                                    </div>
                                    <div className = "col-12 form-floating">
                                        <input className ="form-control" id = "lname" name = "lastName" placeholder = "..." defaultValue={contextUser.lastName} onBlur={removeError}/>
                                        <label htmlFor = "lname" className = "ms-2">
                                            Last Name
                                        </label>
                                            <span className = "invalid-feedback" id ="lname-feedback">
                                            
                                        </span>
                                    </div>
                                    <div className = "col-12 form-floating">
                                        <input className ="form-control" id = "birthdate" type = "date" name = "userBirth" placeholder = ".." defaultValue={contextUser.birthDate} onBlur={removeError}/>
                                        <label htmlFor = "birthdate" className = "ms-2">
                                            Birth Date
                                        </label>
                                        <span className = "invalid-feedback" id = "birthdate-feedback">
                                            
                                        </span>
                                    </div>

                                    <div className = "col-12">
                                        <label htmlFor = "phone" className = "d-block fw-bold">
                                            Contact Number
                                        </label>
                                        <input className ="form-control" type="tel" id="phone" name="contactNumber" defaultValue={contextUser.contactNo} onBlur={removeError}/>
                                        <span className = "invalid-feedback" id = "phone-feedback">
                                            
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className ="col-md-6 col-12 d-flex justify-content-center">
                                <div className ="d-flex flex-column align-items-center">
                                    <div className ="overflow-hidden border border-dark rounded-circle" style = {{height: "10rem", width:"10rem"}}>
                                            <img src = {contextUser.imgPath != null ? contextUser.imgPath: placeholderImg} alt ="img" className ="w-100 h-100"/>
                                    </div>
                                    <div className = "col-12">
                                        
                                        <label htmlFor = "profile-img" className = "fw-bold mb-2">
                                            Profile Image (.jpg and .png only)
                                        </label>
                                        <input className ="form-control" typeof="image" id = "profile-img" name = "image" type = "file" placeholder = ".." onBlur={removeError}/>
                                        <span className = "invalid-feedback" id = "profile-img-feedback">
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className ="col-12 d-flex justify-content-end">
                                <button className ="btn btn-outline-kyn">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;