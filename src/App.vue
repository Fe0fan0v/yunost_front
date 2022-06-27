<template>
  <y-header/>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

// Подключение иконок
UIkit.use(Icons);
// компоненты могут быть вызваны из импортированной ссылки UIkit

import YHeader from "@/components/Header";
export default {
  name: 'App',
  components: {
    YHeader,
  }
}
</script>
<style lang="less">
  @import "../node_modules/uikit/src/less/uikit.less";
</style>