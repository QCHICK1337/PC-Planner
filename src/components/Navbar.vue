<template>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="d-flex justify-content-between custom-navbar">
        <div class="d-flex align-items-center">
            <router-link to="/" class="navbar-brand font-weight-bold text-light">
                <font-awesome-icon icon="computer" /> PC PLANNER
            </router-link>
        </div>
        <b-button v-b-toggle.navbarNav class="navbar-toggler custom-toggler" type="button">
            <font-awesome-icon icon="bars" class="fa-lg" />
        </b-button>
        <b-collapse id="navbarNav" is-nav class="flex-grow-1">
            <div class="d-flex justify-content-between flex-grow-1 align-items-center">
                <b-navbar-nav>
                    <b-nav-item>
                        <router-link to="/configurator" class="nav-link text-light">{{ $t('menu.configurator')
                            }}</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to="/about" class="nav-link text-light">{{ $t('menu.about') }}</router-link>
                    </b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown :text="$t('menu.language')" right toggle-class="text-light">
                        <b-dropdown-item @click="setLanguage('en')"><span class="fi fi-gb"></span>
                            English</b-dropdown-item>
                        <b-dropdown-item @click="setLanguage('pl')"><span class="fi fi-pl"></span>
                            Polski</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </div>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { BNavbar, BButton, BCollapse, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem } from 'bootstrap-vue-next'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useI18n } from 'vue-i18n'

library.add(faBars)

export default {
    name: 'Navbar',
    components: {
        BNavbar,
        BButton,
        BCollapse,
        BNavbarNav,
        BNavItem,
        BNavItemDropdown,
        BDropdownItem,
        FontAwesomeIcon
    },
    setup() {
        const { locale } = useI18n();

        function setLanguage(lang) {
            locale.value = lang;
            localStorage.setItem('userLanguage', lang);
        }

        function loadLanguagePreference() {
            const userLang = localStorage.getItem('userLanguage');
            if (userLang) {
                locale.value = userLang;
            }
        }

        return { setLanguage, loadLanguagePreference };
    },
    mounted() {
        this.loadLanguagePreference();
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

@media (min-width: 1400px) {
    .custom-navbar {
        padding-left: 30rem !important;
        padding-right: 30rem !important;
    }
}
</style>
