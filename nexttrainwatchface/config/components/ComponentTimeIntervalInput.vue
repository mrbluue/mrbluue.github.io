<template>
  <div class="component component-time">
      <label>
        <span class="label">Show from</span>
        <input 
          type="time"
          :value="startTime"
          @input="$emit('update:startTime', $event.target.value)"
        />
      </label>
      <label>
        <span class="label">Show until</span>
        <input 
          type="time"
          :value="endTime"
          @input="$emit('update:endTime', $event.target.value)"
        />
      </label>
  </div>
</template>

<script>
export default {
  props: {
    startTime: String,
    endTime: String
  },
  emits: ['update:startTime', 'update:endTime']
}
</script>

<style scoped>
  .component-time label {
      margin-bottom: 0.4rem;
      align-items: center;
  }

  .component-time input {
      font-size: 1rem;
      font-family: PFDinDisplayPro, monospace;
  }
</style>