<template>
    <div>
        <h1>{{id?"编辑":"添加"}}分类</h1>
        <el-form :model="model" ref="form" label-width="100px" style="marginTop:50px">
            <el-form-item label="物品名称" prop="name" :rules="[{ required: true, message: '物品名称不能为空'}]">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="物品图片" prop="icon">
                <el-upload class="avatar-uploader" :action="ActionUrl" :show-file-list="false" :on-success="afterUpload" :headers="getAuthorization()">
                    <img v-if="model.icon" v-lazy="model.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
                    icon: ''
                },
                _id: ""

            };
        },
        watch: {
            $route(to, from) {
                to.path == "/items/edit" ? this._id = "" : this._id
                this.$refs['form'].resetFields()
            }
        },
        methods: {
            // 上传装备图片
            afterUpload(res) {
                this.model.icon = res.url
            },
            async submitForm(formName) {
                let res = await this.$refs[formName].validate()
                if (res) {
                    let res
                    if (this._id) {
                        res = await this.$http.put(`/rest/items/${this._id}`, this.model)
                    } else {
                        res = await this.$http.post("/rest/items", this.model)
                    }
                    if (!res.data.success) return this.$message.warning("保存失败,注意物品名称是否重复")
                    this.$router.push("/items/list")
                    this.$message.success("保存成功")
                }
            },
            async fetch() {
                let { data: res } = await this.$http.get(`/rest/items/${this._id}`)
                console.log(res)
                this.model.name = res.name
                this.model.icon = res.icon
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
        border-color: #409EFF;
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