<template>

    <div class="d-flex  w-100 fill-height pa-4 flex-wrap overflow-auto">
        <div v-for="(day, idx) in workingTimes" :key="idx" class="d-flex flex-column rounded-lg border-thin v-col-12 v-col-md-3 h-auto">
            <div class="mb-1 bg-primary">
                星期{{ day.title }}
            </div>
            <v-divider></v-divider>
            <div class="pa-2">
                <div class="d-flex my-3 justify-center">
                    <div><v-text-field density="compact" variant="outlined" hide-details label="開始時間" v-model="day.beginTime"
                            type="time"></v-text-field></div>
                </div>
                <div class="d-flex my-3 justify-center">
                    <div><v-text-field density="compact" variant="outlined" hide-details label="結束時間" v-model="day.endTime"
                            type="time"></v-text-field></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            workingTimes: [
                { no: 0, title: '日', beginTime: null, endTime: null, closed: false },
                { no: 1, title: '一', beginTime: null, endTime: null, closed: false },
                { no: 2, title: '二', beginTime: null, endTime: null, closed: false },
                { no: 3, title: '三', beginTime: null, endTime: null, closed: false },
                { no: 4, title: '四', beginTime: null, endTime: null, closed: false },
                { no: 5, title: '五', beginTime: null, endTime: null, closed: false },
                { no: 6, title: '六', beginTime: null, endTime: null, closed: false },
            ],
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {

    }
}
</script>