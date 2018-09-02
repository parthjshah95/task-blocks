<template>
    <div id="container" v-bind:style="containerStyle">
        <div id="edit">
        </div>
    </div>
</template>
<script>
var defaultSize = 20;

export default {
    name:'edit-button',
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
        editStyle(){
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

#edit{
    margin: auto;
    color: gray;
    #container:hover &{
        color: black;
    }
    #container:active &{
        background-color: darken($color: lightgray, $amount: 10);
        border-radius: 0.25rem;
    }
    &:after{
        content: '\270E';
    }
}
#container{
    border-radius: 0.25rem;
    display: inline-block;
}
</style>
