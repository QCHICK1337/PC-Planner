<template>
  <div>
    <h4>Filtry</h4>
    <b-form-group :label="filter.label" v-for="filter in filters" :key="filter.name">
      <template #label>
        <h6>{{ filter.label }}</h6>
      </template>
      <b-form-checkbox-group v-model="filter.selectedOptions" stacked>
        <b-form-checkbox v-for="option in filter.options" :key="option" :value="option">
          {{ option }}
        </b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>
  </div>
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
      handler(newVal) {
        newVal.forEach(filter => {
          this.$emit('filter-change', filter.name, filter.selectedOptions);
        });
      },
      deep: true,
    },
  },
};
</script>