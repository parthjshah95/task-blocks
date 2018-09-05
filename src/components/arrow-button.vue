<template>
    <div id="container" v-bind:style="containerStyle">
        <div v-bind:class="'arrow-' + direction">
        </div>
    </div>
</template>
<script>
var defaultSize = 20;

export default {
    name:'tick-button',
    props:['btn-size', 'direction'],
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

.arrow{
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
}
.arrow-up{
    @extend .arrow;
    &:after{
        content: '\25B4';
    }
}
.arrow-right{
    @extend .arrow;
    &:after{
        content: '\25B8';
    }
}
.arrow-down{
    @extend .arrow;
    &:after{
        content: '\25BE';
    }
}
.arrow-left{
    @extend .arrow;
    &:after{
        content: '\25C2';
    }
}
#container{
    cursor: pointer;
    float: left;
}
</style>
