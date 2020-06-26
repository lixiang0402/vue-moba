<template>
    <div>
        <h1>{{id?"编辑":"添加"}}广告</h1>
        <el-form :model="model" ref="form" label-width="100px" style="marginTop:50px">
            <el-form-item label="广告名称" prop="name" :rules="[{ required: true, message: '广告名称不能为空'}]">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="广告图片" prop="images">
                <el-button @click="model.images.push({})" type="primary"> <i class="el-icon-plus"></i>添加广告</el-button>
                <el-row>
                    <el-col :md="20" style="border:1px solid #ccc;margin:2rem 0;padding:2rem" v-for="(item,i) in model.images" :key="i">
                        <el-row type="flex" style="align-items:center">
                            <el-col :md="19">
                                <el-form-item label="广告URL">
                                    <el-input v-model="item.url"></el-input>
                                </el-form-item>
                                <el-form-item style="margin-top:2rem" label="广告图片">
                                    <el-upload class="avatar-uploader" :headers="getAuthorization()" :action="ActionUrl" :show-file-list="false" :on-success="res=>$set(item,'img',res.url)">
                                        <img v-if="item.img" v-lazy="item.img" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                            <el-col :md="5" style="text-align:center">
                                <el-button type="danger" @click="model.images.splice(i,1)">删除广告</el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click.stop.prevent="submitForm('form')">保存</el-button>
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
                    images: []
                },
                _id: ""

            };
        },
        watch: {
            $route(to, from) {
                to.path == "/ads/edit" ? this._id = "" : this._id
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
                        res = await this.$http.put(`/rest/ads/${this._id}`, this.model)
                    } else {
                        res = await this.$http.post("/rest/ads", this.model)
                    }
                    if (!res.data.success) return this.$message.warning("保存失败,注意物品名称是否重复")
                    this.$router.push("/ads/list")
                    this.$message.success("保存成功")
                }
            },
            async fetch() {
                let { data: res } = await this.$http.get(`/rest/ads/${this._id}`)
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
<style scope>
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
        width: 248px;
        min-height: 148px;
        line-height: 148px;
        text-align: center;
    }

    .avatar {
        width: 248px;
        min-height: 148px;
        display: block;
    }
</style>