<template>
  <v-card class="mx-auto my-12" max-width="374">
    <template>
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      class="v-img__contain"
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>{{ restaurant.name }}</v-card-title>

    <v-card-text>
      <div>
        {{ restaurant.address }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="reserve()">
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
    
<script lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
  data: () => ({}),
  setup(props: any) {
    const router = useRouter();
    const store = useStore();

    function reserve() {
      store.dispatch("restaurant", props.restaurant);
      router.push("/products");
    }
    return {
      reserve,
    };
  },
};
</script>