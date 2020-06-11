<template>
    <div>
        <h1>{{id?"编辑":"添加"}}分类</h1>
        <el-form :model="model" ref="form" label-width="100px" style="marginTop:50px">
            <el-form-item label="上级分类" prop="parent">
                <el-select v-model="model.parent" placeholder="请选择">
                    <el-option v-for="item in parent" :key="item._id" :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分类名称" prop="name" :rules="[{ required: true, message: '分类名称不能为空'}]">
                <el-input type="age" v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.stop.prevent="submitForm('form')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        props: ["id"],
        data() {
            return {
                model: {
                    name: '',
                },
                parent: []
            };
        },
        watch: {
            $route() {
                this.$refs['form'].resetFields()
            }
        },
        methods: {
            async submitForm(formName) {
                let res = await this.$refs[formName].validate()
                if (res) {
                    let res
                    if (this.id) {
                        res = await this.$http.put(`/rest/categories/${this.id}`, this.model)
                    } else {
                        res = await this.$http.post("/rest/categories", this.model)
                    }
                    if (!res.data.success) return this.$message.warning("保存失败,注意分类名称是否重复")
                    this.$router.push("/categories/list")
                    this.$message.success("保存成功")
                }
            },
            async fetch() {
                let { data: res } = await this.$http.get(`/rest/categories/${this.id}`)
                this.model.name = res.name
            },
            async fetchParent() {
                let { data: res } = await this.$http.get('/rest/categories')
                this.parent = res
            }
        },
        created() {
            this.id && this.fetch()
            this.fetchParent()
        },
    }
</script>