<template>
  <div>
    <h4>Filtry</h4>
    <b-button v-b-toggle="'collapse-filters'" class="mb-2" v-show="!isDesktop">Toggle Filters</b-button>
    <b-collapse id="collapse-filters" v-model="isDesktop">
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
    </b-collapse>
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
  data() {
    return {
      isDesktop: window.innerWidth >= 768,
    };
  },
  created() {
    window.addEventListener('resize', this.updateIsDesktop);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateIsDesktop);
  },
  methods: {
    updateIsDesktop() {
      this.isDesktop = window.innerWidth >= 768;
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