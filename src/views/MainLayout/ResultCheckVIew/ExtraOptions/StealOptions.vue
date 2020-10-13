<template>
  <v-sheet>
    <v-text-field
      placeholder="Дата последней проверки"
    >
    </v-text-field>
    <v-chip-group
      v-model="payment"
      mandatory
    >
      <v-chip
        v-for="item in typesPayment"
        :key="item.type"
        :value="item.type"
        :text-color="payment === item.type?'white':item.color"
        :color="item.color"
        :outlined="payment !== item.type"
      >
        {{item.description}}
      </v-chip>
    </v-chip-group>
    <v-text-field
        v-if="payment === 'power'"
        placeholder="Максимальная мощность по договору"
        outlined
    >
    </v-text-field>
    <v-select
      v-if="payment === 'cable'"
      placeholder="Сечение кабеля"
    >
    </v-select>

  </v-sheet>
</template>

<script>
export default {
  name: "stealOptions",
  data: () => {
    return {
      payment: 'power',
      typesPayment: [
        {
          type: 'power',
          description: 'По мощности',
          color: 'blue'
        },
        {
          type: 'cable',
          description: 'По сечению',
          color: 'red'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>