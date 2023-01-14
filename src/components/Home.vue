<template>
  <div class="home-wrapper">
    <div v-if="user">
      <v-container>
        <v-row class="mx-auto">
          <v-col>
            <h3>Bonjour {{ user.username }} ! Votre solde: {{ balance }}€</h3>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col
            v-for="restaurant in filteredRestaurants"
            :key="restaurant.name"
            cols="4"
          >
            <v-card>
              <restaurant-component
                :restaurant="restaurant"
              ></restaurant-component>
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
import axios from "axios";

export default defineComponent({
  name: "Home",
  components: {
    RestaurantComponent,
  },
  data: () => {
    return {
      restaurants,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    ...mapGetters(["panier"]),
    filteredRestaurants() {
      if (!this.panier.length) return this.restaurants;
      return this.restaurants.filter((restaurant) => {
        return restaurant.name === this.panier[0].restaurantName;
      });
    },
  },
  setup() {
    const balance = ref(0);

    async function checkReferal() {
      try {
        const response = await axios.get("http://localhost:3000/api/referal", {
          headers: { "auth-token": localStorage.getItem("token") },
        });
        if (response.data.valid) {
          balance.value = 5;
        } else {
          balance.value = 0;
        }
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    checkReferal();
    return {
      balance,
    };
  },
  
});
</script>

<style scope>
</style>
