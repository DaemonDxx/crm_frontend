<template>
  <v-sheet>
    <v-chip-group
      mandatory
      v-model="dontType"
    >
      <v-chip
          v-for="item in typesDont"
          :key="item.type"
          :value="item.type"
          :text-color="dontType === item.type?'white':item.color"
          :color="item.color"
          :outlined="dontType !== item.type"
      >
        {{item.description}}
      </v-chip>
    </v-chip-group>
  </v-sheet>
</template>

<script>
export default {
  name: "DontOptions",
  data: () => {
    return {
      dontType: 'first',
      typesDont: [
        {
          type: 'first',
          description: 'Первичный',
          color: '#FBC02D'
        },
        {
          type: 'second',
          description: 'Повторный',
          color: 'red'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>