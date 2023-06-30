import axios from "axios";
import { ACCESS_TOKEN } from "./Constants";

class StoreUtils{
    APIURL =  "http://localhost:8080/kynapi";

    editStore(id, payload){
        return axios.patch(this.APIURL + "/admin/edit-store/" + id, 
            payload,
            {headers : {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                }
            }
        );
    }

    postStore(payload){
        return axios.post(this.APIURL + "/admin/add-store", 
            payload,
            {headers : {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                }
            }
        );
    }

    deleteStore(id){

        return axios.delete(this.APIURL + "/admin/delete-store/" + id, 
            {headers : {
            'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                }
            }
        );
    }

    findStore(id){
        return axios.get(this.APIURL + "/admin/get-store/" + id,
            {headers : {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                }
            }
        );
    }
}

export default new StoreUtils();