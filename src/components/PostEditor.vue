<template>
    <form @submit.prevent="save">
        <div class="form-group">
            <textarea class="form-input" v-model="text" style="width: 100%"></textarea>
        </div>
        <div class="form-actions">
            <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
            <button class="btn-blue">
              
                {{isUpdate ? 'Update post' : 'Submit post'}}
            </button>
        </div>
    </form>
</template>

<script>

export default{
  data () {
    return {
      text: this.post ? this.post.text : ''
    }
  },
  props: {
    threadId: {
      required: false
    },
    post: {
      type: Object,
      validator: obj => {
        const keyIsValid = typeof obj['.key'] === 'string'
        const textIsValid = typeof obj.text === 'string'
        const valid = keyIsValid && textIsValid
        if (!keyIsValid) {
          console.error('The post object must include a `.key` attribute')
        }
        if (!textIsValid) {
          console.error('The post object must include a `text` attribute')
        }
        return valid
      }
    }
  },
  computed: {
    isUpdate () {
      return !!this.post
    }
  },
  methods: {
    save () {
      this.persist().then(post => {
        this.$emit('save', {post})
      })
    },
    create () {
      const post = {
        text: this.text,
        threadId: this.threadId
      }
      this.text = ''
      this.$emit('save', {post})
      return this.$store.dispatch('createPost', post)
    },
    update () {
      const payload = {
        id: this.post['.key'],
        text: this.text
      }
      return this.$store.dispatch('updatePost', payload)
    },
    persist () {
      return (this.isUpdate ? this.update() : this.create())
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
</style>