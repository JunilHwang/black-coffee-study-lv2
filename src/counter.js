export function createCounter({
  initVal = 0,
  min = -Infinity,
  max = Infinity
} = {}) {
  let count = initVal;
  return {
    val() {
      return count;
    },
    inc() {
      count = Math.min(count + 1, max);
    },
    dec() {
      count = Math.max(count - 1, min);
    },
    isMax() {
      return count === max;
    },
    isMin() {
      return count === min;
    }
  };
}
