<template>
    <div>
        <CategoryListItem v-for="category in categories" :category="category" :key="category['.key']" />
    </div>
</template>

<script>
  import CategoryListItem from './CategoryListItem'
  export default {
    props: {
      categories: {
        required: true,
        type: Array
      }
    },
    components: {
      CategoryListItem
    }
  }
</script>

<style scoped>
</style>