<template>
<div class="col-xs-12 col-sm-3 col-md-2 bg-light d-flex flex-column">
    <div class="header row">
        <div class="col text-center">Categories</div>
    </div>
    <div class="row flex-fill">
        <div class="col">
            <div></div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data: {

    }
}
</script>
<style lang="scss" scoped>
@import '../../node_modules/bootstrap/scss/bootstrap.scss';

.header{
    height: 40px;
    padding: 5px;
    background: lighten(theme-color("dark"), 10%);
    color: white;
}

</style>
