import { Navigate, Route, Routes } from "react-router-dom";
//import OAuth2RedirectHandler from "../Components/OAuth2/OAuthHandler";
import About from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import Home from "../Pages/HomePage";
import TermsAndCondition from "../Pages/TermsAndCondition";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import { StoreListing } from "../Pages/Stores";
import AdminDashboard, { PostStore, StorePosted, StoreUpdate } from "../Pages/AdminDashboard";
import OAuth2RedirectHandler from "../Components/OAuth/OAuthHandler";
import ErrorPage from "../Pages/ErrorPage";


function AnonRoute({isAuth, Component}){
    return !isAuth ? Component : <Navigate to = "/"/>;
}

function AuthRoute({isAuth, Component}){
    return !isAuth ? <Navigate to = "/"/> : Component;
}

function AdminRoute({isAuth, isAdmin, Component}){
    return !isAdmin || !isAuth ? <Navigate to = "/"/> : Component;
}


export default function Routing({isAdmin, isAuth, authUser, setAuthUser}){
   
    //home no longer needs to be configured with routing conditions as it supports all.

    //only admin can add, update, and delete stores!!!!

    return (
        <>
            <Routes>
                { /*this is for global pages*/ }
                <Route index element = {<Home isAuth = {isAuth} authUser={authUser}/>}/>
                <Route path = "home" element = {<Home isAuth = {isAuth}/>}/>
                <Route path = "about" element = {<About/>}/>
                <Route path = "contact" element = {<ContactUs/>}/>
                <Route path = "terms-and-condition" element = {<TermsAndCondition/>}/>
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler/>}/>
                <Route path ="*" element={<ErrorPage/>}/> 

                {/*this if for anonymous pages*/}
                <Route path = "registration" element = {
                    <AnonRoute 
                        isAuth={isAuth} 
                        Component = {<Register/>}
                    />
                }/>
                <Route path = "login" element = {
                    <AnonRoute
                        isAuth={isAuth}
                        Component = {<Login/>}
                    />
                }/>

                {/*this is for authenticated pages*/}
                <Route path = "profile" element = {
                    <AuthRoute
                        isAuth={isAuth}
                        Component={<Profile authUser={authUser} setAuthUser={setAuthUser}/>}
                    />
                }/>

                
                <Route path = "stores" element = {
                    <AuthRoute
                        isAuth={isAuth}
                        Component={<StoreListing/>}
                    />
                }/>
                {/*
                
                //no longer need this -- note: only available stores or might decide to add later!
                <Route path = "message" element = {
                    <AuthRoute
                        isAuth={isAuth}
                        Component={<MessagePage user = {user}/>}
                    />
                }/>

                //admin should be the one to open this, else return to home page
                <Route path = "post-store" element = {
                    <AuthRoute
                        isAuth={isAuth}
                        Component={<StorePost user = {user}/>}
                    />
                }/>

                //no longer need this -- note: only available stores or might decide to add later!
                <Route path = "store-details/:storeid" element ={
                    <AuthRoute
                        isAuth={isAuth}
                        Component={<StorePage/>}
                    />
                }/>

                */}

                {/*this if for admin pages*/}


                <Route path = "admin" element = {
                    <AdminRoute
                        isAuth={isAuth} 
                        isAdmin={isAdmin}
                        Component={<AdminDashboard/>}
                    />
                }>
                    <Route index element = {<StorePosted/>}/>
                    <Route path = "add-store" element = {<PostStore/>}/>
                    <Route path = "edit-store/:id" element = {<StoreUpdate/>}/>
                </Route>
                
            </Routes>
        </>
    );
}
