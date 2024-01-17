<template>
    <div class="container mt-4">
        <h2 class="text-center my-4 my-md-5">Konfigurator</h2>
        <div v-for="(error, index) in isCompatible" :key="index" class="alert alert-danger">
            {{ error }}
        </div>
        <div class="row d-flex flex-wrap">
            <div v-for="card in cards" :key="card.id" class="col-12 col-md-3 mb-4">
                <BCard :header="card.title" class="d-flex flex-column flex-grow-1"
                    style="max-width: 30rem; margin: 0 auto;">
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
                        <router-link :to="card.link" class="btn btn-primary w-100">Dodaj</router-link>
                    </div>
                    <div v-else-if="isSelected(card.id) && card.link" class="w-100 m-auto d-flex">
                        <router-link :to="card.link" class="btn btn-primary w-50 no-wrap" style="margin-right: 5px;">
                            <i class="fa fa-edit"></i> Zmień
                        </router-link>
                        <button @click="removeSelection(card.id)" class="btn btn-danger w-50 no-wrap"
                            style="margin-left: 5px;">
                            <i class="fa fa-trash"></i> Usuń
                        </button>
                    </div>
                    <div v-else class="w-100 m-auto">
                        <button class="btn btn-primary w-100">Dodaj</button>
                    </div>
                </BCard>
            </div>
            <div class="row mt-2 mb-4">
                <div class="col-12 text-left">
                    <h5 class="mb-3"><font-awesome-icon icon="bolt" /> Szacowany pobór mocy: <span class="text-muted">{{ estimatedPower }} W</span></h5>
                    <h5><font-awesome-icon icon="receipt" /> Łączna cena: <span class="text-muted">{{ totalPrice }}</span></h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { BCard, BCardText } from 'bootstrap-vue-next';

export default {
    components: {
        BCard,
        BCardText,
    },
    setup() {
        const store = useStore();
        const selectedCpu = computed(() => store.state.selectedCpu);
        const selectedCooler = computed(() => store.state.selectedCooler);
        const selectedMotherboard = computed(() => store.state.selectedMotherboard);
        const selectedRAM = computed(() => store.state.selectedRAM);
        const selectedStorage = computed(() => store.state.selectedStorage);
        const selectedGPU = computed(() => store.state.selectedGPU);
        const selectedCase = computed(() => store.state.selectedCase);
        const selectedPSU = computed(() => store.state.selectedPSU);

        const isSelected = (id) => {
            switch (id) {
                case 1: return selectedCpu.value !== null;
                case 2: return selectedCooler.value !== null;
                case 3: return selectedMotherboard.value !== null;
                case 4: return selectedRAM.value !== null;
                case 5: return selectedStorage.value !== null;
                case 6: return selectedGPU.value !== null;
                case 7: return selectedCase.value !== null;
                case 8: return selectedPSU.value !== null;
                default: return false;
            }
        };

        const isCompatible = computed(() => {
            let errors = [];

            if (selectedCpu.value && selectedMotherboard.value) {
                if (selectedCpu.value.socket !== selectedMotherboard.value.socket) {
                    errors.push('Wybrany procesor i płyta główna nie są ze sobą kompatybilne. (Socket)');
                }
            }

            if (selectedRAM.value && selectedMotherboard.value) {
                if (selectedRAM.value.type !== selectedMotherboard.value['memory-type']) {
                    errors.push('Wybrana pamięć RAM i płyta główna nie są ze sobą kompatybilne. (Typ RAM)');
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
                case 1: store.dispatch('selectCpu', null); break;
                case 2: store.dispatch('selectCooler', null); break;
                case 3: store.dispatch('selectMotherboard', null); break;
                case 4: store.dispatch('selectRAM', null); break;
                case 5: store.dispatch('selectStorage', null); break;
                case 6: store.dispatch('selectGPU', null); break;
                case 7: store.dispatch('selectCase', null); break;
                case 8: store.dispatch('selectPSU', null); break;
            }
        };

        const getSelectedData = (id) => {
            switch (id) {
                case 1: return selectedCpu.value ? { name: selectedCpu.value.name, image: selectedCpu.value.image, price: selectedCpu.value.price } : { name: '', image: '', price: '' };
                case 2: return selectedCooler.value ? { name: selectedCooler.value.name, image: selectedCooler.value.image, price: selectedCooler.value.price } : { name: '', image: '', price: '' };
                case 3: return selectedMotherboard.value ? { name: selectedMotherboard.value.name, image: selectedMotherboard.value.image, price: selectedMotherboard.value.price } : { name: '', image: '', price: '' };
                case 4: return selectedRAM.value ? { name: selectedRAM.value.name, image: selectedRAM.value.image, price: selectedRAM.value.price } : { name: '', image: '', price: '' };
                case 5: return selectedStorage.value ? { name: selectedStorage.value.name, image: selectedStorage.value.image, price: selectedStorage.value.price } : { name: '', image: '', price: '' };
                case 6: return selectedGPU.value ? { name: selectedGPU.value.name, image: selectedGPU.value.image, price: selectedGPU.value.price } : { name: '', image: '', price: '' };
                case 7: return selectedCase.value ? { name: selectedCase.value.name, image: selectedCase.value.image, price: selectedCase.value.price } : { name: '', image: '', price: '' };
                case 8: return selectedPSU.value ? { name: selectedPSU.value.name, image: selectedPSU.value.image, price: selectedPSU.value.price } : { name: '', image: '', price: '' };
                default: return { name: '', image: '', price: '' };
            }
        };

        const cards = ref([
            {
                id: 1,
                title: 'Procesor',
                text: 'Wybierz produkt',
                link: '/products/cpu',
                collection: 'cpu'
            },
            {
                id: 2,
                title: 'Chłodzenie',
                text: 'Wybierz produkt',
                link: '/products/coolers',
                collection: 'cooler'
            }
            ,
            {
                id: 3,
                title: 'Płyta główna',
                text: 'Wybierz produkt',
                link: '/products/motherboards',
                collection: 'motherboard'
            }
            ,
            {
                id: 4,
                title: 'Pamięć RAM',
                text: 'Wybierz produkt',
                link: '/products/ram',
                collection: 'ram'
            }
            ,
            {
                id: 5,
                title: 'Dysk',
                text: 'Wybierz produkt',
                link: '/products/storage',
                collection: 'storage'
            }
            ,
            {
                id: 6,
                title: 'Karta graficzna',
                text: 'Wybierz produkt',
                link: '/products/gpu',
                collection: 'gpu'
            }
            ,
            {
                id: 7,
                title: 'Obudowa',
                text: 'Wybierz produkt',
                link: '/products/cases',
                collection: 'case'
            }
            ,
            {
                id: 8,
                title: 'Zasilacz',
                text: 'Wybierz produkt',
                link: '/products/psu',
                collection: 'psu'
            }
        ]);
        const addCard = (card) => {
            cards.value.push(card);
        };

        const removeCard = (id) => {
            cards.value = cards.value.filter(card => card.id !== id);
        };

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
            cards,
            addCard,
            removeCard,
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