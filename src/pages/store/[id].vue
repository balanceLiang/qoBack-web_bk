<template>
    <div class="d-flex flex-column pa-8">
        <v-progress-linear indeterminate color="cyan" :class="{ 'd-none': !loading }"></v-progress-linear>
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

        <!-- 門店維護 -->
        <div class="d-flex flex-column mt-2">
            <v-tabs v-model="tab" hide-slider :mobile="isMobile" mobile-breakpoint="sm" color="primary">

                <v-tab v-for="(item, idx) in tabs" :key="idx" class="tab-background" color="primary">

                    {{ item }}

                </v-tab>

            </v-tabs>

            <v-tabs-window v-model="tab" class="tab-content" style="height: 50vh;">
                <v-tabs-window-item v-for="(item, idx2) in tabs" :value="idx2" class="fill-height">
                    <div class="d-flex justify-center align-center fill-height">
                        <div v-if="idx2 == 0" class="w-100 fill-height">
                            <WorkingTime />
                        </div>
                        <div v-else>
                            {{ contents[tab] }}
                        </div>
                    </div>
                </v-tabs-window-item>
            </v-tabs-window>

        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            fields: [
                { title: '編號', data: "_id", type: "text", value: null, readOnly: true, visible: true },
                { title: '門市編號', data: "storeId", type: "text", value: null, readOnly: false, visible: true },
                { title: '名稱', data: "storeName", type: "text", value: null, readOnly: false, visible: true },
                { title: '啟用', data: "enabled", type: "checkbox", value: null, readOnly: false, visible: true },
            ],
            loading: true,
            tabs: [
                "營業時間", "菜單管理", "取餐預計時間",
            ],
            contents: [
                "營業時間", "菜單管理", "取餐預計時間",
            ],
            tab: null,
        }
    },
    computed: {
        isMobile() {
            console.log('isMobile', this.$vuetify.display.smAndDown);
            return this.$vuetify.display.smAndDown;
        }
    },
    mounted() {
        console.log(this.$route.params);
        const id = this.$route.params.id;
        console.log('id', id);
        if (!!id && id !== 'add') {
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

<style lang="css" scoped>
.tab-background {
    border: 1px solid;
    border-top-left-radius: 8px !important;
    border-top-right-radius: 8px !important;

}

.v-tab--selected {
    background-color: aqua;
}

.tab-content {
    border: 1px solid;
    border-bottom-left-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
}
</style>