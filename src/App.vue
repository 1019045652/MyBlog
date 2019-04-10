<template>
  <div id="app">
    <div style="background:rgb(208, 248, 246);">
    <div class="main-routerView">
       <router-view/>
    </div>
    </div>
   
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.main-routerView{
  margin: 0 auto;
  box-shadow:0px -5px 57px grey, 0px -49px 18px grey;

}

</style>
