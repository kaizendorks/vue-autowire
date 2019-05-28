<template>
  <div>
    <p>This is the BlogPreview async component</p>
    <BlogPreviewSubcomponent />
  </div>
</template>

<script>
import BlogPreviewSubcomponent from './BlogPreviewSubcomponent.local.vue'

export default {
  components: {
    BlogPreviewSubcomponent
  }
}
</script>
