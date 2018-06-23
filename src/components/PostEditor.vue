<template>
    <form @submit.prevent="save">
        <div class="for-group">
            <textarea class="form-input" v-model="text"></textarea>
        </div>
        <div class="form-actions">
            <button class="btn-blue">
                Submit post
            </button>
        </div>
    </form>
</template>

<script>

export default{
  data () {
    return {
      text: ''
    }
  },
  props: {
    threadId: {
      required: true
    }
  },
  methods: {
    save () {
      const post = {
        text: this.text,
        threadId: this.threadId
      }
      this.text = ''
      this.$emit('save', {post})
      this.$store.dispatch('createPost', post)
    }
  }
}
</script>

<style scoped>
</style>