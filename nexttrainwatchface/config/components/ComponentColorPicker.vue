<template>
  <div class="component component-color">
    <!-- Clickable label that opens picker -->
    <label @click="openPicker">
      <span class="label" :class="{ 'disabled': !enabled }">{{ label }}</span>
      <span class="color-value" :class="{ 'disabled': !enabled }" :style="{ backgroundColor: sunlightValue }"></span>
      <input type="hidden" :value="value" />
    </label>

    <!-- Global picker overlay -->
    <div
      v-if="showPicker"
      class="picker-wrap"
      id="color-picker"
      @click.self="closePicker"
    >
      <div class="picker">
        <input type="hidden" id="picked-color-element"/>
        <input type="hidden" id="picked-color-value"/>
        <div class="color-box-container">
          <i
            v-for="(color, index) in colors"
            :key="index"
            class="color-box selectable"
            :class="[ color.classes, { 'selected': color.value === value, 'disabled': color.value === conflictValue } ]"
            :style="{ background: color.bg }"
            @click="selectColor(color.value, color.bg)"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ComponentColorPicker",
  props: {
    label: String,
    value: String,
    conflictValue: String,
    enabled: { type: Boolean, default: true }
  },
  data() {
    return {
      showPicker: false,
      colors: [
        { value: "", bg: "transparent", classes: "" },
        { value: "", bg: "transparent", classes: "" },
        { value: "55ff00", bg: "#9ee594", classes: "rounded-tl selectable" },
        { value: "aaff55", bg: "#c9eaa7", classes: "rounded-tr selectable" },
        { value: "", bg: "transparent", classes: "" },
        { value: "ffff55", bg: "#fff1b5", classes: "rounded-tl selectable" },
        { value: "ffffaa", bg: "#fff6d3", classes: "rounded-tr selectable" },
        { value: "", bg: "transparent", classes: "rounded-tr" },
        { value: "", bg: "transparent", classes: "rounded-tl rounded-tr rounded-bl rounded-br" },
        { value: "", bg: "transparent", classes: "rounded-tl" },
        { value: "aaffaa", bg: "#c7f0c8", classes: "rounded-tl selectable" },
        { value: "55ff55", bg: "#9de7a0", classes: "selectable" },
        { value: "00ff00", bg: "#8ee391", classes: "selectable" },
        { value: "aaff00", bg: "#c9e89d", classes: "selectable" },
        { value: "ffff00", bg: "#ffeeab", classes: "selectable" },
        { value: "ffaa55", bg: "#f1ad93", classes: "selectable" },
        { value: "ffaaaa", bg: "#efb5b8", classes: "rounded-tr selectable" },
        { value: "", bg: "transparent", classes: "rounded-tr" },
        { value: "55ffaa", bg: "#9becc2", classes: "rounded-tl selectable" },
        { value: "00ff55", bg: "#8ee69e", classes: "selectable" },
        { value: "00aa00", bg: "#5e9860", classes: "selectable" },
        { value: "55aa00", bg: "#759a64", classes: "selectable" },
        { value: "aaaa55", bg: "#aea382", classes: "selectable" },
        { value: "aaaa00", bg: "#afa072", classes: "selectable" },
        { value: "ffaa00", bg: "#f1aa86", classes: "selectable" },
        { value: "ff5500", bg: "#e66e6b", classes: "selectable" },
        { value: "ff5555", bg: "#e6727c", classes: "rounded-tr selectable" },
        { value: "aaffff", bg: "#c3f9f7", classes: "rounded-bl selectable" },
        { value: "00ffaa", bg: "#8aebc0", classes: "selectable" },
        { value: "00aa55", bg: "#5c9b72", classes: "selectable" },
        { value: "55aa55", bg: "#759d76", classes: "selectable" },
        { value: "005500", bg: "#2b4a2c", classes: "selectable" },
        { value: "555500", bg: "#564e36", classes: "selectable" },
        { value: "aa5500", bg: "#9d5b4d", classes: "selectable" },
        { value: "ff0000", bg: "#e35462", classes: "selectable" },
        { value: "ff0055", bg: "#e25874", classes: "rounded-br selectable" },
        { value: "", bg: "transparent", classes: "" },
        { value: "55aaaa", bg: "#71a6a4", classes: "selectable" },
        { value: "00aaaa", bg: "#57a5a2", classes: "selectable" },
        { value: "005555", bg: "#27514f", classes: "selectable" },
        { value: "ffffff", bg: "#ffffff", classes: "selectable" },
        { value: "000000", bg: "#000000", classes: "selectable", id: "color-box-black" },
        { value: "aa5555", bg: "#9d6064", classes: "selectable" },
        { value: "aa0000", bg: "#99353f", classes: "selectable" },
        { value: "", bg: "transparent", classes: "" },
        { value: "55ffff", bg: "#95f6f2", classes: "rounded-tl selectable" },
        { value: "00ffff", bg: "#84f5f1", classes: "selectable" },
        { value: "00aaff", bg: "#4cb4db", classes: "selectable" },
        { value: "0055aa", bg: "#16638d", classes: "selectable" },
        { value: "aaaaaa", bg: "#ababab", classes: "selectable" },
        { value: "555555", bg: "#545454", classes: "selectable" },
        { value: "550000", bg: "#4a161b", classes: "selectable" },
        { value: "aa0055", bg: "#983e5a", classes: "selectable" },
        { value: "ff55aa", bg: "#e37fa7", classes: "rounded-tr selectable" },
        { value: "55aaff", bg: "#69b5dd", classes: "rounded-bl selectable" },
        { value: "0055ff", bg: "#007dce", classes: "selectable" },
        { value: "0000ff", bg: "#0068ca", classes: "selectable" },
        { value: "0000aa", bg: "#004387", classes: "selectable" },
        { value: "000055", bg: "#001e41", classes: "selectable" },
        { value: "550055", bg: "#482748", classes: "selectable" },
        { value: "aa00aa", bg: "#955694", classes: "selectable" },
        { value: "ff00aa", bg: "#e16aa3", classes: "selectable" },
        { value: "ffaaff", bg: "#ecc3eb", classes: "rounded-br selectable" },
        { value: "", bg: "transparent", classes: "rounded-bl" },
        { value: "5555aa", bg: "#4f6790", classes: "rounded-bl selectable" },
        { value: "5555ff", bg: "#4180d0", classes: "selectable" },
        { value: "5500ff", bg: "#2f6bcc", classes: "selectable" },
        { value: "5500aa", bg: "#40488a", classes: "selectable" },
        { value: "aa00ff", bg: "#8f74d2", classes: "selectable" },
        { value: "ff00ff", bg: "#de83dc", classes: "selectable" },
        { value: "ff55ff", bg: "#e194df", classes: "rounded-br selectable" },
        { value: "", bg: "transparent", classes: "rounded-br" },
        { value: "", bg: "transparent", classes: "rounded-tl rounded-tr rounded-bl rounded-br" },
        { value: "", bg: "transparent", classes: "rounded-bl rounded-br" },
        { value: "", bg: "transparent", classes: "rounded-bl" },
        { value: "aaaaff", bg: "#a7bae2", classes: "rounded-bl selectable" },
        { value: "aa55ff", bg: "#9587d5", classes: "selectable" },
        { value: "aa55aa", bg: "#9a7099", classes: "rounded-br selectable" },
        { value: "", bg: "transparent", classes: "rounded-br" },
        { value: "", bg: "transparent", classes: "rounded-bl rounded-br" },
        { value: "", bg: "transparent", classes: "rounded-tl rounded-tr rounded-bl rounded-br" }
      ],
      preview: "",
    };
  },
  computed: {
    sunlightValue(){
      const find = this.colors.find(color => color.value === this.value);
      return find.bg;
    },
  },
  methods: {
    openPicker() {
      if(this.enabled)
        this.showPicker = true;
    },
    closePicker() {
      this.showPicker = false;
    },
    selectColor(val, prev) {
      console.log(val, " ", this.conflictValue);
      if(val === this.conflictValue) return;
      this.preview = prev;
      this.$emit('update:value', val);
      setTimeout(()=>{
        this.closePicker();
      }, 250);
    },
  },
};
</script>

