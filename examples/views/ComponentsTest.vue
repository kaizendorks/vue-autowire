<template>
  <div>
    <h1>This is a test page to ensure components are auto-wired</h1>
    <p>See the navbar? Its auto-wired</p>
    <div class="grid">
      <TestSyncComponent id="sync-component" class="component" />
      <TestAsyncComponent id="async-component" class="component" />
      <BlogPreview id="async-complex-component" class="component" />
    </div>
  </div>
</template>

<style>
.grid {
  display: flex;
  flex-direction: row;
}

.component{
  padding: 1rem;
  margin: 1rem;
  flex: 1;
}

#sync-component{
  border: 1px red dashed;
}

#async-component{
  border: 1px indigo dashed;
}

#async-complex-component{
  border: 1px green dashed;
}
</style>
