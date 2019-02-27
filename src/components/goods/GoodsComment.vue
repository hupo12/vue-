<template>
    <div>
        <cm-vt :id="id"></cm-vt>
    </div>
</template>

<script>
import comment from '../../subcomponents/comment.vue'
export default {
    data(){
       return {
           id:this.$route.params.id
       }
    },
    components:{
        'cm-vt':comment
    }
}
</script>

<style lang="scss">

</style>
