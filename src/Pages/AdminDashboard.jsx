import React, { Component, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../Components/PageTemplate";
import $ from '../../node_modules/jquery/dist/jquery';
import "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js";
import UserUtils from '../APICalls/UserServices';
import StoreUtils from '../APICalls/StoreServices';

function Navtabs(){
    let location = useLocation();

    useEffect(()=>{
        document.querySelectorAll(".nav-link").forEach((e)=>{
                e.getAttribute("href") === location.pathname ?  
                    e.classList.add("active") : e.classList.remove("active");
        });
      }, [location]);

    return(
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link to ="/admin" className="nav-link active">View Stores</Link>
            </li>
            <li className="nav-item">
                <Link to ="add-store" className="nav-link">Add Store</Link>
            </li>
        </ul>
    );
}


class AdminDashboard extends Component{

    //contains store listing and actions through outlet
    render(){
        return(
            <Layout>
                <div className="card my-5 mx-5 py-5">
                    <div className="card-header bg-transparent border-0">
                        <Navtabs/>
                    </div>
                    <div className="card-body">
                        <Outlet/>  
                    </div>
                </div>
            </Layout>
        );
    }
}


//actions for store
export function StoreUpdate(){
 
    const {id} = useParams();
    const navigate = useNavigate();
    const [store, setStore] = useState({});

    useEffect(()=>{
        StoreUtils.findStore(id).then((resp)=>{
            setStore(resp.data);
        });
    }, [id]);

    function validateName(name) {
        var regex = /^[A-Z][a-z]*$/;
        return regex.test(name);
    }

    function validateNumber(number){
        var regex = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
        return regex.test(number);
    }

    //email validator
    function validateEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    function removeError(e){
        e.target.classList.remove("is-invalid");
        document.querySelector("#" + e.target.getAttribute("id") + "-feedback").value = "";
    }

    const [selectedFlag, setSelectedFlag] = useState("");

    useEffect(()=>{
        const phoneInputField = document.querySelector("#phone");
        const phoneInput = window.intlTelInput(phoneInputField, {
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });

        document.querySelectorAll('.iti__flag-container')
            .forEach((e)=>{
                e.addEventListener("click", ()=>{
                    setSelectedFlag(document.querySelector('.iti__selected-flag').getAttribute("title").replace(/[^0-9]/g, ''));
                    //setSelectedFlag(selectedFlag.replace(/[^0-9]/g, ''));
                });
            });
    },[]);

    useEffect(()=>{
        document.querySelector("#phone").value = "";
        document.querySelector("#phone").value = "+" + selectedFlag + " "  + document.querySelector("#phone").value;
    },[selectedFlag]);
    
    const submitForm = (e) => {
        e.preventDefault();

        //validators
        let nameIsValid = true;
        let emailIsValid = true;
        let ownerIsValid = true;
        let contactIsValid = true;
        let locationIsValid = true;

        if (e.target[1].value.trim().length == 0){
            e.target[1].classList.add("is-invalid");
            document.querySelector("#" + e.target[1].getAttribute("id") + "-feedback").innerHTML = "field is required";
            nameIsValid = false;
        }

        if (e.target[2].value.trim().length == 0){
            e.target[2].classList.add("is-invalid");
            document.querySelector("#" + e.target[2].getAttribute("id") + "-feedback").innerHTML = "field is required";
            emailIsValid = false;
        }else{
            if(!validateEmail(e.target[2].value.trim())){
                e.target[2].classList.add("is-invalid");
                document.querySelector("#" + e.target[2].getAttribute("id") + "-feedback").innerHTML = "invalid email format";
                emailIsValid = false;
            }
        }

        if (e.target[3].value.trim().length == 0){
            e.target[3].classList.add("is-invalid");
            document.querySelector("#" + e.target[3].getAttribute("id") + "-feedback").innerHTML = "field is required";
            ownerIsValid = false;
        }

        if (e.target[4].value.trim().length == 0){
            e.target[4].classList.add("is-invalid");
            document.querySelector("#" + e.target[4].getAttribute("id") + "-feedback").innerHTML = "field is required";
            contactIsValid = false;
        }else{
            if (!validateNumber(e.target[4].value.trim())){
                document.querySelector("#" + e.target[4].getAttribute("id") + "-feedback").innerHTML = "invalid number format";
                contactIsValid = false;
            }
        }

        if (e.target[5].value.trim().length == 0){
            e.target[5].classList.add("is-invalid");
            document.querySelector("#" + e.target[5].getAttribute("id") + "-feedback").innerHTML = "field is required";
            locationIsValid = false;
        }

        if(locationIsValid && contactIsValid && ownerIsValid && emailIsValid && nameIsValid){
            StoreUtils.editStore(
                e.target[0].value.trim(),
                {
                    storeId : e.target[0].value.trim(),
                    storeName : e.target[1].value.trim(),
                    storeEmail : e.target[2].value.trim(),
                    storeOwner : e.target[3].value.trim(),
                    contactNo : e.target[4].value.trim(),
                    locations : e.target[5].value.trim()
                }
            ).then(()=>{
                navigate("/admin");
            })
        }
    }

    return(
        <div className = "container">
            <div className = "my-5">   
                <h1 className = "fw-bolder" style={{color : "#d1a080"}}>Edit "This" Store</h1>
                <div className = "card">
                    <div className ="card-body">
                        <form className = "row g-3 p-2 px-3" onSubmit={submitForm}>
                                <input type={"hidden"} value={store.storeId}/>
                                <div className = "alert alert-info bg-gradient">
                                    <h1>INFO!</h1>
                                    <p>
                                        Please capitalize all text (e.g. "My Store") and separate all locations with comma ",".
                                    </p>
                                </div>
                                <span className ="fw-bolder h4">
                                    Store Information
                                </span>
                                <div className ="col-12 form-floating">
                                    <input className ="form-control" id = "name" placeholder = "..." defaultValue={store.storeName} onBlur={removeError}/>
                                    <label htmlFor = "name" className = "ms-2">
                                        Store Name
                                    </label>
                                    <div className = "invalid-feedback" id = "name-feedback">
                                            
                                    </div>
                                </div>
                                <div className ="col-12 form-floating">
                                    <input className ="form-control" id = "email" placeholder = "..." defaultValue={store.storeEmail} onBlur={removeError}/>
                                    <label htmlFor = "email" className = "ms-2">
                                        Business Email
                                    </label>
                                    <div className = "invalid-feedback" id = "email-feedback">
                                            
                                    </div>
                                </div>  
                                <div className ="col-12 form-floating">
                                    <input className ="form-control" id = "owner" placeholder = "..." defaultValue={store.storeOwner} onBlur={removeError}/>
                                    <label htmlFor = "owner" className = "ms-2">
                                        Store Owner
                                    </label>
                                    <div className = "invalid-feedback" id = "owner-feedback">
                                    
                                    </div>
                                </div>
                                <div className = "col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor = "phone" className = "d-block fw-bold">
                                                Contact Number
                                            </label>
                                            <input className ="form-control" type="tel" id="phone" defaultValue={store.contactNo} onBlur={removeError}/>
                                        </div>
                                        <div className="col-6">
                                            <div className = "invalid-feedback" id = "phone-feedback">
                                                    
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className ="col-12 form-floating">
                                    <textarea className ="form-control" id = "locations" style = {{minHeight: "10rem"}} defaultValue={store.locations} placeholder=".." onBlur={removeError}/>
                                    <label htmlFor = "locations" className = "ms-2">
                                        Locations
                                    </label>
                                    <div className = "invalid-feedback" id = "locations-feedback">
                                            
                                    </div>
                                </div>
                                <div className ="col-12">
                                    <button className = "btn btn-kyn w-100 bg-gradient px-3 py-1" style = {{fontSize:"1.23rem"}}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                    </div>
                </div>
        </div>
        
    </div>
    );
}

export function PostStore(){

    const navigate = useNavigate();

    function validateName(name) {
        var regex = /^[A-Z][a-z]*$/;
        return regex.test(name);
    }

    function validateNumber(number){
        var regex = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
        return regex.test(number);
    }

    //email validator
    function validateEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    function removeError(e){
        e.target.classList.remove("is-invalid");
        document.querySelector("#" + e.target.getAttribute("id") + "-feedback").value = "";
    }

    const [selectedFlag, setSelectedFlag] = useState("");

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
        $('#phone').val("");
        $('#phone').val("+" + selectedFlag + " " + $('#phone').val());
    },[selectedFlag]);

    const submitForm = (e) => {
        e.preventDefault();

        //validators
        let nameIsValid = true;
        let emailIsValid = true;
        let ownerIsValid = true;
        let contactIsValid = true;
        let locationIsValid = true;

        if (e.target[0].value.trim().length == 0){
            e.target[0].classList.add("is-invalid");
            document.querySelector("#" + e.target[0].getAttribute("id") + "-feedback").innerHTML = "field is required";
            nameIsValid = false;
        }

        if (e.target[1].value.trim().length == 0){
            e.target[1].classList.add("is-invalid");
            document.querySelector("#" + e.target[1].getAttribute("id") + "-feedback").innerHTML = "field is required";
            emailIsValid = false;
        }else{
            if(!validateEmail(e.target[1].value.trim())){
                e.target[1].classList.add("is-invalid");
                document.querySelector("#" + e.target[1].getAttribute("id") + "-feedback").innerHTML = "invalid email format";
                emailIsValid = false;
            }
        }

        if (e.target[2].value.trim().length == 0){
            e.target[2].classList.add("is-invalid");
            document.querySelector("#" + e.target[2].getAttribute("id") + "-feedback").innerHTML = "field is required";
            ownerIsValid = false;
        }

        if (e.target[3].value.trim().length == 0){
            e.target[3].classList.add("is-invalid");
            document.querySelector("#" + e.target[3].getAttribute("id") + "-feedback").innerHTML = "field is required";
            contactIsValid = false;
        }else{
            if (!validateNumber(e.target[3].value.trim())){
                document.querySelector("#" + e.target[3].getAttribute("id") + "-feedback").innerHTML = "invalid number format";
                contactIsValid = false;
            }
        }

        if (e.target[4].value.trim().length == 0){
            e.target[4].classList.add("is-invalid");
            document.querySelector("#" + e.target[4].getAttribute("id") + "-feedback").innerHTML = "field is required";
            locationIsValid = false;
        }

        if(locationIsValid && contactIsValid && ownerIsValid && emailIsValid && nameIsValid){
            StoreUtils.postStore(
                {
                    storeName : e.target[0].value.trim(),
                    storeEmail : e.target[1].value.trim(),
                    storeOwner : e.target[2].value.trim(),
                    contactNo : e.target[3].value.trim(),
                    locations : e.target[4].value.trim()
                }
            ).then(()=>{
                navigate("/admin");
            })
        }
    }

    return(
        <div className = "container">
            <div className = "my-5">   
                <h1 className = "fw-bolder" style={{color : "#d1a080"}}>Add New Store</h1>
                <div className = "card">
                    <div className ="card-body">
                        <form className = "row g-3 p-2 px-3" onSubmit={submitForm}>
                                <div className = "alert alert-info bg-gradient">
                                    <h1>INFO!</h1>
                                    <p>
                                        Please capitalize all text (e.g. "My Store") and separate all locations with comma ",".
                                    </p>
                                </div>
                                <span className ="fw-bolder h4">
                                    Store Information
                                </span>
                                <div className ="col-12 form-floating">
                                    <input className ="form-control" id = "name" placeholder = "..." onBlur={removeError}/>
                                    <label htmlFor = "name" className = "ms-2">
                                        Store Name
                                    </label>
                                    <div className = "invalid-feedback" id = "name-feedback">
                                            
                                    </div>
                                </div>
                                <div className ="col-12 form-floating">
                                    <input className ="form-control" id = "email" placeholder = "..." onBlur={removeError}/>
                                    <label htmlFor = "email" className = "ms-2">
                                        Business Email
                                    </label>
                                    <div className = "invalid-feedback" id = "email-feedback">
                                            
                                    </div>
                                </div>  
                                <div className ="col-12 form-floating">
                                    <input className ="form-control" id = "owner" placeholder = "..." onBlur={removeError}/>
                                    <label htmlFor = "owner" className = "ms-2">
                                        Store Owner
                                    </label>
                                    <div className = "invalid-feedback" id = "owner-feedback">
                                    
                                    </div>
                                </div>
                                <div className = "col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor = "phone" className = "d-block fw-bold">
                                                Contact Number
                                            </label>
                                            <input className ="form-control" type="tel" id="phone" onBlur={removeError}/>
                                        </div>
                                        <div className="col-6">
                                            <div className = "invalid-feedback" id = "phone-feedback">
                                                    
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className ="col-12 form-floating">
                                    <textarea className ="form-control" id = "locations" style = {{minHeight: "10rem"}} placeholder=".." onBlur={removeError}/>
                                    <label htmlFor = "locations" className = "ms-2">
                                        Locations
                                    </label>
                                    <div className = "invalid-feedback" id = "locations-feedback">
                                            
                                    </div>
                                </div>
                                
                                <div className ="col-12">
                                    <button className = "btn btn-kyn w-100 bg-gradient px-3 py-1" style = {{fontSize:"1.23rem"}}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                    </div>
                </div>
        </div>
        
    </div>
    );
}


