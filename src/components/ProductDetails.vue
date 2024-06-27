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
                        <h3 class="mb-2">{{ $t('productDetails.name', { name: productDetails.name }) }}</h3>
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
import { useI18n } from 'vue-i18n';

export default {
    setup() {
        const route = useRoute();
        const name = route.params.name;
        const collectionName = route.params.collection;
        const productDetails = ref(null);
        const { t } = useI18n();

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

        const filteredProductDetailsArray = computed(() => {
            return Object.entries(productDetails.value)
                .filter(([key]) => key !== 'image' && key !== 'name' && key !== 'price')
                .map(([key, value]) => {
                    const translatedValue = value === true || value === false ? t(`values.${value.toString()}`) : value;
                    return {
                        key: t(`labels.${key}`),
                        value: translatedValue
                    };
                });
        });

        return {
            productDetails,
            filteredProductDetailsArray
        };
    },
    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat(this.$i18n.locale, { style: 'currency', currency: 'PLN' }).format(price);
        }
    }
};
</script>