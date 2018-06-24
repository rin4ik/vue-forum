<template>
    <div v-if="post && user" class="post">
        <div class="user-info">
            <a href="#" class="user-name">
                {{ user.name }}</a>
            <a href="#">
                <img class="avatar-large" :src="user.avatar" alt="">
            </a>
            <p class="desktop-only text-small">
              {{userThreadsCount}} {{userThreadsCount === 1 ? 'thread' : 'threads'}}
            </p>
            <p class="desktop-only text-small">
                {{userPostsCount}} {{userPostsCount === 1 ? 'post' : 'posts'}}
            </p>
            
        </div>

        <div class="post-content">
            <div v-if="!editing">
                {{ post.text }}
            </div>
            <div v-else>
              <PostEditor 
                :post="post" 
                @save="editing = false" 
                @cancel="editing = false"
              />
            </div>
            
        </div>
        <a @click.prevent="editing = true" v-if="!editing" href="#" style="margin-left: auto;" class="link-unstyled" title="Make a change"><i class="fa fa-pencil"></i></a>
        <div class="post-date text-faded">
            <div v-if="post.edited" class="edition-info">edited</div>
            <AppDate :timestamp="post.publishedAt" />
        </div>
    </div>
</template>
<script>
  import PostEditor from './PostEditor'
  export default {
    props: {
      post: {
        required: true,
        type: Object
      }
    },
    components: {
      PostEditor
    },
    data () {
      return {
        editing: false
      }
    },
    computed: {
      user () {
        return this.$store.state.users[this.post.userId]
      },
      userPostsCount () {
        return this.$store.getters.userPostsCount(this.post.userId)
      },
      userThreadsCount () {
        return this.$store.getters.userThreadsCount(this.post.userId)
      }
    }
  }
</script>

<style scoped>
</style>