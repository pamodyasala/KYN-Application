import { Component } from "react";
import Layout from "../Components/PageTemplate";

class ContactUs extends Component{
    render(){
        return(
            <Layout>
                 <div id = "contact-us">
                    <div className ="container py-5">
                        <h1 className = "text-center fw-bold display-5" style={{color: "maroon"}}>
                            Let's Talk
                        </h1>
                        <p className =  "text-center px-5" style = {{fontSize : "1.4rem"}}>
                            Your voice matters to us. In order for us to improve our service,
                            your feedbacks, suggestions, and complaints are appreciated. You can
                            send them through the fields below. We thank you for your never-ending support to the
                            platform. 
                        </p>
                        <div className ="mt-5 px-2">
                            <form className = "row gy-3 px-3 pt-3 pb-5 border rounded-3 shadow-lg" style={{backgroundColor : "baige"}}>
                                <div className ="col-md-4 col-12 form-floating">
                                    <input className ="form-control bg-muted" id = "name"/>
                                    <label htmlFor  = "name" className ="ms-2">
                                        Name
                                    </label>
                                </div>
                                <div className ="col-md-4 col-12 form-floating">
                                    <input className ="form-control bg-muted" id = "email-address"/>
                                    <label htmlFor  = "email-address" className ="ms-2">
                                        Email Address
                                    </label>
                                </div>
                                <div className ="col-md-4 col-12 form-floating">
                                    <input className ="form-control bg-muted" id = "subject"/>
                                    <label htmlFor  = "subject" className ="ms-2">
                                        Subject
                                    </label>
                                </div>
                                 <div className ="col-12 form-floating">
                                    <textarea className ="form-control bg-muted" id = "content" style = {{height : "20rem"}}/>
                                    <label htmlFor  = "content" className ="ms-2">
                                        Content
                                    </label>
                                </div>
                                <div className="col-12 d-flex justify-content-center">
                                    <button className="btn btn-outline-kyn w-100" style={{fontSize : "1.22rem"}}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className ="w-100 mt-5">
                            <div className = "d-flex flex-column h5 fw-normal">
                                <div className ="d-inline">
                                    <span className ="bi bi-geo-alt-fill" style={{color : "maroon"}}>
                                        <span className ="ms-1" style={{color : "maroon"}}>
                                            Mileguas, Makati, Philippines
                                        </span>
                                    </span>
                                </div>
                                <div className ="d-inline">
                                    <span className ="bi bi-envelope" style={{color : "maroon"}}>
                                        <span className ="ms-1" style={{color : "maroon"}}>
                                            kyn@gmail.com
                                        </span>
                                    </span>
                                </div>
                                <div className ="d-inline">
                                    <span className ="bi bi-telephone-fill" style={{color : "maroon"}}>
                                        <span className ="ms-1" style={{color : "maroon"}}>
                                            +63-929-555-6296
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}




export default ContactUs;