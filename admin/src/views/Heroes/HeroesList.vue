<template>
    <div>
        <h1>英雄列表</h1>

        <el-table :data="items" style="width: 100%">
            <el-table-column prop="_id" label="ID" width="280">
            </el-table-column>
            <el-table-column prop="name" label="英雄名称" width="180">

            </el-table-column>
            <el-table-column prop="icon" label="英雄头像" width="180">
                <template slot-scope="scope">
                    <img style="width:50px" v-lazy="scope.row.avatar">
                </template>
            </el-table-column>
            <el-table-column label="操作" width="170">
                <template slot-scope="scope">
                    <el-button type="primary" @click="$router.push(`/heroes/edit/${scope.row._id}`)" size="small">编辑</el-button>
                    <el-button type="danger" @click="remove(scope.row)" size="small">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: []
            }
        },
        created: function() {
            this.getCategoriesList()
        },
        methods: {
            // 获取英雄列表
            async getCategoriesList() {
                let { data: res } = await this.$http.get('/rest/heroes')
                this.items = res
                // console.log(res);
            },
            async remove(row) {
                let isconfirm = await this.$confirm(`是否删除当前<${row.name}>英雄?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                if (isconfirm == "confirm") {
                    let { data: res } = await this.$http.delete(`/rest/heroes/${row._id}`)
                    if (!res.success) return this.$message.error("删除失败")
                    this.getCategoriesList()
                    this.$message.success("删除当前项成功")

                }
            }
        },
    }
</script>

<style scoped lang="scss">

</style>