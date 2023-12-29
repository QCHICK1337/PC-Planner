<template>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="px-3 px-lg-5">
        <router-link to="/" class="navbar-brand font-weight-bold text-light">
            <font-awesome-icon icon="computer" /> PC PLANNER
        </router-link>
        <b-button v-b-toggle.navbarNav class="navbar-toggler custom-toggler" type="button">
            <font-awesome-icon icon="bars" class="fa-lg" />
        </b-button>
        <b-collapse id="navbarNav" is-nav>
            <b-navbar-nav>
                <b-nav-item>
                    <router-link to="/configurator" class="nav-link text-light">Konfigurator</router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/about" class="nav-link text-light">Informacje</router-link>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { BNavbar, BButton, BCollapse, BNavbarNav, BNavItem } from 'bootstrap-vue-next'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faBars)

export default {
    name: 'Navbar',
    components: {
        BNavbar,
        BButton,
        BCollapse,
        BNavbarNav,
        BNavItem,
        FontAwesomeIcon
    }
}
</script>

<style scoped>
.navbar-brand {
    font-weight: 900 !important;
}

.custom-toggler {
    color: #fff;
}
</style>