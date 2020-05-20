<template lang="html">
  <div>
    <div class="d-flex justify-content-between container">
      <h1>Statistics</h1>
      <div>
        <button
          :class="{'trans btn btn-secondary btn-lg mx-2': visualisation !== 'graph', 'trans btn btn-selected btn-lg mx-4 custom-active': visualisation === 'graph'}"
          @click="changeVisualisation('graph')"
        >
          Graph
        </button>

        <button
          :class="{'trans btn btn-secondary btn-lg mx-2': visualisation !== 'table', 'trans btn btn-selected btn-lg mx-4 custom-active': visualisation === 'table'}"
          @click="changeVisualisation('table')"
        >
          Table
        </button>
        <button
          class="btn btn-danger btn-lg mx-2 custom-pressed"
          @click="reboot()"
        >
          Delete localStorage & reload
        </button>
      </div>
    </div>
    <div class="container mt-2">
      <div v-if="visualisation === 'graph'">
        <Graph />
      </div>
      <div v-else-if="visualisation === 'table'">
        <Table />
      </div>
    </div>
  </div>
</template>

<script>
import Graph from '@/components/datavis/Graph';
import Table from '@/components/datavis/Table';

export default {
  name: "Statistics",
  data() {
    return {
      visualisation: 'graph'
    };
  },
  methods: {
    changeVisualisation(visType) {
      this.visualisation = visType
    },
    reboot() {
      localStorage.clear()
      this.$router.go()
    }
  },
  components: {
    Table,
    Graph
  }
}
</script>

<style lang="css" scoped>
  .custom-pressed {
    transition: all 30ms linear
  }

  .custom-pressed:active {
    transform: translateY(10px);
  }
</style>
