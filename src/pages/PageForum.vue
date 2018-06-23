<template>
    <div>
        <div class="col-full push-top">
            <div class="forum-header">
                <div class="forum-details">
                    <h1>{{forum.name}}</h1>
                    <p class="text-lead">{{forum.description}}</p>
                </div>
                <router-link class="btn-red btn-small" :forum="forum" :to="{name: 'ThreadCreate', params: {forum: this.forum}}">Start a thread</router-link>
            </div>
        </div>

        <div class="col-full push-top">
            <ThreadList :threads="threads" />
        </div>

    </div>
</template>

<script>
import ThreadList from '@/components/ThreadList'

export default {
  components: {
    ThreadList
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    forum () {
      return this.$store.state.forums[this.id]
    },
    threads () {
      return Object.values(this.$store.state.threads)
        .filter(thread => thread.forumId === this.id)
    }
  }
}
</script> 
<style scoped>
</style>