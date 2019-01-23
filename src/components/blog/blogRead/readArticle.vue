<template>
    <div>
        <div>
            <h1>阅读文章界面</h1>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            str:'',
            content:''
        }
    },
    mounted(){},
    methods:{
        //调用该方法对数据库取出来的文章进行转码
        escapeStringHTML(str) {
            str = str.replace(/&lt;/g,'<');
            str = str.replace(/&gt;/g,'>');
            return str;
        }
    }
}
</script>

<style>

</style>