<style scoped>
.color-value {
  width: 2.2652rem;
  height: 1.4rem;
  border-radius: 0.7rem;
  box-shadow: 0 0.1rem 0.1rem #2f2f2f;
  display: block;
  background: #000;
}

.label.disabled {
  color: gray;
}

.color-value.disabled {
  background: linear-gradient(
    150deg,
    rgba(0,0,0,0.15) 0 46%,
    red 46% 54%,
    rgba(0,0,0,0.15) 54% 100%
  );
}

.picker-wrap {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 500;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  padding: 1rem;
}

.picker {
  width: 100%;
  max-width: 26rem;
  overflow: auto;
  border-radius: 0.25rem;
}

.color-box {
  width: calc(100%/9);
  aspect-ratio: 1;
  display: block;
}

.color-box-container{
  display: flex;
  flex-wrap: wrap;
  background: #484848;
  padding: 1rem;
}

.color-box.selectable{
  cursor: pointer;
}

.color-box.disabled::after {
  content: " ";
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0,0,0,0.15) 0 48%,
    rgba(255, 0, 0, 0.75) 48% 52%,
    rgba(0,0,0,0.15) 52% 100%
  );
}

.color-box.rounded-br {
  border-bottom-right-radius: 0.25rem;
}

.color-box.rounded-bl {
  border-bottom-left-radius: 0.25rem;
}

.color-box.rounded-tr {
  border-top-right-radius: 0.25rem;
}

.color-box.rounded-tl {
  border-top-left-radius: 0.25rem;
}

.color-box.selected {
  transform: scale(1.1);
  border-radius: 0.25rem;
  box-shadow: #111 0 0 0.24rem;
  position: relative;
  z-index: 100;
}
</style>
