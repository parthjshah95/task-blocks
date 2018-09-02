<template>
    <div id="container" v-bind:style="containerStyle">
        <div id="cross">
        </div>
    </div>
</template>
<script>
var defaultSize = 20;

export default {
    name:'cross-button',
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
        },
        crossStyle(){
            var size = this.btn-size? this.btn-size: defaultSize;
            var style = 
            'height:' + size + 'px;' +
            'width:' + size + 'px;' +
            'font-size:' + (size * 0.6) + 'px';
            return style;
        }
    }
}
</script>
<style lang="scss" scoped>

#cross{
    margin: auto;
    color: gray;
    text-align: center;
    #container:hover &{
        color: black;
    }
    #container:active &{
        background-color: darken($color: lightgray, $amount: 10);
        border-radius: 0.25rem;
    }
    &:after{
        content: '\2715';
    }
}
#container{
    display: inline-block;
}
</style>
