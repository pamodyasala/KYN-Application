import { Link } from "react-router-dom";

import logo from '../Static/img/kynkyn.png'
import '../Static/css/nav.css';
import { useEffect, useRef, useState } from "react";

//variables
let body = document.querySelector("body");

//Admin nav selector
function AdminNav({isAdmin, removeExpand}){
   
    return isAdmin ? (
        <li className = "nav-item-list">
            <Link className  = "popover-item" to =  "admin" onClick={removeExpand}>
                Admin
            </Link>
        </li>
    ) : <></>;
}

//unauthenticated nav selector
function AnonNav({removeExpand}){
    let availableLinks = useRef(null);

    const navs = [
        {
            route : "/about",
            Name : "About"
        },
        {
            route : "/contact",
            Name : "Contact"
        },
        {
            route : "/terms-and-condition",
            Name : "Terms"
        },
        {
            route : "/registration",
            Name : "Register"
        },
        {
            route : "/login",
            Name : "Login"
        }
    ];

    useEffect(()=>{
        availableLinks.current.style.setProperty("--nav-links", availableLinks.current.children.length);
    }, []);

    return(
            <div className = "nav-main">
                <ul className = "nav-items-wrapper" ref={availableLinks}>
                    {navs.map((e) => {
                        return(
                            <li key = {e.Name} className = "nav-item-list">
                                <Link key = {e.Name} to = {e.route} className  = "nav-item-links" onClick={removeExpand}> 
                                    {e.Name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>     
            </div>
    );
}

//authenticated user nav
function UserNav({isAdmin, removeExpand, window, expandSupport, isSupportExpanded, authUser, handleLogout}){
    let availableLinks = useRef(null);
    let buttonSupport = useRef(null);

    function logout(){
        removeExpand();
        authUser(null);
        handleLogout();
    }

    useEffect(() => {
        availableLinks.current.style.setProperty("--nav-links", availableLinks.current.children.length);
    }, []);

    useEffect(()=>{
        if (window  > 900){
            buttonSupport.current.setAttribute("data-nav-item-type", "popup");
        }else{
            buttonSupport.current.setAttribute("data-nav-item-type", "cover");
        }
    },[window]);

    return(
        <>
            <div className="nav-main">
                <ul className="nav-items-wrapper" ref = {availableLinks}>
                    <li className="nav-item-list">
                        <Link to="/stores" className="nav-item-links " onClick={removeExpand}>Stores</Link>
                    </li>
                    <li className="nav-item-list">
                        <button style = {{background : "transparent"}}
                            ref = {buttonSupport}
                            onClick = {expandSupport}
                            className="nav-item-links border border-0 p-0" 
                            data-popup-target="#settings">
                                More                          
                        </button>
                    </li>
                    <li className="nav-item-list">
                        <Link to="/profile" className="nav-item-links " onClick={removeExpand}>Account</Link>
                    </li>
                    <li className="nav-item-list">
                        <Link to="/" className="nav-item-links " onClick={logout}>Logout</Link>
                    </li>
                </ul>
            </div>
            <div className="nav-item-popovers pb-5" id="settings" data-popover-toggled = "false" ref = {isSupportExpanded}>
                    <div className="ms-3 d-flex justify-content-start">
                        <button type="button" 
                            className="popover-dismiss" 
                            data-popover-dismiss="#settings" onClick={expandSupport}>
                            <span className="bi bi-arrow-left"></span>
                        </button>
                    </div>
                    <span className="nav-popover-item-list">
                        <Link to="/about" className="popover-item" onClick={removeExpand}>About</Link>
                    </span>
                    <span className="nav-popover-item-list">
                        <Link to="/contact" className="popover-item" onClick={removeExpand}>Contact</Link>
                    </span>
                    <span className="nav-popover-item-list">
                        <Link to="/terms-and-condition" className="popover-item" onClick={removeExpand}>Terms and Conditions</Link>
                    </span>
                    <span className="nav-popover-item-list">
                    <AdminNav isAdmin={ isAdmin } removeExpand = {removeExpand}/>
                    </span>
            </div>
        </>
    );
}

//nav selector
function NavSelector({isAuth, isAdmin, removeExpand, authUser, window, expandSupport, isSupportExpanded, handleLogout}){
    return !isAuth ? <AnonNav removeExpand = {removeExpand}/> 
        : <UserNav isAdmin = {isAdmin} removeExpand = {removeExpand} window = {window} 
            expandSupport = {expandSupport} isSupportExpanded = {isSupportExpanded} authUser = {authUser} handleLogout = {handleLogout}/>;
}

//navbar toggler (whole wh)
function toggleNavBar(toggler){

    if (window.innerWidth > 900){
        toggler.checked = false;
        body.classList.remove("overflow-hidden");
        return;
    }

    if (toggler.checked === true){
        body.classList.add("overflow-hidden");
    }else{
        body.classList.remove("overflow-hidden");
    }
}

//main header
export default function Header({isAuth, isAdmin, authUser, handleLogout}){

    let toggler = useRef(null);
    let popOver = useRef(null);
    let navWrapper = useRef(null);
    const [windowSize, setWindowSize] = useState(window.innerWidth);


    window.onscroll = ()=>{
        if (window.scrollY === 0){
            navWrapper.current.classList.remove("translucent-bg");
        }else{
            navWrapper.current.classList.add("translucent-bg");
        }
    }

    function removeExpand(){
        if (popOver.current != null) popOver.current.setAttribute("data-popover-toggled", false);
        if (window.innerWidth <= 900){
            toggler.current.checked = false;
            navWrapper.current.classList.remove("opaque-bg");
            body.classList.remove("overflow-hidden");
        }
    }   

    function popOverExpand(e){
        const target = popOver.current;
        if (target.getAttribute("data-popover-toggled") === "false"){
            target.setAttribute("data-popover-toggled", true);
            if (e.target.getAttribute("data-nav-item-type") === "cover"){
                body.classList.add("overflow-hidden");
            }
        }else{
            target.setAttribute("data-popover-toggled", false);
        }
    }
    

    window.onresize = function(){
        setWindowSize(window.innerWidth);
        if (window.innerWidth > 900){
                toggler.current.checked = false;
                navWrapper.current.classList.remove("opaque-bg");
                if (popOver.current != null) popOver.current.setAttribute("data-popover-toggled", false);
                body.classList.remove("overflow-hidden");
        }
    
    };

    return (
        <header className = "fixed-top" style = {{width: "100%", marginBottom: "10rem"}}  id = "navigation-header">
            <nav className = "nav-wrapper" ref = {navWrapper}>
                <div className = "nav-brand-wrapper h-100">
                    <Link to = "/" className ="nav-brand-clickable  text-uppercase" onClick={removeExpand}>
                        <img src = { logo } alt= "abc cars logo" style = {{width: "5rem", height: "5rem" , display : "inline-block"}}/>
                    </Link>
                </div>
                <input type = "checkbox" id = "nav-button-toggle" ref = {toggler} 
                    onChange={(e) => {
                        toggleNavBar(e.target);
                        e.target.checked ? navWrapper.current.classList.add("opaque-bg") 
                                    : navWrapper.current.classList.remove("opaque-bg");
                    }
                }/>
                <label htmlFor = "nav-button-toggle" className = "nav-toggler">
                    <span className = "nav-burger-menu"></span>
                </label>
               <NavSelector isAdmin={isAdmin} isAuth = {isAuth} removeExpand = {removeExpand} authUser = {authUser}
                    window = {windowSize} expandSupport = {popOverExpand} isSupportExpanded={popOver} handleLogout = {handleLogout}/>
            </nav>
        </header>
    );
}