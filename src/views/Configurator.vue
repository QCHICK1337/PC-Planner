<template>
    <div class="container mt-4">
        <h2 class="text-center my-4 my-md-5">{{ $t('configurator.title') }}</h2>
        <div v-for="(error, index) in isCompatible" :key="index" class="alert alert-danger">
            <font-awesome-icon icon="triangle-exclamation" /> {{ error }}
        </div>
        <div class="row d-flex flex-wrap">
            <div v-for="card in cards" :key="card.id" class="col-12 col-md-6 col-lg-3 mb-4">
                <BCard class="d-flex flex-column flex-grow-1" style="max-width: 30rem; margin: 0 auto;">
                    <template v-slot:header>
                        <div class="d-flex align-items-center">
                            <div>{{ $t(card.title) }}&nbsp;</div>
                            <div v-if="card.id === 6">
                                <font-awesome-icon icon="info-circle" class="text-muted" id="tooltip-target" />
                                <b-tooltip target="tooltip-target" variant="primary">
                                    {{ $t('configurator.optionalComponent') }}
                                </b-tooltip>
                            </div>
                        </div>
                    </template>
                    <BCardText class="flex-grow-1 d-flex flex-column align-items-start text-left">
                        <template v-if="getSelectedData(card.id).name">
                            <router-link class="product-name d-flex align-items-center"
                                :to="{ name: 'ProductDetails', params: { type: card.link.replace('/products/', ''), name: getSelectedData(card.id).name, collection: card.collection } }">
                                <img v-if="getSelectedData(card.id).image" :src="getSelectedData(card.id).image"
                                    alt="Component Image" class="component-image mb-2 mr-2">
                                <div>
                                    {{ getSelectedData(card.id).name }}
                                    <small class="text-muted d-block">{{ formatPrice(getSelectedData(card.id).price)
                                        }}</small>
                                </div>
                            </router-link>
                        </template>
                    </BCardText>
                    <div v-if="!isSelected(card.id) && card.link" class="w-100 m-auto">
                        <router-link :to="card.link" class="btn btn-primary w-100">{{ $t('configurator.addButton')
                            }}</router-link>
                    </div>
                    <div v-else-if="isSelected(card.id) && card.link" class="w-100 m-auto d-flex">
                        <router-link :to="card.link" class="btn btn-primary w-50 no-wrap" style="margin-right: 5px;">
                            {{ $t('configurator.changeButton') }}
                        </router-link>
                        <button @click="removeSelection(card.id)" class="btn btn-danger w-50 no-wrap"
                            style="margin-left: 5px;">
                            {{ $t('configurator.removeButton') }}
                        </button>
                    </div>
                    <div v-else class="w-100 m-auto">
                        <button class="btn btn-primary w-100">{{ $t('configurator.addButton') }}</button>
                    </div>
                </BCard>
            </div>
            <div class="row mt-2 mb-4">
                <div class="col-12 text-left">
                    <h5 class="mb-3"><font-awesome-icon icon="bolt" /> {{ $t('configurator.estimatedPower') }}: <span
                            class="text-muted">{{ estimatedPower }} W</span></h5>
                    <h5><font-awesome-icon icon="receipt" /> {{ $t('configurator.totalPrice') }}: <span
                            class="text-muted">{{
                                totalPrice }}</span></h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { BCard, BCardText } from 'bootstrap-vue-next';
import { useI18n } from 'vue-i18n';

