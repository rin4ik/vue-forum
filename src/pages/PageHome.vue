<template>
  <div>
    <h1>Welcome to the forum</h1>
    <ThreadList :threads="Object.values(threads)" />
  </div>
</template>

<script>
  import sourceData from '@/data'
  import ThreadList from '@/components/ThreadList'
  export default {
    components: { ThreadList },
    data () {
      return {
        threads: Object.values(sourceData.threads),
        posts: sourceData.posts,
        users: sourceData.users
      }
    }
  }
</script>
