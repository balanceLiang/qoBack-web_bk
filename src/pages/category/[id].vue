<template>
    
        <div class="d-flex flex-column pa-8  position-relative">
            <Loading :loading="loading" />
            <!-- <v-progress-linear indeterminate color="cyan" :class="{ 'd-none': !loading }"></v-progress-linear> -->
            <div v-for="(field, index) in fields" :key="index" class="w-100">

                <div class="mr-2" style="font-size: 20px;"> {{ field.title }}</div>

                <v-text-field density="compact" variant="outlined" hide-details v-model="field.value" hide-spin-buttons
                    :type="field.type" :readonly="field.readOnly"></v-text-field>
            </div>


       
        <div class="d-flex justify-end mt-3">
            <v-btn color="primary" flat>儲存</v-btn>
        </div>
    </div>

</template>

<script setup>
import { useCate } from '@/Api/Cate'

const route = useRoute()

const fields = ref([
    { title: '編號', data: '_id', value: null, type: 'text', readonly: true },
    { title: '代號', data: 'cateId', value: null, type: 'text', readonly: false },
    { title: '名稱', data: 'cateName', value: null, type: 'text', readonly: false },
    { title: '排序', data: 'sorting', value: null, type: 'number', readonly: false },
])



var loading = ref(false); 

onMounted(() => {
    const id = route.params.id;
    if(id !== 'add') {
        getCate(id)
    }
})

const getCate = id => {
    loading.value = true;
    useCate.get(id).then(res => {
        console.log('cate', res);
        
        const data = res.data.data;
        fields.value.forEach(field => {
            
            field.value = data[field.data];
        })
        loading.value = false;
    }).catch(error => {
        loading.value = false;
    })
}
</script>