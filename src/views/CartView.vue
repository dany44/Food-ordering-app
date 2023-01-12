<template>
    <div class="home-wrapper">
      <v-container>
        <v-row>
          <v-col v-for="item in panier" :key="item.name" cols="4">
            <v-card>
              <cart-component :menu="item"></cart-component>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
    
    <script lang="ts">
  import { defineComponent } from "vue";
  import { mapGetters } from "vuex";
  import CartComponent from "../components/Cart.vue";
  
  export default defineComponent({
    name: "Home",
    components: {
      CartComponent,
    },
    computed: {
      ...mapGetters(["panier"]),
    },
    mounted() {
      console.log(this.panier);
    },
  });
  </script>
    
  <style scope>
  </style>
    