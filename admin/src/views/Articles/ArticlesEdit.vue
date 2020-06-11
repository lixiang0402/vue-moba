<template>
    <div>
        <h1>{{id?"编辑":"添加"}}文章</h1>
        <el-form :model="model" ref="form" label-width="100px" style="marginTop:50px">

            <el-form-item label="所属分类" prop="categories">
                <el-select v-model="model.categories" multiple placeholder="请选择">
                    <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章标题" prop="title" :rules="[{ required: true, message: '文章标题不能为空'}]">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="title">
                <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
            </el-form-item>
            <el-form-item prop="body">
                <el-button type="primary" @click.stop.prevent="submitForm('form')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import { VueEditor } from "vue2-editor";
    export default {
        components: {
            VueEditor
        },
        props: ["id"],
        data() {
            return {
                categories: [],
                model: {
                    title: '',
                    body: "",
                    categories: []
                },
                _id: ""

            };
        },
        watch: {
            $route(to, from) {
                to.path == "/articles/edit" ? this._id = "" : this._id
                this.$refs['form'].resetFields()
            }
        },
        methods: {
            async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
                var formData = new FormData();
                formData.append("file", file);
                const res = await this.$http.post("/upload", formData)
                console.log(formData)
                console.log(res)
                Editor.insertEmbed(cursorLocation, "image", res.data.url);
                resetUploader();
                // axios({
                //         url: "https://fakeapi.yoursite.com/images",
                //         method: "POST",
                //         data: formData
                //     })
                //     .then(result => {
                //         let url = result.data.url; // Get url from response
                //         Editor.insertEmbed(cursorLocation, "image", url);
                //         resetUploader();
                //     })
                //     .catch(err => {
                //         console.log(err);
                //     });
            },

            async submitForm(formName) {
                let res = await this.$refs[formName].validate()
                if (res) {
                    let res
                    if (this._id) {
                        res = await this.$http.put(`/rest/articles/${this._id}`, this.model)
                    } else {
                        res = await this.$http.post("/rest/articles", this.model)
                    }
                    if (!res.data.success) return this.$message.warning("保存失败")
                    this.$router.push("/articles/list")
                    this.$message.success("保存成功")
                }
            },
            // 获取文章分类
            async fetchCategories() {
                let { data: res } = await this.$http.get("/rest/categories")
                let newarr = []
                res.forEach(r => {
                    if (r.parent && r.parent._id == "5edefb9e44e42e1e7c6a1e2c") {
                        newarr.push(r)
                    }
                })
                this.categories = newarr
            },
            async fetch() {
                let { data: res } = await this.$http.get(`/rest/articles/${this._id}`)
                this.model = Object.assign({}, this.model, res)
                delete this.model.__v
                delete this.model._id
            },
        },
        created() {
            this._id = this.id
            this.fetchCategories()
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