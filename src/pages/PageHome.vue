<template>
  <div v-if="asyncDataStatus_ready" class="push-top">
    <h1>Welcome to the forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import CategoryList from '@/components/CategoryList'
  import asyncDataStatus from '@/mixins/asyncDataStatus'
  export default {
    mixins: [asyncDataStatus],
    components: { CategoryList },
    computed: {
      categories () {
        return Object.values(this.$store.state.categories)
      }
    },
    methods: {
      ...mapActions(['fetchAllCategories', 'fetchForums'])
    },
    created () {
      this.fetchAllCategories()
        .then(categories => Promise.all(categories.map(category => this.fetchForums({ids: Object.keys(category.forums)}))))
        .then(() => {
          this.asyncDataStatus_fetched()
        })
    }
  }
</script>
