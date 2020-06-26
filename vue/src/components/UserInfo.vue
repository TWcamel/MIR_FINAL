<template>
  <div>
    <h1>UserInfo</h1>
    <h3>User Name:</h3>
    <p>{{ userName }}</p>
     <h3>Captcha:</h3>
    <p>{{ captcha }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: localStorage.getItem('userName'),
      captcha: localStorage.getItem('captcha'),
    }
  }
}
</script>
