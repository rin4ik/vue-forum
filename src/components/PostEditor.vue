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
      const postId = 'greatPost' + Math.random()
      const post = {
        text: this.text,
        publishetAt: Math.floor(Date.now() / 1000),
        threadId: this.threadId,
        userId: 'u4r8XCziZEWEXsj2UIKNHBoDh0n2',
        '.key': postId
      }
      this.text = ''
      this.$emit('save', {post})
    }
  }
}
</script>

<style scoped>
</style>