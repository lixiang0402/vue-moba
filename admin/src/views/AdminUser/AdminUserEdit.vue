<template>
    <div>
        <h1>{{id?"编辑":"添加"}}管理员</h1>
        <el-form :model="model" ref="form" label-width="100px" style="marginTop:50px">
            <el-form-item label="管理员名称" prop="username" :rules="[{ required: true, message: '管理员名称不能为空'}]">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="管理员密码" prop="password">
                <el-input type="password" v-model="model.password"></el-input>
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
                    username: '',
                    password: ''
                },
                _id: ""
            };
        },
        watch: {
            $route(to, from) {
                to.path == "/admin_user/edit" ? this._id = "" : this._id
                this.$refs['form'].resetFields()
            }
        },
        methods: {
            async submitForm(formName) {
                let res = await this.$refs[formName].validate()
                if (res) {
                    let res
                    if (this._id) {
                        console.log("编辑");
                        res = await this.$http.put(`/rest/admin_user/${this._id}`, this.model)
                    } else {
                        console.log("新增");
                        res = await this.$http.post("/rest/admin_user", this.model)
                    }
                    if (!res.data.success) return this.$message.warning("保存失败,注意管理员名称是否重复")
                    this.$router.push("/admin_user/list")
                    this.$message.success("保存成功")
                }
            },
            async fetch() {
                let { data: res } = await this.$http.get(`/rest/admin_user/${this._id}`)
                this.model = Object.assign({}, this.model, res)
                delete this.model.__v
                delete this.model._id
            },

        },
        created() {
            this._id = this.id
            this._id && this.fetch()
        },
    }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 10px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 148px;
        height: 148px;
        line-height: 148px;
        text-align: center;
    }

    .avatar {
        width: 148px;
        height: 148px;
        display: block;
    }
</style>