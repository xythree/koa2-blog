<style lang="scss">
@font-face {
    font-family: 'FontAwesome';
    src: url('/fonts/fontawesome-webfont.eot?v=4.7.0');
    src: url('/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), url('/fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'), url('/fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'), url('/fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'), url('/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');
    font-weight: normal;
    font-style: normal;
}

.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.fa-lg {
    font-size: 1.33333333em;
    line-height: 0.75em;
    vertical-align: -15%;
}

.fa-2x {
    font-size: 2em;
}

.fa-3x {
    font-size: 3em;
}

.fa-4x {
    font-size: 4em;
}

.fa-5x {
    font-size: 5em;
}

.fa-home:before {
    content: "\f015";
}

.fa-music:before {
    content: "\f001";
}

.fa-heart:before {
    content: "\f004";
}

.fa-tags:before {
    content: "\f02c";
}

.fa-user:before {
    content: "\f007";
}

.fa-hashtag:before {
    content: "\f292";
}

.fa-search:before {
    content: "\f002";
}

.fa-user-o:before {
    content: "\f2c0";
}

.fa-angle-double-left:before {
    content: "\f100";
}

.fa-angle-double-right:before {
    content: "\f101";
}

.fa-times-rectangle:before,
.fa-window-close:before {
    content: "\f2d3";
}

.fa-arrow-circle-left:before {
    content: "\f0a8";
}

.fa-navicon:before,
.fa-reorder:before,
.fa-bars:before {
    content: "\f0c9";
}

.fa-file-word-o:before {
    content: "\f1c2";
}

.fa-wrench:before {
    content: "\f0ad";
}

</style>

<template>
  <div class="ibody">
      <sidebar/>

  </div>
</template>

<script>

import sidebar from "@vue/component/sidebar.vue"

export default {
    components: {
        sidebar
    }
}
</script>

