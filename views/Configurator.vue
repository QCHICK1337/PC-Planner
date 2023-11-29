<template>
    <div class="container mt-4">
        <div class="row">
            <div v-for="card in cards" :key="card.id" class="col-12 col-md-3 mb-4">
                <BCard :header="card.title" class="d-flex flex-column" style="max-width: 30rem; margin: 0 auto;">
                    <BCardText class="flex-grow-1">
                        {{ card.text }}
                    </BCardText>
                    <BButton href="#" variant="primary" class="w-100 m-auto">Dodaj</BButton>
                </BCard>
            </div>
        </div>
    </div>
</template>

<script>
import { BCard, BButton, BCardText } from 'bootstrap-vue-next';

export default {
    components: {
        BCard,
        BButton,
        BCardText,
    },
    data() {
        return {
            cards: [
                {
                    id: 1,
                    title: 'Procesor',
                    text: 'Wybierz produkt',
                },
                {
                    id: 2,
                    title: 'Chłodzenie',
                    text: 'Wybierz produkt',
                },
                {
                    id: 3,
                    title: 'Płyta główna',
                    text: 'Wybierz produkt',
                },
                {
                    id: 4,
                    title: 'Pamięć RAM',
                    text: 'Wybierz produkt',
                },
                {
                    id: 5,
                    title: 'Dysk twardy',
                    text: 'Wybierz produkt',
                },
                {
                    id: 6,
                    title: 'Karta graficzna',
                    text: 'Wybierz produkt',
                },
                {
                    id: 7,
                    title: 'Obudowa',
                    text: 'Wybierz produkt',
                },
                {
                    id: 8,
                    title: 'Zasilacz',
                    text: 'Wybierz produkt',
                },
            ],
        };
    },
};
</script>
  
<style>
</style>
  