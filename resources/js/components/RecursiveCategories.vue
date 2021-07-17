<template>
    <div class="list-group well" :class="!category.parent_id ? 'list-group-root' : ''" v-if="categories" v-for="category in categories">
        <a href="#" class="list-group-item">{{category.name}}</a>
        <div v-if="category.children" class="list-group">
            <recursive-categories :categories="category.children">

            </recursive-categories>
        </div>
    </div>
</template>

<script>
    export default {
        name:'recursive-categories',
        props:['categories']
    }
</script>

<style scoped lang="scss">
    @mixin padding($fade: 40, $step: 100) {
        // Recursive sass example

        & + .list-group > .list-group > .list-group-item {
            padding-left: $fade+px;
            @if $step <= $fade {
                // exit
            } @else {
                @include padding($fade + 20, $step);
            }
        }
    }
    .just-padding {
        padding: 15px;
    }

    .list-group.list-group-root {
        padding: 0;
        overflow: hidden;
    }

    .list-group.list-group-root .list-group {
        margin-bottom: 0;
    }

    .list-group.list-group-root .list-group-item {
        border-radius: 0;
        border-width: 1px 0 0 0;
        @include padding();
    }

    .list-group.list-group-root > .list-group-item:first-child {
        border-top-width: 0;
    }

    .list-group.list-group-root > .list-group > .list-group-item {
        padding-left: 30px;
    }

    .list-group.list-group-root > .list-group > .list-group > .list-group-item {
        padding-left: 45px;
    }
    a{
        cursor:default;
        color:black;
    }
</style>
