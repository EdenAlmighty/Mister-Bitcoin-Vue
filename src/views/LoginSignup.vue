<template>
  <!-- <h2>Login</h2> -->

  <button v-if="!loggedInUser" @click="isLogin = !isLogin" class="btn">New account</button>
  <form v-if="!loggedInUser && isLogin" @submit.prevent="handleSubmit" class="contact-edit">
    <input v-model="creds.username" type="text" placeholder="admin " />
    <input v-model="creds.password" type="password" placeholder="admin" />
    <button class="btn">Login</button>
  </form>
  <form v-else-if="!loggedInUser && !isLogin" @submit.prevent="handleSubmit" class="contact-edit">
    <input v-model="creds.username" type="text" placeholder="Username" />
    <input v-model="creds.fullname" type="text" placeholder="Fullname" />
    <input v-model="creds.password" type="password" placeholder="Password" />
    <button class="btn">signup</button>
  </form>

  <section v-else>
    <h4>Hi, {{ loggedInUser.fullname }}</h4>
    <button @click="handleLogout" class="btn">Logout</button>
  </section>
</template>

<script>
  import { showErrorMsg, showSuccessMsg } from '@/services/event-bus.service'
  import { mapActions } from 'vuex'

  export default {
    props: {
      loggedInUser: Object
    },
    data() {
      return {
        creds: { username: '', password: '', fullname: '' },
        isLogin: true
      }
    },
    methods: {
      ...mapActions(['login', 'logout', 'signup']),
      async handleSubmit() {
        try {
          this.isLogin ? await this.login(this.creds) : await this.signup(this.creds)
          showSuccessMsg('Login successful.')
        } catch (err) {
          showErrorMsg('Failed to login. Please check your credentials.')
          console.error('Error logging in:', err)
        }
        this.creds = { username: '', password: '', fullname: '' };
      },
      async handleLogout() {
        try {
          await this.logout()
          showSuccessMsg('Logout successful.')
        } catch (error) {
          showErrorMsg('Failed to logout.')
          console.error('Error logging out:', error)
        }
      }
    }
  }
</script>

<style></style>
