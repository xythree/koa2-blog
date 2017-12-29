<style lang="scss">

.menuSearch {
    position: fixed;
    left: 0;    
    width: 100%;
    top: 0;
    background: #fff;
    border-bottom: 1px solid #ededed;
    transition: left .5s;
    z-index: 8;    
}

.menu {
    $v: 25px;
    position: absolute;
    top: 24px;
    left: 252px+$v;
    width: $v;
    cursor: pointer;
    display: none;
    transition: left .5s;

    span {
        display: block;
        height: 1px;
        background: #000;
        margin: 5px 0;
        transition: all .5s;
    }
}
.search_box {
    $h: 25px;
    $v: 5px;
    $c: #ddd;
    padding: $h;
    overflow: hidden;
    .search_input {
        float: right;
        border: 1px solid $c;
        border-top-left-radius: $v;
        border-bottom-left-radius: $v;
        input {
            height: $h;
            line-height: $h;
            width: 150px;
            padding: 0 10px;
            transition: all .5s ease-out;
            border-top-left-radius: $v;
            border-bottom-left-radius: $v;
        }
        i {
            margin: 0 5px;
            color: #eee;
        }
    }
    .search_btn {
        float: right;
        height: $h;
        line-height: $h;
        width: $h;
        text-align: center;
        border: 1px solid $c;
        border-left: none;
        border-top-right-radius: $v;
        border-bottom-right-radius: $v;
        color: #999;
        cursor: pointer;
    }
}
@media screen and (min-width: 768px) {
    .search_input {
        input {
            transition: width .5s;
            &:focus {
                width: 300px;
            }
        }
    }
}
@media screen and (max-width: 768px) {
    .menu {
        display: block;
        left: 30px;
    }
}
</style>

<template>
  
  <div class="menuSearch">

        <div class="menu" @click="menuFn">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div class="search_box">
            <div class="search_btn" @click="search">
                <i class="fa fa-search"></i>
            </div>
            <div class="search_input">
                <input type="text" @keyup.enter="search" v-model="searchVal" />
            </div>
        </div>
  </div>

</template>


<script>

export default {
    props: ["showMenuCallBack"],
    data() {
        return {
            searchVal: ""
        }
    },
    methods: {
        menuFn() {
            this.showMenuCallBack()
        },
        search() {
            this.showMenuCallBack("search", this.searchVal)
        }
    }
}
    
</script>

