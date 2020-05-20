<template lang="html">
  <div class="container">
    <h2>Main page</h2>
    <div class="d-flex justify-content-between align-items-center main-content">
      <div v-for="i in letters.length" :key="i" class="d-flex">
        <Field :item="i" :letter="letters[i - 1]" />
      </div>
    </div>
    <div class="mt-5">
      <!-- DODAJ PARAMS -->
      <router-link :to="{ name: 'Statistics' }" class="btn btn-primary btn-lg">
        See the statistics&nbsp;&nbsp;<i class="fas fa-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Field from '@/components/Field'

export default {
  name: "MainPage",
  data() {
    return {
      letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    };
  },
  components: {
    Field
  }
}
</script>

<style lang="css" scoped>
  .main-content {
    min-height: 70vh;
  }
</style>
