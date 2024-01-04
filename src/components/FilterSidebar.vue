<template>
  <div>
    <h4 v-show="isDesktop">Filtry</h4>
    <b-button v-b-toggle="'collapse-filters'" class="mb-2" variant="primary" v-show="!isDesktop"><font-awesome-icon
        icon="filter" /> Filtry</b-button>
    <b-collapse id="collapse-filters" v-model="isCollapseVisible">
      <div class="filter-grid">
        <b-form-group :label="filter.label" v-for="filter in filters" :key="filter.name" class="filter-group">
          <template #label>
            <h6 class="mt-3 mb-1">{{ filter.label }}</h6>
          </template>
          <b-form-checkbox-group v-model="filter.selectedOptions" stacked>
            <b-form-checkbox v-for="option in filter.options" :key="option" :value="option">
              {{ getOptionLabel(option, filter.name) }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        </div>
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
      isCollapseVisible: window.innerWidth >= 768,
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
      const isDesktopNow = window.innerWidth >= 768;
      this.isDesktop = isDesktopNow;
      this.isCollapseVisible = isDesktopNow;
    },
    getOptionLabel(option, filterName) {
      if (filterName === 'Water-Cooled') {
        return option ? 'Tak' : 'Nie';
      }
      return option;
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

<style scoped>
.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1em;
}

@media (min-width: 768px) {
  .filter-grid {
    grid-template-columns: 1fr;
  }
}
</style>