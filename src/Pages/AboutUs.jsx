import { Component } from "react";
import Layout from "../Components/PageTemplate";

class About extends Component{

    render(){
        return(
            <Layout>
              <div className="row gy-3 w-100">
                <div className="col-12">
                    <h1 className="text-center text-uppercase display-5" style={{color :"maroon"}}>
                        About us
                    </h1>
                    <div className="card bg-transparent border-0 px-5 mx-5">
                        <div className="card-body">
                            <p className="text-center px-5 mx-5" style={{fontSize : "1rem"}}>
                                Know your neighborhood is a website which presents all available stores near your location!
                                This platform was designed for both the store owner and ordinary residents where stores can
                                widen their reach and they will be familiarized with available stores within their reach respectively. 
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <h1 className="text-center text-uppercase display-5" style={{color :"maroon"}}>
                        Mission
                    </h1>
                    <div className="card bg-transparent border-0 px-5 mx-5">
                        <div className="card-body">
                            <p className="text-center px-5 mx-5" style={{fontSize : "1rem"}}>
                                It is our utmost pleasure to serve the community by giving them information
                                and an opportunity to grow. By providing residents, old or new, an up-to-date
                                list of available stores that they might be interested with. We also serve 
                                store owners opportunity to grow their business by advertising them to potential
                                customers.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <h1 className="text-center text-uppercase display-5" style={{color :"maroon"}}>
                        Vision
                    </h1>
                    <div className="card bg-transparent border-0 px-5 mx-5">
                        <div className="card-body">
                            <p className="text-center px-5 mx-5" style={{fontSize : "1rem"}}>
                                To be the leading online platform that opens opportunities for stores to grow
                                and introduce foreigners and residents to a new start. Store listing as the 
                                core of the platform represents not only a business, but also the cultural background
                                of not only the area, but the country as a whole. We aim to transform the perception
                                of people about a store which not only provides the needs, but also can be a symbol
                                of tourism.
                            </p>
                        </div>
                    </div>
                </div>
              </div>
            </Layout>
        )
    }
}

export default About;