export default {
    components: {
        BCard,
        BCardText,
    },
    setup() {
        const { t } = useI18n();
        const store = useStore();
        const selectedCpu = computed(() => store.state.selectedCpu);
        const selectedCooler = computed(() => store.state.selectedCooler);
        const selectedMotherboard = computed(() => store.state.selectedMotherboard);
        const selectedRAM = computed(() => store.state.selectedRAM);
        const selectedStorage = computed(() => store.state.selectedStorage);
        const selectedGPU = computed(() => store.state.selectedGPU);
        const selectedCase = computed(() => store.state.selectedCase);
        const selectedPSU = computed(() => store.state.selectedPSU);
        const COMPONENT_IDS = {
            CPU: 1,
            COOLER: 2,
            MOTHERBOARD: 3,
            RAM: 4,
            STORAGE: 5,
            GPU: 6,
            CASE: 7,
            PSU: 8
        };
        const isSelected = (id) => {
            switch (id) {
                case COMPONENT_IDS.CPU: return selectedCpu.value !== null;
                case COMPONENT_IDS.COOLER: return selectedCooler.value !== null;
                case COMPONENT_IDS.MOTHERBOARD: return selectedMotherboard.value !== null;
                case COMPONENT_IDS.RAM: return selectedRAM.value !== null;
                case COMPONENT_IDS.STORAGE: return selectedStorage.value !== null;
                case COMPONENT_IDS.GPU: return selectedGPU.value !== null;
                case COMPONENT_IDS.CASE: return selectedCase.value !== null;
                case COMPONENT_IDS.PSU: return selectedPSU.value !== null;
                default: return false;
            }
        };
        const isCompatible = computed(() => {
            let errors = [];
            if (selectedCpu.value && selectedMotherboard.value) {
                if (selectedCpu.value.socket !== selectedMotherboard.value.socket) {
                    errors.push(t('configurator.errors.cpuMotherboardCompatibility'));
                }
            }
            if (selectedRAM.value && selectedMotherboard.value) {
                if (selectedRAM.value.type !== selectedMotherboard.value['memory-type']) {
                    errors.push(t('configurator.errors.ramMotherboardCompatibility'));
                }
            }
            if (selectedMotherboard.value && selectedCase.value) {
                const caseSupportedFormFactors = selectedCase.value['motherboard-form-factor'].split(', ');
                if (!caseSupportedFormFactors.includes(selectedMotherboard.value['form-factor'])) {
                    errors.push(t('configurator.errors.motherboardCaseCompatibility'));
                }
            }
            return errors;
        });
        const totalPrice = computed(() => {
            let total = 0;
            if (selectedCpu.value) total += selectedCpu.value.price;
            if (selectedCooler.value) total += selectedCooler.value.price;
            if (selectedMotherboard.value) total += selectedMotherboard.value.price;
            if (selectedRAM.value) total += selectedRAM.value.price;
            if (selectedStorage.value) total += selectedStorage.value.price;
            if (selectedGPU.value) total += selectedGPU.value.price;
            if (selectedCase.value) total += selectedCase.value.price;
            if (selectedPSU.value) total += selectedPSU.value.price;
            return total.toLocaleString('pl-PL', { minimumFractionDigits: 2 }) + ' zł';
        });
        const formatPrice = (price) => {
            return price ? price.toLocaleString('pl-PL', { minimumFractionDigits: 2 }) + ' zł' : '';
        };
        const estimatedPower = computed(() => {
            let totalPower = 0;
            if (selectedCpu.value) totalPower += parseInt(selectedCpu.value.mtp);
            if (selectedGPU.value) totalPower += parseInt(selectedGPU.value.tdp);
            if (selectedCooler.value) totalPower += 10;
            if (selectedMotherboard.value) totalPower += 70;
            if (selectedRAM.value) totalPower += 25;
            if (selectedStorage.value) totalPower += 10;
            return totalPower;
        });
        const removeSelection = (id) => {
            switch (id) {
                case COMPONENT_IDS.CPU: store.dispatch('selectCpu', null); break;
                case COMPONENT_IDS.COOLER: store.dispatch('selectCooler', null); break;
                case COMPONENT_IDS.MOTHERBOARD: store.dispatch('selectMotherboard', null); break;
                case COMPONENT_IDS.RAM: store.dispatch('selectRAM', null); break;
                case COMPONENT_IDS.STORAGE: store.dispatch('selectStorage', null); break;
                case COMPONENT_IDS.GPU: store.dispatch('selectGPU', null); break;
                case COMPONENT_IDS.CASE: store.dispatch('selectCase', null); break;
                case COMPONENT_IDS.PSU: store.dispatch('selectPSU', null); break;
            }
        };
        const getSelectedData = (id) => {
            switch (id) {
                case COMPONENT_IDS.CPU: return selectedCpu.value ? { name: selectedCpu.value.name, image: selectedCpu.value.image, price: selectedCpu.value.price } : { name: '', image: '', price: '' };
                case COMPONENT_IDS.COOLER: return selectedCooler.value ? { name: selectedCooler.value.name, image: selectedCooler.value.image, price: selectedCooler.value.price } : { name: '', image: '', price: '' };
                case COMPONENT_IDS.MOTHERBOARD: return selectedMotherboard.value ? { name: selectedMotherboard.value.name, image: selectedMotherboard.value.image, price: selectedMotherboard.value.price } : { name: '', image: '', price: '' };
                case COMPONENT_IDS.RAM: return selectedRAM.value ? { name: selectedRAM.value.name, image: selectedRAM.value.image, price: selectedRAM.value.price } : { name: '', image: '', price: '' };
                case COMPONENT_IDS.STORAGE: return selectedStorage.value ? { name: selectedStorage.value.name, image: selectedStorage.value.image, price: selectedStorage.value.price } : { name: '', image: '', price: '' };
                case COMPONENT_IDS.GPU: return selectedGPU.value ? { name: selectedGPU.value.name, image: selectedGPU.value.image, price: selectedGPU.value.price } : { name: '', image: '', price: '' };
                case COMPONENT_IDS.CASE: return selectedCase.value ? { name: selectedCase.value.name, image: selectedCase.value.image, price: selectedCase.value.price } : { name: '', image: '', price: '' };
                case COMPONENT_IDS.PSU: return selectedPSU.value ? { name: selectedPSU.value.name, image: selectedPSU.value.image, price: selectedPSU.value.price } : { name: '', image: '', price: '' };
                default: return { name: '', image: '', price: '' };
            }
        };

        const cards = computed(() => [
            {
                id: COMPONENT_IDS.CPU,
                title: t('labels.cpu'),
                text: t('configurator.selectProduct'),
                link: '/products/cpu',
                collection: 'cpu'
            },
            {
                id: 2,
                title: t('labels.cooler'),
                text: t('configurator.selectProduct'),
                link: '/products/coolers',
                collection: 'cooler'
            },
            {
                id: 3,
                title: t('labels.motherboard'),
                text: t('configurator.selectProduct'),
                link: '/products/motherboards',
                collection: 'motherboard'
            },
            {
                id: 4,
                title: t('labels.ram'),
                text: t('configurator.selectProduct'),
                link: '/products/ram',
                collection: 'ram'
            },
            {
                id: 5,
                title: t('labels.storage'),
                text: t('configurator.selectProduct'),
                link: '/products/storage',
                collection: 'storage'
            },
            {
                id: 6,
                title: t('labels.gpu'),
                text: t('configurator.selectProduct'),
                link: '/products/gpu',
                collection: 'gpu'
            },
            {
                id: 7,
                title: t('labels.case'),
                text: t('configurator.selectProduct'),
                link: '/products/cases',
                collection: 'case'
            },
            {
                id: 8,
                title: t('labels.psu'),
                text: t('configurator.selectProduct'),
                link: '/products/psu',
                collection: 'psu'
            }
        ]);

        return {
            selectedCpu,
            selectedCooler,
            selectedMotherboard,
            selectedRAM,
            selectedStorage,
            isSelected,
            isCompatible,
            totalPrice,
            formatPrice,
            estimatedPower,
            removeSelection,
            t,
            cards,
            getSelectedData
        };
    },
};
</script>

<style scoped>
.component-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    flex-shrink: 0;
    margin-right: 10px;
}

.no-wrap {
    white-space: nowrap;
}

.product-name {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    min-height: 70px;
}

.product-name:hover {
    color: rgb(95, 95, 255);
}
</style>