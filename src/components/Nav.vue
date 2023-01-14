<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">Page d'accueil</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto" v-if="!user">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Se connecter</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link"
              >S'inscrire</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ml-auto" v-if="user">
          <li class="nav-item">
            <a href="javascript:void(0)" @click="handleClick" class="nav-link"
              >Se déconnecter</a
            >
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" @click="handleClick3" class="nav-link"
              >Panier</a
            >
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" @click="handleClick2" class="nav-link"
              >Paramètres</a
            >
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" class="nav-link"> </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters, useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Nav",
  setup() {
    const store = useStore();
    const router = useRouter();

    async function handleClick() {
      store.dispatch("user", null);
      store.dispatch("restaurant", null);
      store.dispatch("clearPanier");
      localStorage.removeItem("token");
      router.push("/");
    }
    async function handleClick2() {
      router.push("/settings");
    }
    async function handleClick3() {
      router.push("/cart");
    }

    return {
      handleClick,
      handleClick2,
      handleClick3,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
});
</script>
<style scope>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");

.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}
</style>
