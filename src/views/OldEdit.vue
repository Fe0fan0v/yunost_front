<template>
  <div class="uk-margin">
    <button class="uk-button uk-button-default uk-width-1-2" @click="loadReg(prev_id)" :disabled="!Boolean(prev_id)">
      Предыдущий
    </button>
    <button class="uk-button uk-button-default uk-width-1-2" @click="loadReg(next_id)" :disabled="!Boolean(next_id)">
      Следующий
    </button>
  </div>
  <form class="uk-form-stacked" v-if="isLoaded" @submit.prevent>
    <div class="uk-margin">

      <label class="uk-form-label">Id записи</label>
      <input class="uk-input" v-model="current_id" @change="loadReg(current_id)" type="text">
    </div>
    <OldEditForm
        v-for="pair in Object.entries(reg_data['courses'])"
        :oldname="pair[0]"
        :oldgroup="pair[1]"
        :courses-for-select="coursesForSelect"
        :group-lists="groupLists"
        :key="pair[0]"
        @done="getData"
    />
    <div class="uk-margin">
      <button class="uk-button uk-button-default uk-width-1-1" @click="postData">Применить</button>
    </div>
  </form>
</template>

<script>
import OldEditForm from '@/components/OldEditForm.vue'
import axios from "axios";

export default {
  name: 'OldEditView',
  components: {
    OldEditForm
  },
  data() {
    return {
      prev_id: null,
      current_id: 0,
      next_id: null,
      isLoaded: false,
      reg_data: {},
      records: {},
      coursesForSelect: [],
      groupLists: {}
    }
  },
  methods: {
    async loadReg(reg_id) {
      if (reg_id) {
        const response = await axios.get('https://priem.ddt-miass.ru/reg', {
          params: {
            reg_id: reg_id,
          }
        });
        if (response.data['nodata']) {
          return
        }
        this.prev_id = response.data['prev'] ? response.data['prev']['id'] : null;
        this.current_id = response.data['current']['id']
        this.next_id = response.data['next'] ? response.data['next']['id'] : null;
        this.reg_data = response.data['current'];
      } else {
        const response = await axios.get('https://priem.ddt-miass.ru/reg');
        if (response.data['nodata']) {
          return
        }
        this.prev_id = null;
        this.current_id = response.data['current']['id'];
        this.next_id = response.data['next'] ? response.data['next']['id'] : null;
        this.reg_data = response.data['current'];
      }
      this.isLoaded = true;
      this.records = {}
    },
    async loadCourses() {
      const response = await axios.get('https://priem.ddt-miass.ru/courses');
      this.coursesForSelect = Array.from(response.data, (obj) => (
          {
            id: obj['id'],
            text: obj['name'] + ' ' + obj['teachers'].join(', ')
          }))
      this.groupLists = Object.fromEntries(response.data.map((obj) => [obj['id'], Object.keys(obj['schedule'])]))
    },
    getData(data) {
      this.records[data[0]] = [data[1], data[2]]
      this.$forceUpdate()
    },
    async postData() {
      if (Object.keys(this.records).length < Object.keys(this.reg_data['courses']).length) {
        alert('Не все поля заполнены!')
        return
      }
      let data = {
        reg_id: this.current_id,
        records: Object.values(this.records)
      }
      await axios.post('https://priem.ddt-miass.ru/update', data)
          .then(function (response) {
            if (response.data['status'] == 'ok') {
              console.log('ok')
              location.href = '/convert'
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },
  mounted() {
    this.loadReg()
    this.loadCourses()
  },
}
</script>
