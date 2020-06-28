<template>
  <b-container fuild="sm">
    <b-row>
      <b-col>
        <div id="login">
          <div id="description">
            <h1>Login</h1>
            <p>
              By logging in you agree to the ridiculously long terms that you didn't
              bother to read. Aditionally, CAPTCHA for loggin-validation will be shown, just press
              <b
                style="font-size:16px"
              >Get CHAPTCHA</b> button below.
            </p>
            <div>
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
              <label for="captcha">CAPTCHA &nbsp</label>&nbsp;
              <input type="text" id="captcha" v-model="captchaPwd" placeholder="(Empty)" />
              <b-button pill variant="outline-secondary" type="submit">Log in</b-button>
              <b-button pill variant="outline-secondary" @click="getUsrPwdAndCaptcha()">Get CAPTCHA</b-button>
            </form>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-modal ref="logginModal" hide-footer title="Welcome!">
      <div class="d-block text-center">
        <h3>About this website</h3>
      </div>
      <p
        class="mt-4"
      >The verification code which named is CAPTCHA (Completely Automated Public Turing test to tell Computers and Humans Apart) is to deny the malicious registration of the registration robot designed by the software, and then generate a large number of spam users (zombie users) and the process of spam comment information input verification code.</p>
      <p>In fact, the verification code combined with the number and alphabet have been cracked in these few years. So, we design a website with a new verification code by a music note. This website can show the complete the music sheet of the verification code, get the training result to train the model with a music dataset, and the analyzer upload the files that you want to analyze which can adjust the parameters by yourself.</p>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModalMethod">Close</b-button>
    </b-modal>
  </b-container>
</template>
<script>
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
  mounted: function() {
    this.toggleModalMethod(); //method1 will execute at pageload
  },
  methods: {
    toggleModalMethod: function() {
      this.$refs["logginModal"].show();
    },
    hideModalMethod() {
      this.$refs["logginModal"].hide();
    },
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
  background-color: #979797;
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
p {
  text-align: justify;
}
</style>
