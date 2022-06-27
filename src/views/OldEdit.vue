<template>
  <div class="home">
    <button @click="loadReg(prev_id)">Предыдущий</button>
    <button @click="loadReg(next_id)">Следующий</button>
    <form v-if="isLoaded" @submit.prevent>
      <p>
        <label>Id записи</label>
        <input v-model="current_id" @change="loadReg(current_id)" type="text">
      </p>
      <OldEditForm
          v-for="pair in Object.entries(reg_data['courses'])"
          :oldname="pair[0]"
          :oldgroup="pair[1]"
          :courses="courses"
          :key="pair[0]"
          @done="getData"
      />
      <button @click="postData">Применить</button>
    </form>
  </div>
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
      courses: [],
      records: {}
    }
  },
  methods: {
    async loadReg(reg_id) {
      if (reg_id) {
        const response = await axios.get('http://localhost:5000/reg', {
          params: {
            reg_id: reg_id,
          }
        });
        this.prev_id = response.data['prev'] ? response.data['prev']['id'] : null;
        this.current_id = response.data['current']['id']
        this.next_id = response.data['next'] ? response.data['next']['id'] : null;
        this.reg_data = response.data['current'];
      } else {
        const response = await axios.get('http://localhost:5000/reg');
        this.prev_id = null;
        this.current_id = response.data['current']['id'];
        this.next_id = response.data['next'] ? response.data['next']['id'] : null;
        this.reg_data = response.data['current'];
      }
      this.isLoaded = true;
      this.records = {}
    },
    async loadCourses() {
      const response = await axios.get('http://localhost:5000/courses');
      this.courses = Array.from(response.data, (obj) => (
          {
            id: obj['id'],
            name: obj['name'],
            teachers: obj['teachers'],
            groups: Object.keys(obj['schedule'])
          }))
    },
    getData(data) {
      this.records[data[0]] = [data[1], data[2]]
      this.$forceUpdate()
    },
    async postData() {
      let data = {
        reg_id: this.current_id,
        records: Object.values(this.records)
      }
      await axios.post('http://localhost:5000/update', data)
    }
  },
  mounted() {
    this.loadReg()
    this.loadCourses()
  },
}
</script>
