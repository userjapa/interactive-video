<template>
  <div>
    <div>
      <h1> Interactive Video </h1>
    </div>
    <div>
      <router-link :to="{ name: 'Create' }">Create Video</router-link>
    </div>
    <div>
      <router-link :to="{ name: 'Preview' }">View Video</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
