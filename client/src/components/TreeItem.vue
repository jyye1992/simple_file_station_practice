<template>
    <ul>
        <div
                @click="toggle"
        ><p :class="{'font-bold': item.isFolder}"
        >{{item.name}}</p>
        </div>
        <li
                :key="key"
                v-for="(child, key) in item.children"
                v-show="isItemOpen"
        >
            <TreeItem :item="child" :sid="sid"></TreeItem>
        </li>
    </ul>
</template>

<script>
    import TreeItem from "./TreeItem";
    import {apiDownload, apiList} from "../api";

    export default {
        name: "TreeItem",
        props: ['item', 'sid'],
        data() {
            return {
                isItemOpen: false,
                children: [],
            }
        },
        components: {
            TreeItem,
        },
        methods: {
            toggle() {
                if (this.item.isFolder) {
                    this.folderHandler()
                } else {
                    this.downloadHandler()
                }
            },
            folderHandler() {
                this.isItemOpen = !this.isItemOpen;

                if (isChildrenEmpty.call(this)) {
                    getList.call(this);
                }

                function isChildrenEmpty() {
                    return this.item.children.length === 0;
                }

                function getList() {
                    console.log('get list')
                    let path = this.item.path + '/' + this.item.name

                    apiList({
                        params: {
                            sid: this.sid,
                            path: path
                        }
                    })
                        .then(res => {
                            setItemChildren.call(this);

                            function setItemChildren() {
                                this.item.children = res.data.datas.map((data) => {
                                    return {
                                        name: data.filename,
                                        path: path,
                                        isFolder: data.isfolder,
                                        children: []
                                    }
                                })
                            }
                        })
                }
            },
            download: function (data) {
                const blob = new Blob([data])
                let link = document.createElement('a');
                link.href = URL.createObjectURL(blob)
                link.download = this.item.name
                link.click()
                URL.revokeObjectURL(link.href)
            },
            downloadHandler() {
                apiDownload({
                    params: {
                        sid: this.sid,
                        path: this.item.path,
                        file: this.item.name,
                    }
                })
                    .then(res => {
                        this.download(res.data);
                    })
                    .catch(err => console.log(err))
            }
        },
    }
</script>

<style scoped>
    li {
        margin: 1rem;
    }

    .font-bold {
        font-weight: bold;
    }
</style>