<template>
  <div>
    <h1>This is a test page to ensure directives are auto-wired</h1>
    <p>I am a paragraph without a directive.</p>
    <p v-bars>I am a paragraph with an auto-registered directive.</p>
    <p v-bold>I am a paragraph with a local directive that wasn't registered</p>
  </div>
</template>
