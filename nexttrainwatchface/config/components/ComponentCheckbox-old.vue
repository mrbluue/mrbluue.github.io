<template>
  <div :class="{'component component-toggle': !sectionHeader, 'section-header section-header-toggle': sectionHeader}">
      <label>
        <span v-if="!sectionHeader" class="label">{{ label }}</span>
        <h3 v-else class="label" :class="{'disabled': !enabled}">{{ label }}</h3>
        <input type="checkbox" :checked="isChecked" @input="$emit('update:isChecked', $event.target.checked)" :disabled="!enabled"/>
        <span class="graphic">
          <span class="slide"></span>
          <span class="marker"></span>
        </span>
      </label>
      <div v-if="sectionHeader" class="station-preview-toggle" @click="refreshToggle" ></div>
    </div>
</template>

<script>
export default {
  name: "ComponentCheckbox",
  props: {
    label: String,
    isChecked: Boolean,
    enabled: { type: Boolean, default: true, required: false },
    refresh: Boolean,
    sectionHeader: { type: Boolean, default: false, required: false }
  },
  emits: ['update:isChecked', 'update:refresh'],
  methods: {
    refreshToggle() {
      if(this.enabled && this.isChecked)
        this.$emit('update:refresh', !this.refresh);
    }
  }
}
</script>

<style scoped>

h3.disabled{
  color: #6a6a6a;
}

.component-toggle input[type="checkbox"], .section-header-toggle input[type="checkbox"]{
    width: 2.2652rem;
    margin: 0;
    display: none;
}

.component-toggle .graphic, .section-header-toggle .graphic {
    display: inline-block;
    position: relative;
}

.component-toggle .graphic .slide, .section-header-toggle .graphic .slide {
    display: block;
    border-radius: 1.05rem;
    height: 1.05rem;
    width: 2.2652rem;
    background: #2f2f2f;
    transition: background-color 150ms linear;
}

.component-toggle .graphic .marker, .section-header-toggle .graphic .marker {
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

.component-toggle input:checked + .graphic .slide, .section-header-toggle input:checked + .graphic .slide {
    background: #993d19;
}

.component-toggle input[disabled] + .graphic .slide, .section-header-toggle input[disabled] + .graphic .slide {
    background: #6a6a6a;
}

.component-toggle input:checked[disabled] + .graphic .slide, .section-header-toggle input:checked[disabled] + .graphic .slide {
    background: #897770;
}

.component-toggle input[disabled] + .graphic .marker, .section-header-toggle input[disabled] + .graphic .marker {
    background: #8c8c8c;
}
.component-toggle input:checked + .graphic .marker, .section-header-toggle input:checked + .graphic .marker {
    background: #ff4700;
    transform: translateX(0.8652rem);
}


</style>