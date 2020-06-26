<template>
    <div>
        <h1>{{id?"编辑":"添加"}}铭文</h1>
        <el-form :model="model" ref="form" label-width="100px" style="marginTop:50px">
            <el-form-item label="铭文名称" prop="name" :rules="[{ required: true, message: '铭文名称不能为空'}]">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="铭文属性1" prop="name">
                <el-input v-model="model.property1"></el-input>
            </el-form-item>
            <el-form-item label="铭文属性2" prop="name">
                <el-input v-model="model.property2"></el-input>
            </el-form-item>
            <el-form-item label="铭文图片" prop="icon">
                <el-upload class="avatar-uploader" :headers="getAuthorization()" :action="ActionUrl" :show-file-list="false" :on-success="afterUpload">
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
                    icon: '',
                    property1: "",
                    property2: ""
                },
                _id: ""
            };
        },
        watch: {
            $route(to, from) {
                to.path == "/runes/edit" ? this._id = "" : this._id
                this.$refs['form'].resetFields()
            }
        },
        methods: {
            // 上传铭文图片
            afterUpload(res) {
                this.model.icon = res.url
            },
            async submitForm(formName) {
                let res = await this.$refs[formName].validate()
                if (res) {
                    let res
                    if (this._id) {
                        res = await this.$http.put(`/rest/runes/${this._id}`, this.model)
                    } else {
                        res = await this.$http.post("/rest/runes", this.model)
                    }
                    if (!res.data.success) return this.$message.warning("保存失败,注意铭文名称是否重复")
                    this.$router.push("/runes/list")
                    this.$message.success("保存成功")
                }
            },
            async fetch() {
                let { data: res } = await this.$http.get(`/rest/runes/${this._id}`)
                console.log(res)
                this.model.name = res.name
                this.model.icon = res.icon
                this.model.property1 = res.property1
                this.model.property2 = res.property2
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