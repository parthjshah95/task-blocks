<template>
    <div id="container" v-bind:style="containerStyle">
        <div id="tick">
        </div>
    </div>
</template>
<script>
var defaultSize = 20;

export default {
    name:'tick-button',
    props:['btn-size'],
    data: function(){
        return {};
    },
    computed:{
        containerStyle(){
            var size = this.btn-size? this.btn-size: defaultSize;
            var style =
            'height:' + size + 'px;' +
            'width:' + size + 'px;';
            return style;
        }
    }
}
</script>
<style lang="scss" scoped>

#tick{
    margin: auto;
    text-align: center;
    color: gray;
    #container:hover &{
        color: black;
    }
    #container:active &{
        background-color: darken($color: lightgray, $amount: 10);
        border-radius: 0.25rem;;
    }
    &:after{
        content: '\2713';
    }
}
#container{
    display: inline-block;
}
</style>
