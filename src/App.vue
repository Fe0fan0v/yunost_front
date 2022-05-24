<template>
  <div>
    <div id="App">
      <Header/>
    </div>
  </div>
</template>

<script>

import Header from '@/components/header-view'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>
<style lang="less">
  @import "../node_modules/uikit/src/less/uikit.less";
</style>