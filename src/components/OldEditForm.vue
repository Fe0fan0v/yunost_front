<template>
  <fieldset class="uk-fieldset">
    <div class="uk-card uk-card-body">
      <h4 class="uk-card-title">{{ oldname }} - группа {{ oldgroup }}</h4>
      <div>
        <label class="uk-form-label">Новое название</label>
        <select class="uk-select" v-model="newname" @change="updateGroups">
          <option v-for="course in courses" v-bind:value="course['id']" v-bind:key="course['id']">
            {{ course['name'] }} ({{ course['teachers'].join(', ') }})
          </option>
        </select>
        <label class="uk-form-label">Новый номер группы</label>
        <select class="uk-select" v-model="newgroup">
          <option v-for="group in groups" v-bind:value="group" v-bind:key="group">
            {{ group }}
          </option>
        </select>
        <div class="uk-margin">
          <button class="uk-button" @click="submitData()">Применить</button>
        </div>
      </div>
    </div>
  </fieldset>
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
    submitData() {
      if (this.newname && this.newgroup) {
        this.$emit('done', [this.oldname, this.newname, this.newgroup])
      } else return
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
