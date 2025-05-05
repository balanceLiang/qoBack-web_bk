
import axios from 'axios'
import { useHost } from './Host'

export const useCate = {
    
    list: (page=null, size=null) => {
        let postData = {}
        if(!!page && !!size) {
            postData = { page: page, size: size}
        }
        return axios.post( useHost.getDomain() + 'api/category/list', postData, { headers: {Token: useHost.getToken() }})
    },

    get: (id) => {
        const url = useHost.getDomain() + 'api/category/edit/'+id;
        return axios.get (url, { headers: {Token: useHost.getToken() }})
    }
}