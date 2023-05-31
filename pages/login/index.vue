<script setup>

const { $mainStore } = useNuxtApp()
const store = $mainStore

let email;
let password;

let connection = new Strophe.Connection("http://chat.beeda.com:5280/http-bind");


function login() {
    connection.connect(email, password, onConnect);
}

function onConnect(status) {
  if (status == Strophe.Status.CONNECTED) {
    
    localStorage.setItem('username', connection.jid);
    localStorage.setItem('pass', connection.pass);
    
    var iq = $iq({ type: "get" }).c("query", { xmlns: "jabber:iq:roster" });

    connection.sendIQ(iq, function (response) {
      var items = response.getElementsByTagName("item");

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var jid = item.getAttribute("jid");
        var name = item.getAttribute("name");

        
        // contacts.push({name, jid});
        store.setContact({name, jid});
    }
    console.log(store.getCotact);
    });

    navigateTo('/')
  }
//   console.log(connection.roster);
}
</script>

<template>
  <div id="login">
    <h1>Login</h1>

    <div class="content">
      <div class="input-group">
        <label for="">Email</label>
        <input type="text" name="email" v-model="email" :autocomplete="false" />
      </div>

      <div class="input-group">
        <label for="">Password</label>
        <input
          type="password"
          name="password"
          v-model="password"
          :autocomplete="false"
        />
      </div>

      <button class="btn btn-primary" @click="login">Login</button>
    </div>
  </div>
</template>
