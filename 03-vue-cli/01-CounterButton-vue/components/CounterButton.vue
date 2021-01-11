<template>
  <div>
    <button @click="buttonClickHandler">{{ count }}</button>
  </div>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      // TODO почему не работает
      // default: () => 0,
      // Это только для объекта?
      default: 0,
    },
  },
  methods: {
    buttonClickHandler() {
      this.$emit('increment', this.count + 1);
    },
  },
  model: {
    prop: 'count',
    event: 'increment',
  },
};
</script>

<style scoped></style>
