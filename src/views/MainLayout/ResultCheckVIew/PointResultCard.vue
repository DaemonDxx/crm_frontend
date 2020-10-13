<template>
  <v-card
    class="pb-3"
  >
    <v-card-title
      class="text-start mb-n3 text--card-title"
    >
      {{ point.name }}
    </v-card-title>
    <v-card-subtitle
      class="text-start mb-n7"
    >
      <v-list two-line>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>
              {{`Прибор учета: ${point.numberDevice}`}}
            </v-list-item-title>
            <v-list-item-subtitle >
              {{point.address}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>


    </v-card-subtitle>

    <v-card-text>
      <v-chip-group
          mandatory
          v-model="type"
          column
      >
        <v-chip
            v-for="item in typesResults"
            :key="item.type"
            :color=item.color
            :text-color="item.type === type?'white':item.color"
            :value="item.type"
            :outlined="item.type !== type"
            class="mr-4 mb-2"
        >
          {{item.description}}
        </v-chip>
      </v-chip-group>
      <extra-options
          :point="point"
          :type-result="type"
      >

      </extra-options>
    </v-card-text>
    <v-card-actions
      class="pl-4 pr-4"
    >
      <v-btn
          block
          outlined
          color="primary"
          @click="sendResultCheck"
      >
        Сохранить
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import {TypeSResult} from "@/views/MainLayout/ResultCheckVIew/TypesResult";
import ExtraOptions from "@/views/MainLayout/ResultCheckVIew/ExtraOptions/ExtraOptions";
import {ACTION_CREATE_RESULT_CHECK} from "@/store/result-check";
import {mapActions} from "vuex";

export default {
  components: {ExtraOptions},
  props: ['point'],
  name: "PointResultCard",
  data: () => {
    return {
      typesResults: TypeSResult,
      type: 'skip',
      description: ''
    }
  },
  methods: {
    ...mapActions([ACTION_CREATE_RESULT_CHECK]),
    async sendResultCheck() {
      const updatePoint = await this[ACTION_CREATE_RESULT_CHECK]({
        point: this.point,
        result: {type: this.type, description: this.description}
      })
      if (updatePoint) {
        this.$emit('requestDone', {point: updatePoint});
      }
    }
  }
}
</script>

<style scoped>
  .text--card-title {
    line-height: 1.3rem
  }
</style>