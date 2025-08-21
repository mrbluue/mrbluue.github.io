<template>
  <div v-if="floating" class="component-preview-filler"></div>
  <div class="component no-divider component-preview" :class="{'preview-active': floating}">
    <div 
      v-if="floating" 
      class="watchface-preview-background" 
    ></div>
    <div class="watchface-preview-label">
      Preview: <b>{{ label }}</b>
    </div>
    <div 
      class="watchface-preview" 
      :class="{
        'watchface-preview-round': type === 'round', 
        'watchface-preview-rect': type === 'rect'
      }"
    >
      <div class="watchface-background-outer">
        <div class="watchface-background-frame">
          <div class="watchface-background-inner"></div>
        </div>
      </div>
      <div class="watchface-radial">
        <svg 
          v-if="previewColors.trains" 
          class="watchface-radial-indicators" 
          height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <g 
            v-if="previewColors.trainIndicators && type === 'rect'"
            class="train-indicator-rect">
            <rect 
              class="watchface-radial-indicator"
              id="train-indicator-1"
              x="0"
              y="38"
              width="16"
              height="16"
            />
            <rect 
              class="watchface-radial-indicator"
              id="train-indicator-2"
              x="0"
              y="114"
              width="16"
              height="16"
            />
            <rect 
              class="watchface-radial-indicator"
              id="train-indicator-3"
              x="128"
              y="114"
              width="16"
              height="16"
            />
          </g>
          <g 
            v-if="previewColors.trainIndicators && type === 'round'"
            class="train-indicator-round"
          >
            <circle 
              class="watchface-radial-indicator"
              id="train-indicator-1"
              cx="19"
              cy="49"
              r="8"
            />
            <circle 
              class="watchface-radial-indicator"
              id="train-indicator-2"
              cx="49"
              cy="161"
              r="8"
            />
            <circle 
              class="watchface-radial-indicator"
              id="train-indicator-3"
              cx="172"
              cy="90"
              r="8"
            />
          </g>
          <g 
            v-if="!previewColors.trainIndicators && type === 'round'"
            class="train-indicator-round"
          >
            <circle 
              class="watchface-radial-indicator"
              id="train-indicator-1"
              cx="19"
              cy="49"
              r="8"
              :fill="'#' + previewColors.trainColor1"
            />
            <circle 
              class="watchface-radial-indicator"
              id="train-indicator-2"
              cx="49"
              cy="161"
              r="8"
              :fill="'#' + previewColors.trainColor2"
            />
            <circle 
              class="watchface-radial-indicator"
              id="train-indicator-3"
              cx="172"
              cy="90"
              r="8"
              :fill="'#' + previewColors.trainColor3"
            />
          </g>
        </svg>
        <svg 
          v-if="type === 'rect' && previewColors.trains" 
          class="watchface-radial-rect" 
          height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" >
          <rect
            class="watchface-radial-line"
            id="train-1"
            x="8px"
            y="8px"
            height="152px"
            width="128px"
          />
          <rect
            class="watchface-radial-line"
            id="train-2"
            x="8px"
            y="8px"
            height="152px"
            width="128px"
          />
          <rect
          class="watchface-radial-line"
          id="train-3"
          x="8px"
          y="8px"
          height="152px"
          width="128px"
          />
        </svg>
        <svg 
          v-if="type === 'round' && previewColors.trains" 
          class="watchface-radial-round" 
          height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <circle
            v-if="type === 'round'"
            class="watchface-radial-line"
            id="train-3"
            cx="50%"
            cy="50%"
            r="82px"
            stroke-linecap="round"
          />
          <circle
            v-if="type === 'round'"
            class="watchface-radial-line"
            id="train-2"
            cx="50%"
            cy="50%"
            r="82px"
          />
          <circle
            v-if="type === 'round'"
            class="watchface-radial-line"
            id="train-1"
            cx="50%"
            cy="50%"
            r="82px"
          />
        </svg>
      </div>
      <div 
        v-if="previewColors.ticks" 
        class="watchface-ticks"></div>
      <div 
        v-if="previewColors.digitalClock"
        class="watchface-digital-clock">
        10 09
      </div>
      <div v-if="previewColors.analogClock" class="watchface-analog-clock">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <line x1="50%" y1="50%" x2="74%" y2="31%" stroke-width="6" stroke-linecap="square" id="minute-hand"/>
          <line x1="50%" y1="50%" x2="32%" y2="36%" stroke-width="6" stroke-linecap="square" id="hour-hand"/>
        </svg>
      </div>
      <div 
        v-if="previewColors.topIcon"
        class="watchface-top-icon">
        <div></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ComponentPreview",
  props: {
    label: String,
    type: { type: String, default: "rect" },
    floating: { type: Boolean, default: false },
    previewColors: { type: Object, required: true },
  },
  data() {
    return {
      topIconSrcs: ["icon-time-10roboto", "icon-home", "icon-briefcase", "icon-school", "icon-bank", "icon-heart", "icon-star", "icon-smile"]
    };
  },
  // mounted(){
  //   console.log(this.previewColors);
  // },
  // watch:{
  //   previewColors(newValue, oldValue) {
  //     console.log("loaded previewColors");
  //     console.log(newValue.topIcon);
  //   },
  // },
  computed: {
    getWidth(){
      return this.type === "rect" ? "144px" : "180px";
    },
    getHeight(){
      return this.type === "rect" ? "168px" : "180px";
    },
    getTickMarksSrc(){
      return this.type === "rect" ? "url('resources/img/tick-marks-square.png')" : "url('resources/img/tick-marks-round.png')";
    },
    getTopIconSrc(){
      const topIconName = this.topIconSrcs[this.previewColors.topIconId];
      const fullURL = "url('resources/img/topIcons/" + topIconName + "-16.png')"
      return fullURL;
    }
  },
  // methods: {
  // },
};
</script>

