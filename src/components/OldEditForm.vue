<template>
  <p>
    <label>Название курса</label>
    <input :value="oldname" type="text">
    <label>Номер группы</label>
    <input :value="oldgroup" type="text">
  </p>
  <p>
    <label>Новое название</label>
    <select v-model="newname" @change="updateGroups">
      <option v-for="course in courses" v-bind:value="course['id']" v-bind:key="course['id']">
        {{ course['name'] }} ({{ course['teachers'].join(', ') }})
      </option>
    </select>
    <label>Новый номер группы</label>
    <select v-model="newgroup">
      <option v-for="group in groups" v-bind:value="group" v-bind:key="group">
        {{ group }}
      </option>
    </select>
    <button @click="submitData()">Применить</button>
  </p>

</template>

<script>
export default {
  name: 'OldEditForm',
  props: {
    oldname: {
      type: String,
      required: true
    },
    oldgroup: {
      type: String,
      required: true
    },
    courses: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      groups: [],
      newname: '',
      newgroup: '',
    }
  },
  methods: {
    updateGroups() {
      this.groups = this.courses.find(item => item.id == this.newname)['groups']
      // this.$emit('course_id', event.target.value)
    },
    submitData () {
      if (this.newname && this.newgroup) {
        this.$emit('done', [this.oldname, this.newname, this.newgroup])
      }
      else return
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
