<template>
    <div class="wrapper">
        <ul>
            <div
                    @click.self="toggle"
            >
                {{name}}
            </div>
            <li
                    :key="key"
                    v-for="(child, key) in children"
                    v-show="isOpen"
            >
                <TreeItem
                        :item="child"
                        :sid="sid"
                ></TreeItem>
            </li>

        </ul>
    </div>
</template>

<script>
    import TreeItem from "./TreeItem";
    import {apiList} from "../api";

    export default {
        name: "FileStation",
        props: ['sid'],
        components: {
            TreeItem
        },
        data() {
            return {
                isOpen: true,
                name: '',
                children: [],
            }
        },
        methods: {
            toggle() {
                this.isOpen = !this.isOpen;
            },
        },
        mounted() {
            this.name = '/Cloud Platform'

            apiList({
                params: {
                    sid: this.sid,
                    path: this.name,
                }
            })
                .then(res => {
                    if ('status' in res.data) {
                        console.log('in')
                        if (res.data.status === 3) {
                            localStorage.removeItem('sid')
                        }
                    } else {
                        setChildren.call(this);
                    }

                    function setChildren() {
                        this.children = res.data.datas.map((data) => {
                            return {
                                name: data.filename,
                                path: this.name,
                                isFolder: data.isfolder,
                                children: []
                            }
                        })
                    }

                })
        }
    }
</script>

<style scoped>
    .wrapper {
        display: grid;
        place-items: center;
    }
</style>