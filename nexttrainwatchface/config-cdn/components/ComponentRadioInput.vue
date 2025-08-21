<template>
  <div class="component component-radio">
    <div class="radio-group" :id="id + '-group'">
      <label v-for="item in items">
        <span class="label" :class="{'disabled': !enabled}" v-if="item.label">
          {{ item.label }}
        </span>
        <span class="label" v-if="item.labelImg">
          <img :src="item.labelImg" />
        </span>
        <input type="radio" 
          :name="id" 
          :value="item.value" 
          :checked="modelValue == item.value && this.enabled"
          :disabled="!this.enabled"
          @change="$emit('update:modelValue', item.value)">
        <i></i>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComponentRadioInput",
  props: {
    modelValue: { type: String, default: "" },
    id: { type: String, required: true },
    items: { type: Array, required: true },
    enabled: { type: Boolean, default: true, required: false },
  },
  emits: ["update:modelValue"],
}
</script>

<style scoped>

.component-radio label {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
}

.disabled {
    color: #6a6a6a;
}

.component-radio label:first-child {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
}

.component-radio label input[type="radio"]{
    display: none;
}

.component-radio .radio-group i {
    display: block;
    position: relative;
    border-radius: 1.4rem;
    width: 1.4rem;
    height: 1.4rem;
    border: 2px solid #767676;
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
}

.component-radio .radio-group input:checked + i {
    border-color: #ff4700;
}

.component-radio .radio-group input:checked + i:after {
    content: '';
    display: block;
    position: absolute;
    left: 15%;
    right: 15%;
    top: 15%;
    bottom: 15%;
    border-radius: 1.4rem;
    background: #ff4700;
}

.component-radio .radio-group img {
    image-rendering: pixelated;
    width: 32px;
}
</style>