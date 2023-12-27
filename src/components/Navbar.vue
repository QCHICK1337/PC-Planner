<template>
    <b-navbar toggleable="lg" type="light" variant="light" class="px-3 px-lg-5">
        <router-link to="/" class="navbar-brand font-weight-bold"><font-awesome-icon icon="computer" /> PC PLANNER</router-link>
        <b-navbar-toggle target="navbarNav"></b-navbar-toggle>
        <b-collapse id="navbarNav" is-nav>
            <b-navbar-nav>
                <b-nav-item>
                    <router-link to="/configurator" class="nav-link">Konfigurator</router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/about" class="nav-link">Informacje</router-link>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { BNavbar, BNavbarToggle, BCollapse, BNavbarNav, BNavItem } from 'bootstrap-vue-next'

export default {
    name: 'Navbar',
    components: {
        BNavbar,
        BNavbarToggle,
        BCollapse,
        BNavbarNav,
        BNavItem,
    }
}
</script>

<style scoped>
.navbar-brand {
    font-weight: 900 !important;
}
</style>