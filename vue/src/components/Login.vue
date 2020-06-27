<template>
  <div id="login">
    <div id="description">
      <h1>Login</h1>
      <p>
        By logging in you agree to the ridiculously long terms that you didn't
        bother to read.
      </p>
      <div>
        <!-- <h1 id="Bcaptcha">Captcha</h1> -->
        <p id="captcha"></p>
      </div>
    </div>
    <div id="form">
      <form @submit.prevent="login">
        <label for="userName">Your Name</label>
        <input
          type="text"
          id="userName"
          v-model="userName"
          placeholder="Donald Trump"
          autocomplete="off"
        />
        <label for="password">Password</label>&nbsp;
        <i class="fas" :class="[passwordIcon]" @click="hidePassword = !hidePassword"></i>
        <input :type="passwordType" id="password" v-model="password" placeholder="**********" />
        <label for="captcha">Captcha &nbsp</label>&nbsp;
        <input type="text" id="captcha" v-model="captchaPwd" placeholder="(Empty)" />
        <button type="submit">Log in</button>
      </form>
      <button @click="getUsrPwdAndCaptcha()">Get Captcha</button>
    </div>
  </div>
</template>
<script>
// import Index from "../pages/Index.vue";
import abcjs from "abcjs";
import { get } from "../utils/request";
import { getRandInt, abcSetter, abcGetter } from "../utils/utils";
let getTune = [];
export default {
  computed: {
    passwordType() {
      return this.hidePassword ? "password" : "text";
    },
    passwordIcon() {
      return this.hidePassword ? "fa-eye" : "fa-eye-slash";
    }
  },
  methods: {
    login() {
      if (
        this.userName === localStorage.getItem("userName") &&
        this.password === localStorage.getItem("passwd") &&
        this.captchaPwd === localStorage.getItem("captcha")
      ) {
        localStorage.setItem("token", "ImLogin");
        this.$router.push("/");
      } else alert("login failed");
    },
    async getUsrPwdAndCaptcha() {
      try {
        let rnd = getRandInt(3);
        let result = await get("/api/captcha", {
          params: {
            cap: rnd,
            ans: rnd,
            abc: rnd
          }
        });
        console.log(result);
        localStorage.setItem("userName", result.usr);
        localStorage.setItem("passwd", result.pwd);
        localStorage.setItem("captcha", result.ans);
        getTune = [result.tune, result.ans];
        abcSetter(result.abc);
        abcjs.renderAbc("captcha", `${getTune[1]}`, {});
        console.log(localStorage.getItem("captcha", result.ans));
      } catch (e) {
        console.log(e);
        alert("Cannot Get User and Password");
      }
    }
  },
  data() {
    return {
      userName: "",
      password: "",
      captchaPwd: "",
      hidePassword: true
    };
  }
};
</script>

<style scoped>
div#app {
  width: 100%;
  height: 100%;
}

div#app div#login {
  align-items: center;
  background-color: #e2e2e5;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

div#app div#login div#description {
  background-color: #ffffff;
  width: 280px;
  padding: 35px;
}

div#app div#login div#description,
div#app div#login div#description p {
  margin: 0;
}

div#app div#login div#description p {
  font-size: 0.8em;
  color: #95a5a6;
  margin-top: 10px;
}

div#app div#login div#form {
  background-color: #34495e;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #ecf0f1;
  width: 260px;
  padding: 35px;
}

div#app div#login div#form label,
div#app div#login div#form input {
  outline: none;
  width: 100%;
}

div#app div#login div#form label {
  color: #95a5a6;
  font-size: 0.8em;
}

div#app div#login div#form input {
  background-color: transparent;
  border: none;
  color: #ecf0f1;
  font-size: 1em;
  margin-bottom: 20px;
}

div#app div#login div#form ::placeholder {
  color: #ecf0f1;
  opacity: 1;
}

div#app div#login div#form button {
  background-color: #ffffff;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
  margin-top: 1em;
}

div#app div#login div#form button:hover {
  background-color: #eeeeee;
}

@media screen and (max-width: 600px) {
  div#app div#login {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }

  div#app div#login div#description {
    margin: 0 auto;
    max-width: 350px;
    width: 100%;
  }

  div#app div#login div#form {
    border-radius: unset;
    box-shadow: unset;
    width: 100%;
  }

  div#app div#login div#form form {
    margin: 0 auto;
    max-width: 280px;
    width: 100%;
  }
}
</style>

<style scoped>
#Bcaptcha {
  margin-top: 1em;
}
</style>
