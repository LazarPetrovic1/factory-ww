<template lang="html">
  <div class="container">
    <div class="mt-5 d-flex justify-content-around">
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 1, 'btn btn-secondary btn-sm': index !== 1}"
        @click="setIndex(1)"
      >
        Item 1
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 2, 'btn btn-secondary btn-sm': index !== 2}"
        @click="setIndex(2)"
      >
        Item 2
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 3, 'btn btn-secondary btn-sm': index !== 3}"
        @click="setIndex(3)"
      >
        Item 3
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 4, 'btn btn-secondary btn-sm': index !== 4}"
        @click="setIndex(4)"
      >
        Item 4
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 5, 'btn btn-secondary btn-sm': index !== 5}"
        @click="setIndex(5)"
      >
        Item 5
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 6, 'btn btn-secondary btn-sm': index !== 6}"
        @click="setIndex(6)"
      >
        Item 6
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 7, 'btn btn-secondary btn-sm': index !== 7}"
        @click="setIndex(7)"
      >
        Item 7
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 8, 'btn btn-secondary btn-sm': index !== 8}"
        @click="setIndex(8)"
      >
        Item 8
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 9, 'btn btn-secondary btn-sm': index !== 9}"
        @click="setIndex(9)"
      >
        Item 9
      </button>
      <button
        :class="{'btn btn-selected custom-active btn-sm': index === 10, 'btn btn-secondary btn-sm': index !== 10}"
        @click="setIndex(10)"
      >
        Item 10
      </button>
    </div>
    <div class="mt-4 custom-table-container border border-dark">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Order #</th>
            <th scope="col">Array #</th>
            <th scope="col">Group nr</th> <!-- Item#${this.index} -->
            <th scope="col">Current value</th> <!-- i: this.info.length - 1 -->
            <th scope="col">Previous value</th> <!-- i: this.info.length - 2 -->
            <th scope="col">Difference</th> <!-- Current value - previous value -->
            <th scope="col">Result</th> <!-- i.fas.fa-arrow-up/-down -->
          </tr>
        </thead>
        <tbody class="custom-table-container">
          <TableRow
            v-for="(item, i) in info"
            :order="i"
            :key="getId()"
            :group="index"
            :current="item"
            :previous="previous(i)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import TableRow from '@/components/datavis/TableRow';

export default {
  name: "Table",
  data() {
    return {
      index: 1,
      info: []
    };
  },
  mounted() {
    this.info = JSON.parse(localStorage[`Item#${this.index}`]).map(x => parseInt(x))
  },
  methods: {
    setIndex(val) {
      this.index = val
      this.info = JSON.parse(localStorage[`Item#${this.index}`]).map(x => parseInt(x))
    },
    getId() {
      return uuid()
    },
    previous(itemIndex) {
      if (itemIndex === 0) {
        return "None";
      }
      return this.info[itemIndex - 1]
    }
  },
  components: {
    TableRow
  }
}
</script>

<style lang="css" scoped>
  .custom-table-container {
    max-height: 550px;
    overflow: auto;
  }

  /* Smaller scrollbar */
  .custom-table-container::-webkit-scrollbar {
    width: 5px;
  }

  .custom-table-container::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: darkgray;
  }

  .custom-table-container::-webkit-scrollbar-thumb {
    background: #111;
  }
</style>
