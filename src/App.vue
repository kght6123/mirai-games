<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <Login />
</template>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import Login from "./components/Login.vue";
</script>

<script>
import { defineComponent, ref, watchEffect } from "vue";
// import { useAuthStore } from "@/stores/auth";
export default defineComponent({
  setup() {
    // const state = reactive<State>({
    //   todos: []
    // })
    // onMounted(async () => {
    //   state.todos = await fetchTodo()
    // })
    // const sortTodo = computed(() => state.todos.sort((a, b) => {
    //   return b.createdAt.getTime() - a.createdAt.getTime()
    // }))
    // const addTodo = (title: string) => {
    //   state.todos = [...state.todos, {
    //     id: uuid(),
    //     title,
    //     done: false,
    //     createdAt: new Date()
    //   }]
    // }
    // const removeTodo = (id: string) => {
    //   state.todos = state.todos.filter(todo => todo.id !== id)
    // }
    // const toggleTodo = (id: string) => {
    //   const todo = state.todos.find(todo => todo.id === id)
    //   if (!todo) return
    //   todo.done = !todo.done
    // }
    // watchEffect(() => console.log(state.todos))
    // return {
    //   sortTodo,
    //   addTodo,
    //   removeTodo,
    //   toggleTodo
    // }
  },
});

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
