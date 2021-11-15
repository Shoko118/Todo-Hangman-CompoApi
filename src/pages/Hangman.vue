<template>
  <h1>hello this is the hangman page</h1>
  <!-- tries -->
  <h1>Tries left {{ tries }}</h1>
  <!-- loop words -->
  <h2>
    Guess this
    <span class="words" v-for="(word, index) in guessWords" :key="index">{{
      word
    }}</span>
  </h2>
  <!-- loop letters -->
  <h2>
    Pick choices:
    <span
      class="letters"
      v-for="(letter, index) in letters"
      :key="index"
      @click.prevent="addLetters(letter)"
      >{{ letter }}</span
    >
  </h2>
</template>

<script>
import { computed, ref } from "vue";
export default {
  setup() {
    const tries = ref(5);
    const emptyArray = ref([]);
    const words = ref(["T", "H", "C"]);
    const letters = ref(["B", "E", "A", "L", "Q", "O", "H", "C", "O", "T"]);

    // computed
    const guessWords = computed(() => {
      return words.value.map((word) => {
        if (emptyArray.value.includes(word)) return word;
        else return "X";
      });
    });

    // function
    function addLetters(letter) {
      const insideWord = words.value.includes(letter);
      console.log(insideWord);
      if (tries.value === 0) return alert("you have failed the game");
      else if (insideWord === false) tries.value = tries.value - 1;
      else emptyArray.value = emptyArray.value + letter;
    }
    return {
      tries,
      emptyArray,
      words,
      guessWords,
      letters,
      addLetters,
    };
  },
};
</script>

<style>
.words {
  margin-right: 10px;
}
.letters {
  margin-right: 10px;
}
</style>
