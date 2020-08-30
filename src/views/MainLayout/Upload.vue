<template>
  <v-container>
    <v-row align="center">
      <v-col xs="12" sm="4">
        <v-file-input @change="getParser" v-model="file" placeholder="Выберете план график">
        </v-file-input>
      </v-col>
      <v-col xs="12" sm="2">
        <v-btn
            color="primary"
            class=""
            :disabled="!parser"
            @click="findCells">
          Определить столбцы
        </v-btn>
      </v-col>

    </v-row>
    <v-row>
      <v-col cols="12" class="text-start">
        Всего точек: {{ count }}
      </v-col>
    </v-row>
    <v-row align="stretch">
      <v-col
          v-for="i in cells"
          :key="i.title"
          cols="12"
          xs="12"
          sm="4"
          md="3"
      >
        <v-card>
          <v-card-subtitle class="text-start">{{ i.title }}</v-card-subtitle>
          <v-card-text>
            <v-text-field :success="!!i.col" :error="!i.col" label="Ячейка" v-model="i.col"></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-5" justify="end">
      <v-btn
          color="primary"
          :disabled="isEmptyCell"
          @click="parseFile">
        Сохранить точки
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import {Parser} from "@/ExcelParser";
import {http} from "../../../HttpClient";

export default {
  data: () => {
    return {
      count: '',
      parser: '',
      file: '',
      cells: [
        {
          title: 'Номер прибора учета',
          matching: ['Номер прибора учета'],
          col: '',
          name: 'numberDevice'
        },
        {
          title: 'Наименование потребителя',
          matching: ['Наименование потребителя'],
          col: '',
          name: 'name'
        },
        {
          title: 'РЭС',
          matching: ['РЭС'],
          col: '',
          name: 'area'
        },
        {
          title: 'Точка поставки',
          matching: ['Точка поставки'],
          col: '',
          name: 'pointNumber'
        },
        {
          title: 'Наименование объекта',
          matching: ['Наименование объекта'],
          col: '',
          name: 'objectDescription'
        },
        {
          title: 'Адрес объекта',
          matching: ['Адрес объекта'],
          col: '',
          name: 'address'
        },
        {
          title: 'Номер договора',
          matching: ['Номер договора'],
          col: '',
          name: 'contract'
        },
        {
          title: 'Дата проверки',
          matching: ['Дата проверки'],
          col: '',
          name: 'dateCheck'
        },
        {
          title: 'Email',
          matching: ['Email'],
          col: '',
          name: 'email'
        },
        {
          title: 'Дата последней проверки',
          matching: ['Дата последней проверки'],
          col: '',
          name: 'lastDateCheck'
        },
        {
          title: 'Номер абонента',
          matching: 'Номер абонента',
          col: '',
          name: 'numberContract'
        },
        {
          title: 'Телефон',
          matching: ['Телефон'],
          col: '',
          name: 'phone'
        },
        {
          title: 'Мощность',
          matching: ['Мощность'],
          col: '',
          name: 'power'
        }
      ]
    }
  },
  methods: {
    getParser: function () {
      const parser = new Parser();
      parser.setWorkbook(this.file);
      this.parser = parser;
    },
    findCells: function () {
      this.cells.forEach(function (item) {
        item.col = this.parser.findColumn(item.matching);
      }.bind(this));
      this.count = this.parser.getCount(this.cells[0].col);
    },
    //Todo переработать логику отправки точек на сервер
    parseFile: async function () {
      let arr = this.cells[0].col.split('');
      arr.shift();
      let i = parseInt(arr.join(''));
      let success = 0;
      for (i; i < this.count; i++) {
        let point;
        try {
          point = this.parser.nextPoint(this.cells, (i + 3));
          let res = await http.post('/point', point);
          if (res.status !== 201) {
            console.log(point + ' не сохранена');
          }
          success = success + 1;
        } catch (e) {
          console.log(e.message);
          console.log(point)
        }
      }
      console.log(success);
    }
    },
    computed: {
      isEmptyCell: function () {
        return (this.cells.filter(item => !item.col).length !== 0)
      }
    },
    name: "Upload"
  }
</script>

<style scoped>

</style>