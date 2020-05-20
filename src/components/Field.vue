<template lang="html">
  <div class="px-2">
    <div :class="{'d-flex flex-column trans go-up' : checkDifference(numberHistory[numberHistory.length - 2]) > 0, 'd-flex flex-column trans go-down' : checkDifference(numberHistory[numberHistory.length - 2]) < 0, 'd-flex flex-column trans' : checkDifference(numberHistory[numberHistory.length - 2]) === 0}">
      <div>
        <span class="badge">{{ sign + number.toString() }}</span>
        <!-- <span>ITEM: {{ item }}</span> -->
        <span v-if="numberHistory.length < 2">
          <span></span>
        </span>
        <span v-else-if="checkDifference(numberHistory[numberHistory.length - 2]) > 0">
          <i class="fas fa-arrow-up text-success"></i>
        </span>
        <span v-else-if="checkDifference(numberHistory[numberHistory.length - 2]) === 0">
          <span class="text-dark">
            &#8781;
          </span>
        </span>
        <span v-else>
          <i class="fas fa-arrow-down text-danger"></i>
        </span>
        <small>Diff: {{ checkDifference(numberHistory[numberHistory.length - 2]) }}</small>
      </div>
      <button class="btn btn-primary btn-sm btn-block letter-btn">Label: {{ letter }}</button>
      <button
        :class="{'btn btn-primary btn-lg': changeDisabled, 'btn btn-danger btn-lg': !changeDisabled }"
        @click="changeRandomizer"
      >
        {{ changeDisabled ? "Enable" : "Disable" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Number,
    letter: String
  },
  name: "Field",
  data() {
    return {
      sign: '',
      number: /* localStorage[`Item#${this.$props.item}`] ? parseInt(JSON.parse(localStorage["Item#1"])[JSON.parse(localStorage[`Item#1`]).length - 1][1]) : */ 3,
      interval: null,
      changeDisabled: false,
      numberHistory: localStorage[`Item#${this.$props.item}`] ? JSON.parse(localStorage[`Item#${this.$props.item}`]) : []
    };
  },
  created() { this.interval = setInterval(() => this.changeValue(), 2000); },
  methods: {
    changeValue() {
      const signs = ["+", "-"]
      const numbers = [1, 2]

      const change = (arr) => arr[Math.floor(Math.random() * arr.length)]

      this.sign = change(signs)
      this.number = change(numbers)
      const fullNumber = parseInt(`${this.sign}${this.number}`)
      this.numberHistory = [...this.numberHistory, fullNumber]
      localStorage.setItem(`Item#${this.$props.item}`, JSON.stringify(this.numberHistory))
    },
    changeRandomizer() {
      this.changeDisabled = !this.changeDisabled
      if (this.changeDisabled) {
        this.interval = window.clearInterval(this.interval)
      } else {
        this.interval = setInterval(() => this.changeValue(), 2000)
      }
    },
    checkDifference(lastItem) {
      return parseInt(`${this.sign}${this.number}`) - lastItem
    }
  },
  beforeRouteLeave (to, from, next) { this.interval = window.clearInterval(this.interval._id); next() }
}
</script>

<style lang="css" scoped>
  .go-up {
    transform: translateY(-5px);
    background-color: lightgreen;
  }

  .go-down {
    transform: translateY(5px);
    background-color: lightpink;
  }

  .letter-btn:focus,
  .letter-btn:active {
    box-shadow: none;
  }
</style>
