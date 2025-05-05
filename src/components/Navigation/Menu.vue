<template>
    <div class="d-flex flex-column fill-height" >
        <div class="flex-grow-1 d-flex flex-column pa-4" style="font-size: 18px;">
            <v-list :lines="false" nav>
                <v-list-item v-for="(item, index) in links" :key="index" :to="item.path" color="primary"
                    style="cursor: pointer;">
                    <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>

                    {{ item.title }}
                </v-list-item>

            </v-list>
        </div>
        <div class="d-flex ma-1">
            <div @click="changeTheme">
                <v-icon>{{ themeIcon }}</v-icon>
            </div>
        </div>
    </div>
</template>

<script>
import { useTheme } from "vuetify";

export default {
    setup() {
        const theme = useTheme();
        
        const themeIconIdx = theme.global.current.value.dark ? 0 : 1;

        return {
            theme,
            toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark',
            themeIconIdx,
        }
    },
    data() {
        return {
            links: [
                {
                    path: '/member',
                    icon: 'mdi-account-group-outline',
                    title: '帳號管理',
                },
                {
                    path: '/category',
                    icon: 'mdi-star-circle-outline',
                    title: '類別管理',
                },
                {
                    path: '',
                    icon: 'mdi-widgets-outline',
                    title: '產品管理',
                },
                {
                    path: '',
                    icon: 'mdi-account-group-outline',
                    title: '產品加值管理',
                },
                {
                    path: '',
                    icon: 'mdi-account-group-outline',
                    title: '菜單管理',
                },
                {
                    path: '/store',
                    icon: 'mdi-account-group-outline',
                    title: '門市管理',
                },
            ],
            themeIcons: ['mdi-weather-sunny', 'mdi-weather-night'],
            themeIcon: null,
        }
    },
    mounted() {
        this.themeIcon = this.themeIcons[this.themeIconIdx];
    },
    methods: {
        toPage(index) {
            if (index == 0) {
                this.$router.push({ path: '/login', params: {} })
            }
        },
        changeTheme() {
            this.toggleTheme();  
            this.themeIconIdx = 1 - this.themeIconIdx;
            this.themeIcon = this.themeIcons[this.themeIconIdx];
            
            localStorage.setItem('themeIdx', this.themeIconIdx);
        }
    }
}
</script>