<style scoped>
.component-preview-filler {
  min-height: calc(180px + 3rem);
}

.component-preview {
    position: relative;
    top: 1rem;
    left: 0;
    pointer-events: none;
    padding: 0;
    min-height: calc(180px + 3rem);
    --screen-width: v-bind(getWidth);
    --screen-height: v-bind(getHeight);
    --round-border: v-bind("type === 'round' ? '50%' : 0");
    --outer-color: v-bind("#" + previewColors.outerColor);
    --frame-color: v-bind("#" + previewColors.frameColor);
    --inner-color: v-bind("#" + previewColors.innerColor);
    --digital-color: v-bind("#" + previewColors.digitalColor);
    --hour-hand: v-bind("#" + previewColors.hourColor);
    --minute-hand: v-bind("#" + previewColors.minuteColor);
    --ticks-color: v-bind("#" + previewColors.ticksColor);
    --train-color-first: v-bind("#" + previewColors.trainColor1);
    --train-color-second: v-bind("#" + previewColors.trainColor2);
    --train-color-third: v-bind("#" + previewColors.trainColor3);
    --train-indicators-color: v-bind("#" + previewColors.trainIndicatorsColor);
    --top-icon-bg-color: v-bind("#" + previewColors.topIconBGColor);
    --top-icon-color: v-bind("#" + previewColors.topIconColor);
}

.component-preview.preview-active {
    width: 100%;
    position: fixed;
    top: 4rem;
    left: 0;
    z-index: 300;
}

.watchface-preview-label{
    width: 100%;
    text-align: center;
    position: absolute;
    top: 0; 
    left: 0;
    padding: 0.5rem 0;
    font-size: 0.85rem;
    color: lightgray
}

.watchface-preview {
    position: relative;
    top: 2rem;
    height: var(--screen-height);
    width: var(--screen-width);
    left: calc(50% - (var(--screen-width)/2));
}

.watchface-preview-background {
    height: calc(var(--screen-height) + 0.75rem);
    width: var(--screen-width);
    padding: 1rem 2rem;
    position: absolute;
    top: 0;
    left: calc((50% - (var(--screen-width)/2)) - 2rem); 
    border-radius: 1rem;
    background-color: #484848e3;
    backdrop-filter: blur(5px);
    border: 2px solid black;
}

.watchface-background-outer {
    height: 100%;
    width: 100%;
    border-radius: var(--round-border);
    background-color: var(--outer-color);
    overflow: auto;
}

.watchface-background-frame{
    height: calc(100% - 32px);
    width: calc(100% - 32px);
    margin: 16px;
    border-radius: var(--round-border);
    background-color: var(--frame-color);
    overflow: auto;
}

.watchface-background-inner{
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    margin: 10px;
    border-radius: var(--round-border);
    background-color: var(--inner-color);
}

.watchface-ticks {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 50;
    top: 0;
    left: 0;
    image-rendering: pixelated;
    background-color: var(--ticks-color);
    mask-image: v-bind(getTickMarksSrc);
    mask-repeat: no-repeat;
    mask-size: contain;
}

.watchface-radial, .watchface-radial svg, .watchface-analog-clock, .watchface-analog-clock svg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: var(--round-border);
}

.watchface-radial-indicators {
  z-index: 40;
  fill: var(--train-indicators-color);
}

.watchface-radial-line {
  stroke-width: 16px;
  fill: transparent;
  position: absolute;
  top: 0;
  left: 0;
}

.watchface-radial-round #train-1 {
  stroke-dasharray: 129.5, 450;
  stroke-dashoffset: 409;
  stroke: var(--train-color-first);
}

.watchface-radial-round #train-2 {
  stroke-dasharray: 172, 450;
  stroke-dashoffset: 0;
  stroke: var(--train-color-second);
}

.watchface-radial-round #train-3 {
  stroke-dasharray: 162.5, 450;
  stroke-dashoffset: 226;
  stroke: var(--train-color-third);
}

.watchface-radial-rect #train-1 {
  stroke-dasharray: 458, 450;
  stroke-dashoffset: -64;
  stroke: var(--train-color-first);
}

.watchface-radial-rect #train-2 {
  stroke-dasharray: 382, 450;
  stroke-dashoffset: -64;
  stroke: var(--train-color-second);
}

.watchface-radial-rect #train-3 {
  stroke-dasharray: 179, 450;
  stroke-dashoffset: -64;
  stroke: var(--train-color-third);
}

.watchface-digital-clock{
  width: 80%;
  height: 100%;
  position: absolute;
  top: 8px;
  left: 10%;
  font-family: NimbusSansL-Reg, sans-serif;
  font-size: 62px;
  line-height: 54px;
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--digital-color);
}

.watchface-analog-clock {
  z-index: 100;
}

#hour-hand {
  stroke: var(--hour-hand);
}

#minute-hand {
  stroke: var(--minute-hand);
}

.watchface-top-icon {
  position: absolute;
  top: 0px;
  left: calc(50% - 13px);
  width: 26px;
  height: 26px;
  border-radius: var(--round-border);
  z-index: 50;
  background-color: var(--top-icon-bg-color);

}

.watchface-top-icon div {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
  background-color: var(--top-icon-color);
  mask-image: v-bind(getTopIconSrc);
  mask-repeat: no-repeat;
  mask-size: contain;
  /* transform: scale(0.8); */
}


</style>