<template>
  <div>
    <h1>This is a test page to ensure filters are auto-wired</h1>
    <p>We have a value of:</p>
    <p id="value-before-filter">{{ value }}</p>
    <p>We auto-wire a filter and now we get:</p>
    <p id="value-after-filter"> {{ value | shout }}</p>
    <p>We auto-wire a .local.js filter and see that it doesn't work</p>
    <p id="value-after-local-filter"> {{ value | whisper }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 'foo',
    }
  }
};
</script>
