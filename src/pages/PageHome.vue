<template>
  <div>
    <h1>Welcome to the forum</h1>
    <ForumList :forums="Object.values(forums)" />
  </div>
</template>

<script>
  import sourceData from '@/data'
  import ForumList from '@/components/ForumList'
  export default {
    components: { ForumList },
    data () {
      return {
        forums: Object.values(sourceData.forums),
        posts: sourceData.posts,
        users: sourceData.users
      }
    }
  }
</script>
