<template>
    <div v-if="productDetails">
        <h1> test</h1>
        <img :src="productDetails.image" alt="Product image">
        <p>{{ productDetails.price }}</p>
        <!-- Display other product details here -->
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onMounted, ref } from 'vue';

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

        return {
            productDetails
        };
    }
};
</script>