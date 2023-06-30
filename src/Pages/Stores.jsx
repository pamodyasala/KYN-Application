import { Component } from "react";
import Layout from "../Components/PageTemplate";
import UserUtils from '../APICalls/UserServices';

export class StoreListing extends Component{
    constructor(props){
        super(props);
        this.state = {
            search: '',
            stores : []
        }

        this.searchType = this.searchType.bind(this);

    }

    componentDidMount(){
        UserUtils.storeListing(null)
            .then((resp)=>{
                this.setState({stores : resp});
        });
    }


    submitHandler(e){
        e.preventDefault();
    }

    searchType(e){
         UserUtils.storeListing(e.target.value)
            .then((resp)=>{
                this.setState({stores : resp});
            });
    }

    render(){
        
        return(
            <Layout>
                 <div className = "container">
                        <div className ="my-5">
                            <div className = "p-3 w-100 mb-2 border rounded-3" style = {{minHeight: "10rem", backgroundColor : "rgba(255, 255, 255, 0.8)"}}>
                                <form className = "row gy-2 gx-2" onSubmit={this.submitHandler}>
                                    <h1 className = "fw-bolder" style={{color : "maroon"}}>
                                        Search for Store
                                    </h1>
                                    <div className="input-group">
                                        <input className="form-control" id = "search-bar" onChange={this.searchType}/>
                                        <button type="button" className="btn btn-kyn">
                                            <span className="bi bi-search fw-light"> Search</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className ="card mb-3 w-100" style={{ backgroundColor : "rgba(255, 255, 255, 0.8)"}}>
                                <div className ="card-header bg-transparent border border-0">
                                    <span className ="card-title text-uppercase h1 fw-bolder" style={{color : "maroon"}}>
                                        Available Stores
                                    </span>
                                </div>
                                <div className ="card-body">
                                    <div className ="row gy-3 gx-3">
                                        {
                                            this.state.stores.map((e)=>{
                                                return(
                                                    <div key = {e.storeId} className ="col-md-6 col-12">
                                                        <div className ="card overflow-hidden p-2">
                                                            <div className = "card-body">
                                                                <div className ="row">
                                                                    <div className ="col-12">
                                                                        <span className ="fw-bold d-block text-center">
                                                                            {e.storeName}
                                                                        </span>
                                                                    </div>
                                                                    <div className = "col-12">
                                                                        <span className ="fw-bold me-2">Owner: </span>
                                                                        {e.storeOwner}
                                                                    </div>
                                                                    <div className ="col-12">
                                                                        <span className ="fw-bold me-2">Contact: </span> 
                                                                        {e.contactNo}
                                                                    </div>
                                                                    <div className ="col-12">
                                                                        <span className ="fw-bold me-2">Email: </span>
                                                                        {e.storeEmail}
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <span className ="fw-bold me-2">Locations: </span>
                                                                        <ul>
                                                                            {
                                                                                e.locations.split(",").map((e)=>{
                                                                                    return(
                                                                                        <li key ={e}>{e}</li>
                                                                                    );
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    </div>                                     
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </Layout>
        );
    }
}
