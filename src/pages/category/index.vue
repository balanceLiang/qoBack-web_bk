<template>
<div class="pa-8 fill-height" style="">
    
        <div class="d-flex flex-column pa-4 rounded-lg border-thin fill-height overflow-y-auto position-relative">
            <Loading :loading="loading"/>
            <v-data-table-virtual :loading="loading" :headers="headers" :items="items" loading-text="載入中..." 
                hide-default-footer fixed-header mobile-breakpoint="sm" :mobile="isMobile" class="" style="height: calc(100vh - 164px);">

                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>
                            <v-icon color="medium-emphasis" icon="mdi-account-group-outline" size="x-small" start></v-icon>
                            分類管理
                        </v-toolbar-title>

                        <v-btn class="me-2" prepend-icon="mdi-plus" rounded="lg" text="新增分類" border
                            @click="add"></v-btn>
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

<script setup>
import { useDisplay } from 'vuetify'
import { useCate } from '@/Api/Cate'

const headers = ref([
    { title: '', align: 'start', key: '_id' },
    { title: '編號', align: 'start', key: 'cateId' },
    { title: '名稱', align: 'start', key: 'cateName' },
    //{ title: '', align: 'start', key: 'sorting' },
    { title: '', key: 'actions', align: 'center', sortable: false },
]);

const router = useRouter();

var loading = ref(false)

const items = ref([

])

onMounted(() => {
    getList();
})

var page = ref(1);
var pageSize = ref(20);
var totalPage = ref(1);

var isMobile = computed(() => {
    const display = useDisplay();
    return display.smAndDown.value
})

var pageVisible = computed(() => {
    return isMobile ? 3 : 7;
})

watch(page, (newPage) => {
    console.log('newPage', newPage);
    getList();
})

const getList = () => {
    loading.value = true;

    useCate.list(page.value, pageSize.value).then(res => {
        console.log(res);
        loading.value = false;
        items.value = res.data.data;
        totalPage.value = res.data.pages;
    }).catch(error => {

    })
}

const add = () => {
    router.push( { path: '/category/add' })
}

const edit = (_id) => {
    router.push({ path: '/category/'+_id })
}
</script>