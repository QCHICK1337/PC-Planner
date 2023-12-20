<template>
    <b-sidebar id="filter-sidebar" title="Filters">
      <div v-for="(filter, index) in filters" :key="index">
        <h5>{{ filter.name }}</h5>
        <b-form-checkbox-group v-model="filter.selectedOptions" stacked>
          <b-form-checkbox v-for="(option, optionIndex) in filter.options" :key="optionIndex" :value="option">
            {{ option }}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </div>
    </b-sidebar>
  </template>
  
  <script>
  export default {
    props: {
      filters: {
        type: Array,
        required: true,
      },
    },
    watch: {
      filters: {
        handler() {
          this.$emit('filter-change', this.filters);
        },
        deep: true,
      },
    },
  };
  </script>