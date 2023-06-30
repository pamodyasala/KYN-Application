import { Component } from 'react';
import coverImg from '../Static/img/kynlog.jpg'
import coverImgLogged from '../Static/img/grocery-shopping-list.png';
import { Link } from 'react-router-dom';
import cover from '../Static/img/img img.jpg'
function HomePage(){
    return(
        <div style={{overflow: "hidden", position : "relative"}}>
            <img src = {cover} alt ="cover-img" style={{width:"1900px", opacity : 0.25, height: "110vh"}}/>
            <div className='position-absolute w-100 h-100 
                start-50 top-50 translate-middle d-flex flex-column justify-content-center align-items-center' 
                style={{backgroundColor : "rgba(254, 242, 242, 0.5)"}}>
                    <span className='display-6 text-uppercase text-center fw-bold mb-5' 
                        style={{color: "maroon"}}>
                        Welcome to Know Your Neighborhood
                    </span >
                    <span className='display-6 text-center margin-lreft' >
                    <p>KYN is a chain of supermarkets in Sri Lanka owned by john Holdings. 
                        It is one of the three largest retail operators on the island, alongside Cargills Food City and Arpico Super Center.Get the best value for money by shopping online with Keells where freshness is guaranteed. Shop on Keells online 
                        and get your purchases delivered to your home.</p>
                        </span>
                    <Link to = "/registration" className='btn btn-outline-kyn border rounded-3 py-3 px-5'>
                        Get Started
                    </Link>
            </div>
        </div>
    );
}

class Home extends Component{

    render(){
        if (this.props.isAuth === false){
            return(
                <HomePage/>
            );
        }else{
            return(
                <div style={{overflow: "hidden", position : "relative"}}>
                    <img src = {coverImg} alt ="cover-img" style={{width:"1900px", opacity : 0.5, height: "110vh"}}/>
                    <div className='position-absolute w-100 h-100 
                        start-50 top-50 translate-middle d-flex flex-column justify-content-center align-items-center' 
                        style={{backgroundColor : "rgba(255, 255, 255, 0.8)"}}>
                            <span className='display-6 text-uppercase text-center fw-bold mb-5' 
                                style={{color: "maroon"}}>
                                Welcome to Know Your Neighborhood, {this.props.authUser.firstName}
                            </span>
                            <Link 
                                className='btn btn-outline-kyn border rounded-3 py-3 px-5'
                                style={{fontSize: "1.33rem"}}
                                to="/stores"
                            >
                                View Stores
                            </Link>
                    </div>
                </div>
            );
        }
    }
}

export default Home;