<template>
  <div>
    <b-container class="mt-4">
      <b-row>
        <b-col lg="3" v-for="item in items" v-bind:key="item.id">
          <b-card-group
            deck
            class="card-cursor card-relative"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Detalle"
            @mouseover="item.hover = true"
            @mouseout="item.hover = false"
          >
            <b-card
              :border-variant="item.hover ? 'warning': null"
              @click="detail(item.id)"
              :title="item.name"
              :img-src="item.sprites.other.dream_world.front_default"
              img-alt="Image"
              img-top
              class="mb-2 p-2 "
            >
              <span v-if="item.hover" class="card-absolute">#{{ item.id }}</span>
              <b-card-text>Peso: {{ item.weight }} lbs</b-card-text>
              <b-badge
                v-for="type in item.types"
                v-bind:key="type.slot"
                class="mr-1"
                :variant="badgeColor(type.type.name)"
              >
                {{ type.type.name.toUpperCase() }}
              </b-badge>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import PokemonService from "@/services/pokemon";
import OrderHelper from "@/helpers/OrderHelper";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      items: [],
      hover: false,
    };
  },

  methods: {
    detail(id) {
      console.log("REDIRECT POKEMON", id);
      this.$router.push(`/detailPokemon/${id}`);
    },
    async fetchPokemons() {
      let elements = [];
      const response = await PokemonService.findAll();
      const { results } = response.data;
      for (let pokemon of results) {
        const result = await PokemonService.findByName(pokemon.name);
        elements.push(result.data);
      }
      this.items = elements.map(e => {
        return   {"hover":false, ...e }  }).sort(OrderHelper.methods.sort);
    },

    badgeColor(type) {
      switch (type) {
        case "water":
          return "info";
        case "fire":
          return "danger";
        case "poison":
          return "success";
        case "flying":
          return "primary";
        case "bug":
          return "warning";
        case "grass":
          return "dark";

        default:
          "light";
      }
    },
  },

  async mounted() {
    this.fetchPokemons();
  },
};
</script>

<style scoped>
.card-group .card {
  max-width: calc(25% - 30px);
}
.card-title {
  text-transform: capitalize;
  font-weight: bold;
}
img {
  width: 100%;
  height: 150px;
  object-fit: contain;
  overflow: hidden;
}
.card-cursor :hover {
  cursor: pointer;
}
.card-relative {
  position: relative;
}
.card-absolute {
  position: absolute;
  top: 4px;
  left: 4px;
}
</style>
