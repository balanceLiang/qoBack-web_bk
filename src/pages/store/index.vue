<template>
    <div class="pa-8 fill-height" style="">
        
        <div class="d-flex flex-column pa-4 rounded-lg border-thin fill-height overflow-y-auto">
            <v-data-table-virtual :loading="loading" :headers="headers" :items="items" loading-text="載入中..."
                hide-default-footer fixed-header mobile-breakpoint="sm" :mobile="isMobile" style="height: calc(100vh - 162px); overflow: auto;">

                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>
                            <v-icon color="medium-emphasis" icon="mdi-account-group-outline" size="x-small" start></v-icon>
                            門市管理
                        </v-toolbar-title>

                        <!-- <v-btn class="me-2" prepend-icon="mdi-plus" rounded="lg" text="新增門市" border
                            @click="add"></v-btn> -->
                    </v-toolbar>
                </template>

                <template v-slot:item.enabled="{ item }">
                    <v-checkbox-btn v-model="item.enabled"></v-checkbox-btn>
                </template>

                <template v-slot:item.actions="{ item }">
                    <div class="d-flex ga-2">
                        <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item._id)"></v-icon>
                    </div>
                </template>

                <template v-slot:bottom>
                    <div class="text-center pt-2">
                        <v-pagination v-model="page" :length="totalPage" :total-visible="pageVisible"
                            size="small"></v-pagination>
                    </div>
                </template>
            </v-data-table-virtual>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                { title: '編號', align: 'start', key: '_id' },
                { title: '門市編號(ERP)', align: 'start', key: 'storeId' },
                { title: '門市名稱', align: 'start', key: 'storeName' },
                { title: '啟用', align: 'start', key: 'enabled' },
                { title: '', key: 'actions', align: 'center', sortable: false },
            ],
            members: [
                { _id: '1', storeId: '123', storeName: 'Abc', enabled: true },
                { _id: '2', storeId: '123', storeName: 'Abc', enabled: true },
                { _id: '3', storeId: '123', storeName: 'Abc', enabled: true },
                { _id: '4', storeId: '123', storeName: 'Abc', enabled: true },
                { _id: '5', storeId: '123', storeName: 'Abc', enabled: true },
                { _id: '6', storeId: '123', storeName: 'Abc', enabled: true },
                { _id: '6', storeId: '123', storeName: 'Abc', enabled: true },
                { _id: '6', storeId: '123', storeName: 'Abc', enabled: true },
                { _id: '6', storeId: '123', storeName: 'Abc', enabled: true },
                { _id: '6', storeId: '123', storeName: 'Abc', enabled: true },
                { _id: '6', storeId: '123', storeName: 'Abc', enabled: true },
                { _id: '6', storeId: '123', storeName: 'Abc', enabled: true },
                { _id: '6', storeId: '123', storeName: 'Abc', enabled: true },
                { _id: '6', storeId: '123', storeName: 'Abc', enabled: true },
                
            ],
            items: [],
            loading: true,
            page: 1,
            totalPage: 20,
            pageVisible: 7,
        }
    },
    mounted() {
        this.pageVisible = this.$vuetify.display.smAndDown ? 3 : 7;
        setTimeout(() => {
            this.loading = false;
            this.items = this.members;
        }, 2000);
    },
    computed: {
        isMobile() {
            console.log('isMobile', this.$vuetify.display.smAndDown);
            return this.$vuetify.display.smAndDown;
        }
    },
    methods: {
        edit(id) {
            this.$router.push({ path: '/store/' + id })
        },
        add() {
            this.$router.push({ path: '/store/add' })
        },
    }
}
</script>