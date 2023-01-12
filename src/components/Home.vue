<template>
  <div class="home-wrapper">
    <div v-if="user">
      <v-container>
        <v-row class="mx-auto">
          <v-col>
            <h3>Bonjour, {{ user.username }}</h3>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col v-for="restaurant in restaurants" :key="restaurant.name" cols="4">
            <v-card>
              <restaurant-component :restaurant="restaurant"></restaurant-component>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <h3>tu n'es pas connecté</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";
import RestaurantComponent from "./Restaurant.vue";
import restaurants from "../data/products";

export default defineComponent({
  name: "Home",
  components: {
    RestaurantComponent,
  },
  data() {
    return {
      restaurants,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  setup() {
  },
});
</script>

<style scope>
</style>
