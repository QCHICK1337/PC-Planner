<template>
    <div v-if="productDetails" class="d-flex justify-content-center">
        <b-card style="max-width: 800px;" class="mb-3">
            <b-row>
                <b-col md="6">
                    <b-card-img :src="productDetails.image" alt="Product image"></b-card-img>
                </b-col>
                <b-col md="6">
                    <b-card-text>
                        <h1>{{ productDetails.name }}</h1>
                        <p>{{ productDetails.price }}</p>
                        <b-list-group>
                            <b-list-group-item v-for="(value, key) in filteredProductDetails" :key="key">
                                <strong>{{ key }}:</strong> {{ value }}
                            </b-list-group-item>
                        </b-list-group>
                    </b-card-text>
                </b-col>
            </b-row>
        </b-card>
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

        return {
            productDetails,
            filteredProductDetails
        };
    }
};
</script>