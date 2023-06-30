import { Link } from "react-router-dom";
import '../Static/css/footersocials.css';
export default function Footer(){

    return (
        <footer className = "kyn-footer p-5">
            <div className = "row gx-2 gy-4">
                <div className ="col-12">
                    <div className = "card bg-transparent border-0 w-100">
                        <div className = "card-header bg-transparent border-0 text-center">
                            <span className ="fw-bold display-3 text-center" style={{color: "#d1a080"}}>
                                Know-Your-Neighborhood
                            </span>
                        </div>
                        <div className ="card-body">
                            <div className="d-flex flex-row justify-content-center">
                                    <Link className="socials" style = {{fontSize : "1.6rem"}} to= "#" target="blank">
                                        <span className="bi bi-facebook m-1"></span>
                                        <span className="ms-2">
                                            Facebook
                                        </span>
                                    </Link>
                                    <Link className="socials" style = {{fontSize : "1.6rem"}}  to= "#" target="blank">
                                        <span className="bi bi-linkedin m-1"></span>
                                        <span className="ms-2">
                                            LinkedIn
                                        </span>
                                    </Link>
                                    <Link className="socials" style = {{fontSize : "1.6rem"}}  to= "#" target="blank">
                                        <span className="bi bi-twitter m-1"></span>
                                        <span className="ms-2">
                                            Twitter
                                        </span>
                                    </Link>
                                    <Link className="socials" style = {{fontSize : "1.6rem"}}   to= "#" target="blank">
                                        <span className="bi bi-instagram m-1"></span>
                                        <span className="ms-2">
                                            Instagram
                                        </span>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </footer>
    );
}