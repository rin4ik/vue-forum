<template>
    <div v-if="asyncDataStatus_ready" class="col-full">
        <h1>
            {{category.name}}
        </h1>
        <CategoryListItem :category="category" />
    </div>
</template>

<script>
  import CategoryListItem from '@/components/CategoryListItem'
  import { mapActions } from 'vuex'
  import asyncDataStatus from '@/mixins/asyncDataStatus'
  
  export default {
    mixins: [asyncDataStatus],
    props: {
      id: {
        required: true,
        type: String
      }
    },
    components: {
      CategoryListItem
    },
    computed: {
      category () {
        return this.$store.state.categories[this.id]
      }
    },
    methods: {
      ...mapActions(['fetchCategory', 'fetchForums'])
    },
    created () {
      this.fetchCategory({id: this.id})
        .then(category => {
          this.fetchForums({ids: category.forums})
        })
        .then(() => {
          this.asyncDataStatus_fetched()
        })
    }
  }
</script>

<style scoped>
</style>