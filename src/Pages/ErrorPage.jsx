import coverImg from '../Static/img/community-building-977x720.png';

function ErrorPage(){
    return(
        <div style={{overflow: "hidden", position : "relative"}}>
            <img src = {coverImg} alt ="cover-img" style={{width:"1900px", opacity : 0.25, height: "110vh"}}/>
            <div className='position-absolute w-100 h-100 
                start-50 top-50 translate-middle d-flex flex-column justify-content-center align-items-center' 
                style={{backgroundColor : "rgba(254, 242, 242, 0.5)"}}>
                    <span className='display-6 text-uppercase text-center fw-bold mb-5' 
                        style={{color: "#D1A080"}}>
                        Page Does not exist or is broken
                    </span>
            </div>
        </div>
    );
}

export default ErrorPage;