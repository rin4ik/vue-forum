import Vue from 'vue'
import Vuex from 'vuex'
import { countObjectProperties } from '@/utils'
import firebase from 'firebase'
Vue.use(Vuex)
const makeAppendChildToParentMutation = ({parent, child}) =>
(state, {childId, parentId}) => {
  const resource = state[parent][parentId]
  if (!resource[child]) {
    Vue.set(resource, child, {})
  }
  Vue.set(resource[child], childId, childId)
}
export default new Vuex.Store({
  state: {
    categories: {},
    forums: {},
    threads: {},
    posts: {},
    users: {},
    authId: 'u4r8XCziZEWEXsj2UIKNHBoDh0n2'
  },
  getters: {
    authUser (state) {
      // return state.users[state.authId]
      return {}
    },
    userPostsCount: state => id => countObjectProperties(state.users[id].posts),
    userThreadsCount: state => id => countObjectProperties(state.users[id].threads),
    threadRepliesCount: state => id => countObjectProperties(state.threads[id].posts) - 1
  },
  actions: {
    createPost ({commit, state}, post) {
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)
      commit('setPost', {post, postId})
      commit('appendPostToThread', {parentId: post.threadId, childId: postId})
      commit('appendPostToUser', {parentId: post.userId, childId: postId})
      return Promise.resolve(state.posts[postId])
    },
    updatePost ({state, commit}, {id, text}) {
      return new Promise((resolve, reject) => {
        const post = state.posts[id]
        commit('setPost', {
          postId: id,
          post: {
            ...post,
            text,
            edited: {
              at: Math.floor(Date.now() / 1000),
              by: state.authId
            }
          }
        })
        resolve(post)
      })
    },
    updateThread ({state, commit, dispatch}, {title, text, id}) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[id]
        const newThread = {...thread, title}
        commit('setThread', {thread: newThread, threadId: id})
        dispatch('updatePost', {id: thread.firstPostId, text})
          .then(() => {
            resolve(newThread)
          })
      })
    },
    createThread ({commit, state, dispatch}, {text, title, forumId}) {
      return new Promise((resolve, reject) => {
        const threadId = 'greatThread' + Math.random()
        const userId = state.authId
        const publishedAt = Math.floor(Date.now() / 1000)
        const thread = {'.key': threadId, forumId, title, publishedAt, userId}
        commit('setThread', {threadId, thread})
        commit('appendThreadToForum', {parentId: forumId, childId: threadId})
        commit('appendThreadToUser', {parentId: userId, childId: threadId})

        dispatch('createPost', {text, threadId})
          .then(post => {
            commit('setThread', {threadId, thread: {...thread, firstPostId: post['.key']}})
          })
        resolve(state.threads[threadId])
      })
    },
    updateUser ({commit}, user) {
      commit('setUser', {userId: user['.key'], user})
    },
    fetchCategory ({dispatch}, {id}) {
      return dispatch('fetchItem', {resource: 'categories', id, emoji: '🙋'})
    },
    fetchForum ({dispatch}, {id}) {
      return dispatch('fetchItem', {resource: 'forums', id, emoji: '🙋'})
    },
    fetchThread ({dispatch}, {id}) {
      return dispatch('fetchItem', {resource: 'threads', id, emoji: '📄'})
    },

    fetchUser ({dispatch}, {id}) {
      return dispatch('fetchItem', {resource: 'users', id, emoji: '🙋'})
    },

    fetchPost ({dispatch}, {id}) {
      return dispatch('fetchItem', {resource: 'posts', id, emoji: '💬'})
    },
    fetchPosts ({dispatch}, {ids}) {
      return dispatch('fetchItems', {resource: 'posts', emoji: 'chat', ids})
    },
    fetchForums ({dispatch}, {ids}) {
      return dispatch('fetchItems', {resource: 'forums', emoji: 'chat', ids})
    },
    fetchThreads ({dispatch}, {ids}) {
      return dispatch('fetchItems', {resource: 'threads', emoji: 'chat', ids})
    },
    fetchCategories ({dispatch}, {ids}) {
      return dispatch('fetchItems', {resource: 'categories', emoji: 'chat', ids})
    },
    fetchUsers ({dispatch}, {ids}) {
      return dispatch('fetchItems', {resource: 'users', emoji: 'chat', ids})
    },
    fetchItem ({state, commit}, {id, emoji, resource}) {
      console.log('🔥‍', emoji, id)
      return new Promise((resolve, reject) => {
        firebase.database().ref(resource).child(id).once('value', snapshot => {
          commit('setItem', {resource, id: snapshot.key, item: snapshot.val()})
          resolve(state[resource][id])
        })
      })
    },
    fetchItems ({dispatch}, {ids, resource, emoji}) {
      ids = Array.isArray(ids) ? ids : Object.keys(ids)
      return Promise.all(ids.map(id => dispatch('fetchItem', {id, resource, emoji})))
    },
    fetchAllCategories ({state, commit}) {
      return new Promise((resolve, reject) => {
        firebase.database().ref('categories').once('value', snapshot => {
          const categoriesObject = snapshot.val()
          Object.keys(categoriesObject).forEach(categoryId => {
            console.log(categoryId)
            const category = categoriesObject[categoryId]
            commit('setItem', {resource: 'categories', id: categoryId, item: category})
          })
          resolve(Object.values(state.categories))
        })
      })
    }
  },
  mutations: {
    setItem (state, {item, id, resource}) {
      item['.key'] = id
      Vue.set(state[resource], id, item)
    },
    appendPostToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'posts'}),
    appendPostToUser: makeAppendChildToParentMutation({parent: 'users', child: 'posts'}),
    appendThreadToForum: makeAppendChildToParentMutation({parent: 'forums', child: 'threads'}),
    appendThreadToUser: makeAppendChildToParentMutation({parent: 'users', child: 'threads'})
  }
})
