<template>
    <div class="hotBody">
        <div class="gonggao">
            <h4 style="color:red;font-weight:600;">{{anno.annoTitle}}</h4>
            <p style="color:gray;font-size:13px;font-weight:600;">于{{anno.annoTime|dateFormat}}发布</p>
            <p>{{anno.annoText}}</p>
        </div>
    </div>
</template>

<script>
import api from "@/assets/api/index.js";
export default {
    data(){
        return {
            anno:{},
            annoList:[]
        }
    },
    mounted(){
        api.findAnno().then(res=>{
            this.annoList = res.data.result
            this.anno = this.annoList[this.annoList.length-1]
        })
    },
}
</script>

<style>
.hotBody{
    background-color:rgb(245, 245, 245);
    padding:5px;
}
.gonggao{
    word-break:break-all; 
    background-color:rgb(255, 251, 200);
    padding:8px;
    width:90%;
    margin:0 auto;
}
</style>
