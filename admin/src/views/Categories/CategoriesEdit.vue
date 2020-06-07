<template>
    <div>
        <h1>分类编辑</h1>
        <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" style="marginTop:50px">
            <el-form-item label="分类名称" prop="age" :rules="[{ required: true, message: '分类名称不能为空'}]">
                <el-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('numberValidateForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                numberValidateForm: {
                    age: ''
                }
            };
        },
        methods: {
            async submitForm(formName) {
                let res = await this.$refs[formName].validate()
                if (res) {
                    console.log(1);

                }
            }
        }
    }
</script>