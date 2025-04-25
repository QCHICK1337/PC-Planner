<template>
  <div>
    <h4 v-show="isDesktop">{{ $t('labels.filters') }}</h4>
    <b-button v-b-toggle="'collapse-filters'" class="mb-2" variant="primary" v-show="!isDesktop"><font-awesome-icon
        icon="filter" /> {{ $t('labels.filters') }}</b-button>
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
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  props: {
    filters: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const isDesktop = ref(window.innerWidth >= 768);
    const isCollapseVisible = ref(window.innerWidth >= 768);
    let resizeTimeout = null;

    const updateIsDesktop = () => {
      const isDesktopNow = window.innerWidth >= 768;
      isDesktop.value = isDesktopNow;
      isCollapseVisible.value = isDesktopNow;
    };

    // Debounce resize handler
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateIsDesktop, 100);
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    });

    const getOptionLabel = (option, filterName) => {
      if (filterName === 'Water-Cooled') {
        return option ? 'Yes' : 'No';
      }
      return option;
    };

    watch(
      () => props.filters,
      (newVal) => {
        newVal.forEach(filter => {
          emit('filter-change', filter.name, filter.selectedOptions);
        });
      },
      { deep: true }
    );

    return {
      t,
      isDesktop,
      isCollapseVisible,
      getOptionLabel,
    };
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