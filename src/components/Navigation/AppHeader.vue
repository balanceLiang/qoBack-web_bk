<template>
    <div>
        <v-app-bar app>
            <div class="d-flex justify-space-between align-center pa-2 w-100" style="height: 60px;">
                <div>
                    <img :src="logo" style="height: 100%;">
                </div>
                <div class="d-flex align-center">
                    <div class="mx-1">
                        <v-btn  @click="drawer = !drawer" color="primary" variant="plain" icon="mdi-menu" v-if="isMobile">
                            
                        </v-btn>
                    </div>
                    <div class="mx-1">
                        {{  userName  }}
                    </div>
                    <div>
                        <v-btn color="primary" variant="flat" @click="logout">
                            登出
                        </v-btn>
                    </div>
                    
                </div>
            </div>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" :temporary="isMobile" :permanent="!isMobile">
            <Menu />
        </v-navigation-drawer>
    </div>
</template>

<script>

import logoUrl from '@/assets/logo.svg'
import { useAppStore } from '@/stores/app'
import { useTheme } from "vuetify";

export default {
    setup() {
        
    },
    data() {
        return {
            logo: logoUrl,
            drawer: true,
            appStore: null,
            userName: null,
        }
    },
    computed: {
        isMobile() {
            console.log('isMobile', this.$vuetify.display.smAndDown);
            return this.$vuetify.display.smAndDown;
        }
    },
    mounted() {
        if (this.isMobile) {
            this.drawer = false;
        }
        this.appStore = useAppStore();
        this.userName = this.appStore.userName;
        console.log(this.appStore.isLogined, this.appStore.token);
        
    },
    methods: {
        logout() {
            this.appStore.setToken(null);
            this.$router.push({ path: '/login' });
        },
        
    }
}
</script>