import { useAppStore } from '@/stores/app'

export const useHost = {

  getDomain: () => {
    return 'http://20.205.139.102/qoBack/'
    //return 'http://localhost/qoBack/'
  },

  getToken: () => {
    const appStore = useAppStore();
    return appStore.token;
  },
}
