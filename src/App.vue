<template>
  <main class="">
    <plane />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Plane from "@/components/Plane.vue";

export default defineComponent({
  name: "App",
  components: { Plane }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  width: 100%;
  background-color: #79B6AE;
  height: 100vh;
}
</style>
