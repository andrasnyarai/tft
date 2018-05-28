<template>
  <div class="wrapper">
    <div v-if="modalActive" class="modal">
      <p>
        <a>[./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/clien</a>
        <a>[./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/clien</a>
        <a>[./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/clien</a>
        <a>[./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/clien</a>
      </p>
    </div>
    <div class= "tech" v-if="this.$parent.loadTechIndicator">
      <div v-for="(tech, index) in this.$parent.techs">
        <div v-bind:style="{ backgroundImage: `url(${tech.path})`,
        transform: `translateY(${tech.offsetY * 50 + 100 + (Math.floor(index / 4) * 15)}px) translateX(${tech.offsetX * 70 + 400 + (Math.floor(index / 4) * 5)}px)` }"
              v-bind:class="{ enlarge: tech.activeEl }"
              v-on:click="enlargeElement(tech, index)"/>
          <p>{{ tech.text }}<p/>
        </div>
    </div>
  </div>
</template>

<script>
import { tween, styler, easing, listen } from 'popmotion';

export default {
  name: 'Tech',
  data() {
    return {
      modalActive: false,
      enlargeActive: false,
      allIconElements: undefined,
      initValue: true,
      previous: null,
    };
  },
  components: {
  },
  methods: {
    enlargeElement(tech, index) {
      if (this.$parent.loadTechIndicator && this.initValue) {
        this.allIconElements = document.querySelectorAll('.tech > div')
        this.initValue = false
      }
      index += 1;
      if (this.previous) {
        this.previous.element.classList.remove('enlarge');
        this.previous.element.children[0].style.transform = `${this.previous.initialState}`;
        console.log(this.previous)
      }


      this.allIconElements.forEach((div, i) => i + 1 === index ? div.classList.remove('blur') : div.classList.add('blur'));
      const focusedElement = document.querySelector(`.tech > div:nth-of-type(${index})`);
      this.previous = {};
      this.previous.element = focusedElement;
      this.previous.initialState = window.getComputedStyle(focusedElement.children[0]).transform
      focusedElement.classList.add('enlarge')
      const details = document.querySelector(`.tech > div:nth-of-type(${index}) p`);
      details.classList.toggle('visible');
      const focusStyler = styler(focusedElement.children[0]);
      const transformMatrix = window.getComputedStyle(focusedElement.children[0]).transform.replace(')','').split(',')

      tween({
        // from: { x: 0, y: 0, scale: 1 },
        // to: { x: transformMatrix[4] + .1, y: transformMatrix[5] - (transformMatrix[5] - window.scrollY), scale: 4 },
        ease: easing.easeInOut,
        duration: 0,
      }).start(focusStyler.set);

      this.modalActive = true;
      setTimeout(() => focusedElement.children[0].style.transform = 'translate(100px , 500px) scale(5)', 1000);
      // setTimeout(() => {focusedElement.children[0].style.transform = `translateY(${window.scrollY + 150}px)`}, 1000);
      setTimeout(() => {
        // focusedElement.children[0].classList.add('fixed');
        // focusedElement.children[0].style.transform = `translateY(${0}px)`
      }, 2000);
    },
  },
};
</script>

<style scoped>
  .tech {
    margin: 10%;
  }
  .tech div {
    /*margin: 5px;*/
    /*display: inline-block;*/
    position: absolute;
    top: 0;
    left: 0;
    transition: 1s ease;
  }
  .tech > div > div {
    width: 50px;
    height: 50px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .tech p {
    display: none;
  }
  p.visible {
    display: block !important;
  }
  img {
    width: 50px;
    max-height: 50px;
  }
  .blur {
    /*filter: blur(2px);*/
    opacity: .2;
  }
  .enlarge {
    z-index: 1;
    /*position: fixed;*/
  }
  div.enlarge > div {
    /*position: fixed;*/
    /*transform: translateY(0) translateX(0) !important;*/
    /*transform: !important;*/

  }
  div.fixed {
    /*transform: translate(0);*/
    position: sticky !important;

  }
  .modal {
    width: 100%;
    height: 100%;
    position: fixed;

  }
  .modal p {
    width: 80%;
    z-index: 1;
    position: fixed;
    display: grid;
    grid-gap: 15px;
  }
  .modal a {

  }

</style>
