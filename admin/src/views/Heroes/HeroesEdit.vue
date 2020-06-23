<template>
    <div>
        <h1>{{_id?"编辑":"添加"}}英雄</h1>
        <el-form :model="model" ref="form" label-width="100px" style="marginTop:50px">

            <el-tabs value="baseMessage" type="border-card">
                <!-- 基础信息 -->
                <el-tab-pane label="基本信息" name="baseMessage">
                    <el-form-item label="英雄头像" prop="avatar">
                        <el-upload class="avatar-uploader" :action="ActionUrl" :show-file-list="false" :headers="getAuthorization()" :on-success="afterUpload">
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item style="width:30%" label="英雄名称" prop="name" :rules="[{ required: true, message: '物品名称不能为空'}]">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item style="width:30%" label="英雄称号" prop="title">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="英雄类别" prop="categories">
                        <el-select v-model="model.categories" multiple placeholder="请选择">
                            <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="英雄难度" prop="diffclut">
                        <el-rate style="marginTop:0.7rem" v-model="model.scores.diffclut" :max="10" show-score></el-rate>
                    </el-form-item>
                    <el-form-item label="英雄技能" prop="skill">
                        <el-rate style="marginTop:0.7rem" v-model="model.scores.skill" :max="10" show-score></el-rate>
                    </el-form-item>
                    <el-form-item label="英雄攻击" prop="attack">
                        <el-rate style="marginTop:0.7rem" v-model="model.scores.attack" :max="10" show-score></el-rate>
                    </el-form-item>
                    <el-form-item label="英雄生存" prop="survival">
                        <el-rate style="marginTop:0.7rem" v-model="model.scores.survival" :max="10" show-score></el-rate>
                    </el-form-item>
                    <el-form-item label="顺风出装" prop="item1">
                        <el-select style="width:40rem" v-model="model.item1" multiple placeholder="请选择">
                            <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装" prop="item2">
                        <el-select style="width:40rem" v-model="model.item2" multiple placeholder="请选择">
                            <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="铭文选择" prop="runes">
                        <el-select style="width:40rem" v-model="model.runes" multiple placeholder="请选择">
                            <el-option v-for="item in runes" :key="item._id" :label="item.name" :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item style="width:60%" label="使用技巧" prop="useTip">
                        <el-input type="textarea" :rows="4" placeholder="请输入使用技巧" v-model="model.useTip">
                        </el-input>
                    </el-form-item>

                    <el-form-item style="width:60%" label="对抗技巧" prop="battleTip">
                        <el-input type="textarea" :rows="4" placeholder="请输入对抗技巧" v-model="model.battleTip">
                        </el-input>
                    </el-form-item>

                    <el-form-item style="width:60%" label="团战技巧" prop="teamFight">
                        <el-input type="textarea" :rows="4" placeholder="请输入团战技巧" v-model="model.teamFight">
                        </el-input>
                    </el-form-item>

                </el-tab-pane>
                <!-- 技能信息 -->
                <el-tab-pane label="技能" name="skills">
                    <el-button @click="model.skills.push({})" style="margin-bottom:2rem" type="primary"> <i class="el-icon-plus"></i> 添加技能</el-button>
                    <el-row type="flex" style="flex-wrap:wrap">
                        <el-col style="border:1px solid #ccc;padding:0.5rem;margin:0.5rem" v-for="(item,i) in model.skills" :key="i">
                            <el-row type="flex" style="align-items: center;">
                                <el-col :md="6">
                                    <el-form-item>
                                        <el-upload :class="item.icon?'':'avatar-uploader'" :action="$http.defaults.baseURL+'/upload'" :show-file-list="false" :on-success="res=>$set(item,'icon',res.url)">
                                            <img v-if="item.icon" :src="item.icon" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            <div v-if="!(item.icon)" class="el-upload__text"> <em>英雄头像</em></div>
                                        </el-upload>
                                    </el-form-item>
                                </el-col>
                                <el-col :md="18">
                                    <el-form-item label="名称">
                                        <el-input placeholder="请输入技能名称" v-model="item.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="冷却时间">
                                        <el-input v-model="item.cooling"></el-input>
                                    </el-form-item>
                                    <el-form-item label="技能消耗">
                                        <el-input v-model="item.consume"></el-input>
                                    </el-form-item>
                                    <el-form-item label="描述">
                                        <el-input autosize placeholder="请输入技能描述" type="textarea" v-model="item.description"></el-input>
                                    </el-form-item>
                                    <el-form-item label="小提示">
                                        <el-input autosize placeholder="请输入技能使用技巧" type="textarea" v-model="item.tips"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="danger" @click="model.skills.splice(i,1)">删除此技能</el-button>
                                    </el-form-item>
                                    <!-- <div style="border:1px solid #ccc;w"></div> -->
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>


            <el-form-item style="marginTop:2rem">
                <el-button style="width:10rem;fontSize:20px" type="primary" @click.stop.prevent="submitForm('form')">保存</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>
<script>
    export default {
        props: ["id"],
        data() {
            return {
                _id: "",
                // 英雄分类列表
                categories: [],
                // 装备列表
                items: [],
                // 铭文列表
                runes: [],
                model: {
                    name: '',
                    avatar: '',
                    scores: {},
                    skills: [{
                        icon: ""
                    }]
                },
            };
        },
        watch: {
            $route(to, from) {
                to.path == "/heroes/edit" ? this._id = "" : this._id
                this.$refs['form'].resetFields()
            }
        },
        methods: {
            // 上传装备图片
            afterUpload(res) {
                this.model.avatar = res.url
            },
            // 上传技能图片
            skillAfterUpload(res) {
                console.log(res)
                this.model.skills.icon = res.url
            },
            // 获取英雄的分类(法师,战士)
            async fetchCategories() {
                let { data: res } = await this.$http.get("/rest/categories")
                res.forEach(r => {
                    if (r.parent && r.parent._id == "5eddf88f3ffa17405859bd6e") {
                        this.categories.push(r)
                    }
                });
            },
            // 获取装备
            async fetchItems() {
                let { data: res } = await this.$http.get("/rest/items")
                this.items = res
            },
            // 获取铭文
            async fetchRunes() {
                let { data: res } = await this.$http.get("/rest/runes")
                this.runes = res
            },
            async submitForm(formName) {
                let res = await this.$refs[formName].validate()
                if (res) {
                    let res
                    if (this._id) {
                        console.log("修改内容");
                        res = await this.$http.put(`/rest/heroes/${this._id}`, this.model)
                    } else {
                        console.log("创建内容");
                        res = await this.$http.post("/rest/heroes", this.model)
                    }
                    if (!res.data.success) return this.$message.warning("保存失败,注意物品名称是否重复")
                    this.$router.push("/heroes/list")
                    this.$message.success("保存成功")
                }
            },
            async fetch() {
                let { data: res } = await this.$http.get(`/rest/heroes/${this._id}`)
                this.model = Object.assign({}, this.model, res)
                delete this.model.__v
                delete this.model._id
            },
        },
        created() {
            this._id = this.id
            this._id && this.fetch()
            // 获取英雄分类  给下拉列表选择
            this.fetchCategories()
            // 获取装备信息 给顺风出装 逆风出装选择
            this.fetchItems()
            // 获取铭文列表
            this.fetchRunes()
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
        width: 108px;
        height: 108px;
        line-height: 108px;
        text-align: center;
    }

    .avatar {
        justify-content: center;

        width: 108px;
        height: 108px;
        display: block;
    }
</style>