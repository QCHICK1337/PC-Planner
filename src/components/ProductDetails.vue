<template>
    <div v-if="productDetails" class="justify-content-center mt-5 text-center">
        <b-card style="max-width: 800px; border: none;" class="mb-3 mx-auto p-3">
            <b-row>
                <b-col md="6" class="mb-3">
                    <b-card-img :src="productDetails.image" alt="Product image" class="img-fluid"
                        style="max-width: 300px;"></b-card-img>
                </b-col>
                <b-col md="6" class="mb-3 d-flex align-items-center justify-content-center flex-column">
                    <b-card-text>
                        <h3 class="mb-2">{{ productDetails.name }}</h3>
                        <p class="mb-0 text-muted">{{ formatPrice(productDetails.price) }}</p>
                    </b-card-text>
                </b-col>
            </b-row>
        </b-card>
        <div class="mb-5">
            <b-list-group class="mx-auto" style="max-width: 800px;">
                <b-list-group-item v-for="(item, index) in filteredProductDetailsArray" :key="index">
                    <b-row>
                        <b-col md="6" class="text-muted">{{ item.key }}</b-col>
                        <b-col md="6">{{ item.value }}</b-col>
                    </b-row>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onMounted, ref, computed } from 'vue';

export default {
    setup() {
        const route = useRoute();
        const name = route.params.name;
        const collectionName = route.params.collection;

        const productDetails = ref(null);

        onMounted(async () => {
            const q = query(collection(db, collectionName), where('name', '==', name));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                productDetails.value = doc.data();
                console.log(productDetails.value);
            });

            if (!productDetails.value) {
                console.log("No such document!");
            }
        });

        const filteredProductDetails = computed(() => {
            if (!productDetails.value) return {};
            let otherDetails = { ...productDetails.value };
            delete otherDetails.image;
            delete otherDetails.name;
            delete otherDetails.price;
            return otherDetails;
        });

        const labels = {
            'core-count': 'Liczba rdzeni',
            'socket': 'Gniazdo procesora',
            'tdp': 'TDP',
            'base-clock': 'Taktowanie bazowe',
            'boost-clock': 'Taktowanie turbo',
            'manufacturer': 'Producent',
            'water-cooled': 'Chłodzenie wodne',
            'max-noise': 'Maksymalny poziom hałasu',
            'max-rpm': 'Maksymalna prędkość obrotowa',
            'form-factor': 'Standard płyty',
            'memory-type': 'Typ pamięci RAM',
            'type': 'Typ pamięci RAM',
            'latency': 'Opóźnienie',
            'speed': 'Częstotliwość',
            'modules': 'Moduły',
            'total-memory': 'Pojemność',
            'interface': 'Interfejs',
            'capacity': 'Pojemność',
            'memory': 'Pamięć',
            'chipset': 'Chipset',
            'core-clock': 'Taktowanie rdzenia',
            'color': 'Kolor',
            'motherboard-form-factor': 'Standard płyty głównej',
            'wattage': 'Moc zasilacza',
            'efficiency-rating': 'Cerfyfikat sprawności',
            'case-type': 'Typ obudowy',
        }

        const valueLabels = {
            'true': 'Tak',
            'false': 'Nie'
        }

        const orderOfKeys = ['manufacturer', 'core-count', 'socket', 'tdp', 'base-clock', 'boost-clock', 'water-cooled', 'max-noise', 'max-rpm', 'form-factor', 'memory-type', 'type', 'latency', 'speed', 'modules', 'total-memory', 'interface', 'capacity', 'memory', 'case-type', 'chipset', 'core-clock', 'color', 'motherboard-form-factor', 'wattage', 'efficiency-rating'];

        const filteredProductDetailsArray = computed(() => {
            return Object.entries(filteredProductDetails.value)
                .sort(([keyA], [keyB]) => orderOfKeys.indexOf(keyA) - orderOfKeys.indexOf(keyB))
                .map(([key, value]) => ({
                    key: labels[key] || key,
                    value: valueLabels[String(value)] || value
                }));
        });

        return {
            labels,
            valueLabels,
            productDetails,
            filteredProductDetails,
            filteredProductDetailsArray
        };
    },
    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(price);
        }
    }
};
</script>
