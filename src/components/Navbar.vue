<template>
    <b-navbar toggleable="lg" type="light" variant="light" class="navbar-with-padding">
        <b-navbar-brand href="#"><font-awesome-icon icon="computer" /> PC Planner</b-navbar-brand>
        <b-navbar-toggle target="navbarNav"></b-navbar-toggle>
        <b-collapse id="navbarNav" is-nav>
            <b-navbar-nav>
                <b-nav-item>
                    <b-nav-link href="#">Konfigurator</b-nav-link>
                </b-nav-item>
                <b-nav-item>
                    <b-nav-link href="#">Informacje</b-nav-link>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { BNavbar, BNavbarBrand, BNavbarToggle, BCollapse, BNavbarNav, BNavItem, BNavLink } from 'bootstrap-vue-next'

export default {
    name: 'Navbar',
    components: {
        BNavbar,
        BNavbarBrand,
        BNavbarToggle,
        BCollapse,
        BNavbarNav,
        BNavItem,
        BNavLink
    }
}
</script>

<style scoped>
.navbar-with-padding {
    padding-left: 20px;
    padding-right: 20px;
}
</style>
