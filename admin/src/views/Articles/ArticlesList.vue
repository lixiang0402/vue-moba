<template>
    <div>
        <h1>文章列表</h1>

        <el-table :data="items" style="width: 100%">
            <el-table-column prop="_id" label="ID" width="280">
            </el-table-column>
            <el-table-column prop="title" label="文章标题" width="450">

            </el-table-column>
            <el-table-column label="操作" width="170">
                <template slot-scope="scope">
                    <el-button type="primary" @click="$router.push(`/articles/edit/${scope.row._id}`)" size="small">编辑</el-button>
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
            // 获取分类列表
            async getCategoriesList() {
                let { data: res } = await this.$http.get('/rest/articles')
                this.items = res
                // console.log(res);
            },
            async remove(row) {
                let isconfirm = await this.$confirm(`是否删除当前<${row.title}>文章?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                if (isconfirm == "confirm") {
                    let { data: res } = await this.$http.delete(`/rest/articles/${row._id}`)
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