export class StorePosted extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            stores : []
        };

        this.deleteStore = this.deleteStore.bind(this);
    }

    deleteStore(e){
        StoreUtils.deleteStore(e.target.getAttribute("data-target"))
            .then((resp)=>{
                this.setState({stores : resp.data})
                }
            );
    }

    componentDidMount(){
       UserUtils.storeListing(null).then((resp)=>{
        this.setState({stores : resp});
       });
    }


    render(){
            if(this.state.stores.length === 0){
                return(
                    <div className = 'container-fluid py-5'>
                        <div className ="card">
                            <div className = 'card-body position-relative overflow-auto' style = {{height: "800px"}}>
                                <div className = "position-absolute top-50 start-50 translate-middle w-100 h-100">
                                    <div className = "d-flex justify-content-center align-items-center w-100 h-100">
                                        <span className ="text-muted display-6 fw-lighter">
                                            No store posted yet
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>            
                    </div>
                );
            }else{
                return(
                    <div className = 'container py-5'>
                        <div className ="card">
                            <div className = 'card-body position-relative overflow-auto' style = {{height: "500px"}}>
                                {
                                    this.state.stores.map((e) => {
                                        return(
                                            <div key = {e.storeId} className ="card mb-3">
                                                <div className = "card-header bg-transparent">
                                                    <h1 className ="display-6 fw-bold">
                                                        {e.storeName}
                                                    </h1>
                                                </div>
                                                <div className ="card-body">
                                                    <div className = "d-flex flex-row my-1">
                                                        <span className = "fw-bold mx-2">
                                                            Store Owner: 
                                                        </span>
                                                        <span>
                                                            {e.storeOwner}
                                                        </span>
                                                    </div>
                                                    <div className = "d-flex flex-row my-1">
                                                        <span className = "fw-bold mx-2">
                                                            Store Email: 
                                                        </span>
                                                        <span>
                                                            {e.storeEmail}
                                                        </span>
                                                    </div>
                                                    <div className = "d-flex flex-row my-1">
                                                        <span className = "fw-bold mx-2">
                                                           Contact No: 
                                                        </span>
                                                        <span>
                                                            {e.contactNo}
                                                        </span>
                                                    </div>
                                                    <div className = "d-flex flex-column my-1">
                                                        <span className = "fw-bold mx-2">
                                                            Locations
                                                        </span>
                                                        <span>
                                                            <ul>
                                                                {e.locations.split(",").map((e)=>{
                                                                    return(
                                                                        <li key = {e}>{e}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </span>
                                                    </div>
                                                    
                                                </div>
                                                <div className = "card-footer bg-transparent border-0">
                                                    <div className = "d-flex justify-content-end w-100">
                                                        <Link to = {"edit-store/" + e.storeId} className ="btn btn-outline-kyn bg-gradient mx-1">
                                                            Edit Post
                                                        </Link>
                                                        
                                                        <button className ="btn btn-danger bg-gradient mx-1" data-target = {e.storeId} onClick={this.deleteStore}>
                                                            Delete Post
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>            
                    </div>
                );
            }
    }
}

export default AdminDashboard;