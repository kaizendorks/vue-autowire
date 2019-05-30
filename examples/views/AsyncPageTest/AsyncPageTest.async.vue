<template>
  <div>
    <h1>This is a page automatically registered as an async vue component</h1>
    <AsyncPageSubcomponent />
  </div>
</template>

<script>
import AsyncPageSubcomponent from './AsyncPageSubcomponent.local.vue';

export default {
  components: {
    AsyncPageSubcomponent
  }
};
</script>



