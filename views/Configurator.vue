<template>
    <div class="container mt-4">
        <div class="row">
            <div v-for="card in cards" :key="card.id" class="col-12 col-md-3 mb-4">
                <BCard :header="card.title" class="d-flex flex-column" style="max-width: 30rem; margin: 0 auto;">
                    <BCardText class="flex-grow-1 d-flex flex-column align-items-center">
                        <img v-if="getSelectedData(card.id).image" :src="getSelectedData(card.id).image"
                            alt="Component Image" class="component-image mb-2">
                        {{ getSelectedData(card.id).name }}
                    </BCardText>
                    <div v-if="!isSelected(card.id) && card.link" class="w-100 m-auto">
                        <router-link :to="card.link" class="btn btn-primary w-100">Dodaj</router-link>
                    </div>
                    <div v-else-if="isSelected(card.id) && card.link" class="w-100 m-auto d-flex">
                        <router-link :to="card.link" class="btn btn-primary w-50">Zmień</router-link>
                        <button @click="removeSelection(card.id)" class="btn btn-danger w-50">Usuń</button>
                    </div>
                    <div v-else class="w-100 m-auto">
                        <button class="btn btn-primary w-100">Dodaj</button>
                    </div>
                </BCard>
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
                case 1: return selectedCpu.value ? { name: selectedCpu.value.name, image: selectedCpu.value.image } : { name: '', image: '' };
                case 2: return selectedCooler.value ? { name: selectedCooler.value.name, image: selectedCooler.value.image } : { name: '', image: '' };
                case 3: return selectedMotherboard.value ? { name: selectedMotherboard.value.name, image: selectedMotherboard.value.image } : { name: '', image: '' };
                case 4: return selectedRAM.value ? { name: selectedRAM.value.name, image: selectedRAM.value.image } : { name: '', image: '' };
                case 5: return selectedStorage.value ? { name: selectedStorage.value.name, image: selectedStorage.value.image } : { name: '', image: '' };
                case 6: return selectedGPU.value ? { name: selectedGPU.value.name, image: selectedGPU.value.image } : { name: '', image: '' };
                case 7: return selectedCase.value ? { name: selectedCase.value.name, image: selectedCase.value.image } : { name: '', image: '' };
                case 8: return selectedPSU.value ? { name: selectedPSU.value.name, image: selectedPSU.value.image } : { name: '', image: '' };
                default: return { name: '', image: '' };
            }
        };

        const cards = ref([
            {
                id: 1,
                title: 'Procesor',
                text: 'Wybierz produkt',
                link: '/products/cpu',
            },
            {
                id: 2,
                title: 'Chłodzenie',
                text: 'Wybierz produkt',
                link: '/products/coolers',
            },
            {
                id: 3,
                title: 'Płyta główna',
                text: 'Wybierz produkt',
                link: '/products/motherboards',
            },
            {
                id: 4,
                title: 'Pamięć RAM',
                text: 'Wybierz produkt',
                link: '/products/ram',
            },
            {
                id: 5,
                title: 'Dysk twardy',
                text: 'Wybierz produkt',
                link: '/products/storage',
            },
            {
                id: 6,
                title: 'Karta graficzna',
                text: 'Wybierz produkt',
                link: '/products/gpu',
            },
            {
                id: 7,
                title: 'Obudowa',
                text: 'Wybierz produkt',
                link: '/products/cases',

            },
            {
                id: 8,
                title: 'Zasilacz',
                text: 'Wybierz produkt',
                link: '/products/psu',
            },
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
}
</style>
