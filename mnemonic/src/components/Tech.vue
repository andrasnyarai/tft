<!--Math.floor(index / 4) * 15-->
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
    <div class= "tech">
      <!--<span class="modal"></span>-->
        <div v-for="(tech, index) in this.$parent.techs">
          <div v-bind:style="{ backgroundImage: `url(${tech.path})`,
          transform: `translateY(${tech.offsetY * 150 + 100 + (Math.floor(index / 4) * 15)}px) translateX(${tech.offsetX * 150 + 100}px)` }"
               v-bind:class="{ enlarge: tech.activeEl }"
                v-on:click="enlargeElement(tech, index)"/>
            <p>{{ tech.text }}<p/>
              <!--<p>tech.text</p>-->
        </div>
    </div>
  </div>
</template>

<script>
import { tween, styler, easing, listen } from 'popmotion';

function disable_scroll() {
  document.ontouchmove = function(e){
    e.preventDefault();
  }
}

function enable_scroll() {
  document.ontouchmove = function(e){
    return true;
  }
}

function disableScrolling(){
  var x=window.scrollX;
  var y=window.scrollY;
  window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
  window.onscroll=function(){};
}

let elStyler;
let el;
// listen(document, 'scroll')
//   .start(() => {
//     console.log(window.scrollY)
//     // el.classList.add('fixed');
//
//
//     tween({
//       to: { y: window.scrollY },
//       ease: easing.easeInOut,
//       // flip: Infinity,
//       // duration: 0,
//     }).start(elStyler.set);
//
//
//   });
//
// listen(document, 'touchmove')
//   .start(() => {
//     console.log(window.scrollY)
//     // el.classList.add('fixed');
//
//
//     tween({
//       to: { y: window.scrollY },
//       ease: easing.easeInOut,
//       // flip: Infinity,
//       // duration: 0,
//     }).start(elStyler.set);
//
//
//   });



export default {
  name: 'Tech',
  data() {
    return {
      modalActive: false,
      enlargeActive: false,
    };
  },
  components: {
  },
  methods: {
    enlargeElement(tech, index) {
      // disable_scroll()
      // disableScrolling()
      console.log(index)
      index += 1;
      // this.$parent.techs.forEach(singleTech => singleTech.activeEl = false);
      // this.enlargeActive = !this.enlargeActive;
      // tech.activeEl = true;
      const backgroundNoise = document.querySelectorAll('.tech > div');
      backgroundNoise.forEach((div, i) => i + 1 === index ? null : div.classList.toggle('blur'))

      const focusedElement = document.querySelector(`.tech > div:nth-of-type(${index})`);
      focusedElement.classList.add('enlarge')
      const details = document.querySelector(`.tech > div:nth-of-type(${index}) p`);
      details.classList.toggle('visible');
      console.log(focusedElement)
      const focusStyler = styler(focusedElement.children[0]);
      // elStyler = focusStyler;

      console.log(window.screenLeft)

      var curTransform = new WebKitCSSMatrix(window.getComputedStyle(focusedElement).webkitTransform);
      console.log(focusedElement.offsetTop)
      console.log(focusedElement.offsetLeft + curTransform.m41); //real offset left
      let originalPositionFromTop = focusedElement.offsetTop + curTransform.m42;
      let originalPositionFromLeft = focusedElement.offsetLeft + curTransform.m41;
      console.log('node: ', originalPositionFromTop, originalPositionFromLeft); //real offset top
      console.log('scroll: ', window.scrollY)
      el = focusedElement
      let list = window.getComputedStyle(focusedElement.children[0]).transform.replace(')','').split(',')
      console.log(list)

      tween({
        from: { x: 0, y: 0, scale: 1, position: 'fixed' },
        to: { x: 0, y: list[5] - (list[5] - window.scrollY), scale: 2, position: 'fixed' },
        ease: easing.easeInOut,
        // flip: Infinity,
        duration: 0,
      }).start(focusStyler.set);
      elStyler = focusStyler;
      // el = focusedElement.children[0]

      // setTimeout(() => {
      //   focusedElement.classList.add('fixed')
      // },3500)



      this.modalActive = true;
      // Modal.isActive = true;


      // tween({ to: 300, duration: 500 })
      //   .start(styler(focusedElement).set('x'));
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
    width: 150px;
    height: 150px;
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
    width: 150px;
    max-height: 150px;
  }
  .blur {
    filter: blur(20px);
    opacity: .2;
  }
  .enlarge {
    z-index: 1;
    position: fixed;
  }
  div.enlarge > div {
    /*position: fixed;*/
    /*transform: translateY(0) translateX(0) !important;*/
    /*transform: !important;*/

  }
  div.fixed {
    position: fixed;

  }
  .modal {
    width: 100%;
    height: 100%;
    position: absolute;
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
