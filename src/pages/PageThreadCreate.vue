<template>
    <div class="col-full push-top">

          <h1>Create new thread in <i>{{forum.name}}</i></h1>

         <ThreadEditor @save="save" @cancel="cancel" />
      </div>
</template>
<script>
    import ThreadEditor from '@/components/ThreadEditor'
    export default {
      props: {
        forumId: {
          type: String,
          required: true
        }
      },
      components: {
        ThreadEditor
      },
      methods: {
        save ({title, content}) {
          this.$store.dispatch('createThread', {
            forumId: this.forum['.key'],
            title,
            content
          }).then(thread => {
            this.$router.push({name: 'ThreadShow', params: {id: thread['.key']}})
          })
        },
        cancel () {
          this.$router.push({name: 'Forum', params: {id: this.forum['.key']}})
        }
      },
      computed: {
        forum () {
          return this.$store.state.forums[this.forumId]
        }
      }
    }
</script>