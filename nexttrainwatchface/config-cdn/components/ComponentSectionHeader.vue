<template>
  <div class="section-header section-header-toggle">
      <label>
        <h3 :class="{'disabled': !enabled}">{{ label }}</h3>
        <input v-if="checkbox" type="checkbox" :checked="isChecked" @input="$emit('update:isChecked', $event.target.checked)" :disabled="!enabled"/>
        <span v-if="checkbox" class="graphic">
          <span class="slide"></span>
          <span class="marker"></span>
        </span>
      </label>
      <div class="station-preview-toggle" :class="{ 'offset' : checkbox }" @click="refreshToggle" ></div>
    </div>
</template>

<script>
export default {
  name: "ComponentSectionHeader",
  props: {
    label: String,
    checkbox: { type: Boolean, default: true },
    isChecked: Boolean,
    enabled: { type: Boolean, default: true, required: false },
    refresh: Boolean,
  },
  emits: ['update:isChecked', 'update:refresh'],
  methods: {
    refreshToggle() {
      if((this.enabled && this.isChecked) || !this.checkbox )
        this.$emit('update:refresh', !this.refresh);
    }
  }
}
</script>

<style scoped>

.section-header-toggle label {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    /* padding: 0.5rem 0; */
}

.section-header .station-preview-toggle {
    display: block;
    width: 1.25rem;
    height: 1.25rem;
    padding: 0.5rem;
    border-radius: .25rem;
    background: #484848;
    position: absolute;
    top: 0.5rem;
    /* left: 0; */
    right: 1rem;
}

.section-header .station-preview-toggle:hover, #show-preview:hover {
    background: #575757;
}
.section-header .station-preview-toggle:active, #show-preview:hover {
    background: #7e7e7e;
}

.section-header-toggle .station-preview-toggle.offset {
    right: 3.5304rem;
}

.section-header .station-preview-toggle::after {
    content: " ";
    display: block;
     width: 1.25rem;
    height: 1.25rem;
    padding: 0.5rem;
    border-radius: .25rem;
    cursor: pointer;
    background-color: #ff4700;
    mask-image: url("resources/img/eye-icon.svg");
    mask-size: 75%;
    mask-position: 50% 50%;
    mask-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    /* right: 3.5304rem; */
}

h3.disabled{
  color: #6a6a6a;
}

.section-header-toggle input[type="checkbox"]{
    width: 2.2652rem;
    margin: 0;
    display: none;
}

.section-header-toggle .graphic {
    display: inline-block;
    position: relative;
}

.section-header-toggle .graphic .slide {
    display: block;
    border-radius: 1.05rem;
    height: 1.05rem;
    width: 2.2652rem;
    background: #2f2f2f;
    transition: background-color 150ms linear;
}

.section-header-toggle .graphic .marker {
    background: #ececec;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 1.4rem;
    position: absolute;
    left: 0;
    display: block;
    top: -0.175rem;
    transition: transform 150ms linear;
    box-shadow: 0 0.1rem 0.1rem #2f2f2f;
}

.section-header-toggle input:checked + .graphic .slide {
    background: #993d19;
}

.section-header-toggle input[disabled] + .graphic .slide {
    background: #6a6a6a;
}

.section-header-toggle input:checked[disabled] + .graphic .slide {
    background: #897770;
}

.section-header-toggle input[disabled] + .graphic .marker {
    background: #8c8c8c;
}
.section-header-toggle input:checked + .graphic .marker {
    background: #ff4700;
    transform: translateX(0.8652rem);
}


</style>