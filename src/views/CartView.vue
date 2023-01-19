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
    <v-alert
      v-if="orderSubmitted"
      type="success"
      dismissible
      @input="orderSubmitted = false"
      timeout="1000">
     Commande envoyée avec succès
    </v-alert>
  </div>
  <button class="btn btn-secondary" v-if="panier && !orderSubmitted" @click="submitOrder">
    Finaliser la commande
  </button>
</template>
    
    <script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, useStore } from "vuex"; //
import CartComponent from "../components/Cart.vue";
import axios from "axios";
import store from '../store'
import route from "../router";


const referralCodes = require("referral-codes");

export default defineComponent({
  name: "Home",
  store,
  route,
  components: {
    CartComponent,
  },
  computed: {
    ...mapGetters(["panier"]),
    ...mapGetters(["user"]),
  },
  data: () => {
    return {
      orderSubmitted: false,
    };
  },
  methods: {
    async submitOrder() {

      try {
        let currentTimePlus30Minutes = new Date();
        currentTimePlus30Minutes.setMinutes(
          currentTimePlus30Minutes.getMinutes() + 30
        );

        const menus = [];
        for (const item of this.panier) {
          menus.push(item._id);
        }

        const total_cost = this.panier.reduce(
          (acc: any, item: any) => acc + item.price * item.quantity,
          0
        );

        const order = {
          client: this.user.username,
          restaurant: this.panier[0].restaurantId,
          order: {
            menus: menus,
            total_cost: total_cost,
            status: "En cours",
            time_placed: new Date(),
            time_delivered: currentTimePlus30Minutes,
            delivery_person: {
              deliver_username: "Danish",
              delivery_location: "Paquebot",
            },
          },
          code_client: referralCodes.generate({
            pattern: "#####-#####-##",
          }),
          code_restaurant: referralCodes.generate({
            pattern: "#####-#####-##",
          }),
        };

        console.log(order);
        const response = await axios.post(
          "http://localhost:5050/api/restorer/orders",
          {
            client: this.user.username,
            restaurant: this.panier[0].restaurantId,
            order: {
              menus: menus,
              total_cost: total_cost,
              status: "En cours",
              time_placed: new Date(),
              time_delivered: currentTimePlus30Minutes,
              delivery_person: {
                deliver_username: "Danish",
                delivery_location: "Paquebot",
              },
            },
            code_client: referralCodes.generate({
              pattern: "#####-#####-##",
            })[0],
            code_restaurant: referralCodes.generate({
              pattern: "#####-#####-##",
            })[0],
          },
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );
      } catch (error) {
        console.error(error);
      }
      this.orderSubmitted = true;
      setTimeout(() => {
        this.orderSubmitted = false;
        route.push("/");
      }, 3000);
      store.dispatch("clearPanier"); //
    },
  },
  mounted() {
    console.log(this.panier);
  },
});
</script>
    
