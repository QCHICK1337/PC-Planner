<template>
    <div class="about container text-start my-4">
        <h2 class="text-center my-4 my-md-5">{{ $t("about.title") }}</h2>
        <h5 class="mb-3">{{ $t("about.subtitle") }}</h5>
        <p class="mb-4">
            {{ $t("about.description") }}
        </p>
        <h5 class="mb-3">{{ $t("about.features") }}</h5>
        <ul class="mb-4">
            <li class="mb-2">{{ $t("about.featureList.componentSelection") }}</li>
            <li class="mb-2">{{ $t("about.featureList.compatibilityCheck") }}</li>
            <li class="mb-2">{{ $t("about.featureList.costEstimation") }}</li>
        </ul>
    </div>
</template>

<style scoped></style>