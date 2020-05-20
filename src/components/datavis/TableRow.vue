<template lang="html">
  <tr :class="{ 'higher': difference() > 0, 'lower': difference() < 0, 'equivalent': difference() === 0 }">
    <th scope="row">{{ order + 1 }}</th>
    <td>{{ order }}</td>
    <td>Item#{{ group }}</td>
    <td>{{ current }}</td>
    <td>{{ previous }}</td>
    <td>{{ difference() }}</td>
    <td v-if="difference() > 0">
      <i class="fas fa-arrow-up text-success"></i>
    </td>
    <td v-else-if="difference() === 0">
      <span class="text-dark">
        &#8781;
      </span>
    </td>
    <td v-else>
      <i class="fas fa-arrow-down text-danger"></i>
    </td>
  </tr>
</template>

<script>
export default {
  name: "TableRow",
  props: {
    group: Number,
    current: Number,
    previous: [Number, String],
    order: Number
  },
  methods: {
    difference() {
      if (this.$props.previous === 'None') {
        return this.$props.current
      }
      return this.$props.current - this.$props.previous
    }
  }
}
</script>

<style lang="css" scoped>
  .lower {
    background-color: lightpink;
  }

  .higher {
    background-color: lightgreen;
  }

  .equivalent {
    background-color: lightgray;
  }
</style>
