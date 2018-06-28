<template>
    <div v-if="forum" class="col-full push-top">

          <h1>Create new thread in <i>{{forum.name}}</i></h1>

         <ThreadEditor @save="save" @cancel="cancel" />
      </div>
</template>
<script>
    import ThreadEditor from '@/components/ThreadEditor'
    import { mapActions } from 'vuex'
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
        ...mapActions(['createThread', 'fetchForum']),
        save ({title, text}) {
          this.createThread({
            forumId: this.forum['.key'],
            title,
            text
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
      },
      created () {
        this.fetchForum({id: this.forumId})
      }
    }
</script>