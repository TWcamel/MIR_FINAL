<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/userInfo">User Info</router-link>
    <a href="" @click.prevent="logout">Logout</a>
  </div>
</template>
<script>
export default {
  methods: {
    async logout() {
      localStorage.removeItem('token')
      this.$router.push('login')
      // this.$data.remove('servece_token')
    }
  }
}
</script>
