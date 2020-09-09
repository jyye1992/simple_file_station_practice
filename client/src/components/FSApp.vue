<template>
    <div class="app">
        <Login
                @sid="setSid"
                v-if="!sid"
        ></Login>
        <FileStation
                v-else
                :sid="sid"
        ></FileStation>
    </div>
</template>

<script>
    import Login from "./Login";
    import FileStation from "./FileStation";

    export default {
        name: "FSApp",
        data() {
            return {
                sid: false,
            }
        },
        components: {
            Login,
            FileStation,
        },
        methods: {
            setSid(value) {
                this.sid = value
            }
        },
        mounted() {
            this.sid = localStorage.getItem('sid')
        }
    }
</script>

<style scoped>
</style>