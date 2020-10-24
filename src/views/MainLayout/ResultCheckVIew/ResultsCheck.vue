<template>
  <v-row class="ml-3 mr-3">

    <v-col xs="12" sm="12" md="6" lg="6" xl="4"
           v-for="point in pointsWithoutResult"
           :key="point._id"
    >
      <PointResultCard
          :point="point"
          @requestDone="updatePoints"
      >

      </PointResultCard>
    </v-col>
  </v-row>
</template>

<script>
import PointResultCard from "@/views/MainLayout/ResultCheckVIew/PointResultCard";
//import {mapActions} from "vuex";

export default {
  name: "ResultsCheck",
  components: {PointResultCard},
  data: () => {
    return {
      date: new Date(2020, 6, 20, 12, 0),
      carouselItem: 0,
      currentTask: {points: []}
    }
  },
  async mounted() {
    // const task = await this[ACTION_GET_TASK](this.date);
    // this.currentTask = task;
  },
  methods: {
    // ...mapActions([ACTION_GET_TASK]),
    updatePoints: function ({point}) {
      this.currentTask.points = this.currentTask.points.filter(oldPoint => oldPoint._id !== point._id)
    }
  },
  computed: {
    isMobile: function () {
      return this.$vuetify.breakpoint.xs
    },
    pointsWithoutResult: function () {
      return this.currentTask.points.filter(point => !point.resultCheck);
    }
  }
}
</script>

<style scoped>

</style>