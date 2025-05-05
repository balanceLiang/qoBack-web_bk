<template>
    <div class="d-flex flex-column pa-8">
        <v-progress-linear indeterminate color="cyan" :class="{'d-none': !loading}"></v-progress-linear>
        <div v-for="(field, index) in fields" :key="index" class="w-100">
            <div v-if="field.visible" class="d-flex align-center ma-3 w-100">
                <div class="mr-2" style="font-size: 20px;"> {{ field.title }}</div>
                <div v-if="field.type !== 'checkbox'" class="flex-grow-1">
                    <v-text-field density="compact" variant="outlined" hide-details v-model="field.value"
                        :type="field.type" :readonly="field.readOnly"></v-text-field>
                </div>
                <div v-else>
                    <v-checkbox-btn v-model="field.value"></v-checkbox-btn>
                </div>
            </div>
        </div>
        <div class="d-flex justify-end">
            <v-btn color="primary" flat>儲存</v-btn>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            fields: [
                { title: '編號', data: "_id", type: "text", value: null, readOnly: true, visible: true },
                { title: '帳號', data: "userId", type: "text", value: null, readOnly: false, visible: true },
                { title: '密碼', data: "password", type: "password", value: null, readOnly: true, visible: true },
                { title: '名稱', data: "userName", type: "text", value: null, readOnly: false, visible: true },
                { title: '啟用', data: "enabled", type: "checkbox", value: null, readOnly: false, visible: true },
            ],
            loading: true,
        }
    },
    mounted() {
        console.log(this.$route.params);
        const id = this.$route.params.id;
        console.log('id', id);
        if(!!id && id !== 'add') {
            this.fields[0].value = id;
        } else {
            this.fields[0].visible = false;
        }

        setTimeout(() => {
            this.loading = false;
        }, 2000);
    },
    methods: {

    }
}
</script>