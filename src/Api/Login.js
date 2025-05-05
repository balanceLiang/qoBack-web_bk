import axios from 'axios'
import { useHost } from './Host'

export const useLogin = {

  getCaptcha:  () => {
    const url = useHost.getDomain() + 'api/captcha';

    return axios.get(url)
  },

  doLogin:  postData => {
    const url = useHost.getDomain() + 'api/login';

    return axios.post(url, postData);

  },

  forget: postData =>{
    const url = useHost.getDomain() + 'api/login/forget';

    return axios.post(url,postData);

  },

}
