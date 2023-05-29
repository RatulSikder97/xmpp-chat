<script setup>
import { storeToRefs } from 'pinia'
let un = localStorage.getItem('username')
let pass = localStorage.getItem('pass')
let connection = new Strophe.Connection("http://localhost:5280/http-bind");

const { $mainStore } = useNuxtApp();
const store = $mainStore;

if (!un || !pass) {
    navigateTo('/login')
} else {
    connection.connect(un, pass, onConnect)
    console.log(connection.connected)
}

function onConnect(status) {
    if (status == Strophe.Status.CONNECTED) {

        connection.addHandler(handleMessage, null, 'message', 'chat');
        var iq = $iq({ type: "get" }).c("query", { xmlns: "jabber:iq:roster" });

        connection.sendIQ(iq, function (response) {
            var items = response.getElementsByTagName("item");

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var jid = item.getAttribute("jid");
                var name = item.getAttribute("name");


                // contacts.push({name, jid});
                store.setContact({ name, jid, isActive: i==0 });
            }
        });
        console.log(store.getCotact);
    }
}

let message;
let activeReciever  = reactive({ jid : '', name: ''});
function sendMsg() {

    if(message && store.getActiveContact.jid) {

        var msg = $msg({
            to: store.getActiveContact.jid,
            type: 'chat'
        }).c('body').t(message);
    
        connection.send(msg);
        store.setMsg({from: localStorage.getItem('username').split('/')[0], to: store.getActiveContact.jid.split('/')[0], message: message})
    }
}

function handleMessage(message) {
    var from = message.getAttribute('from');
    var body = message.getElementsByTagName('body')[0];

    if (body) {
        var messageText = Strophe.getText(body);
        console.log('Received message from ' + from + ': ' + messageText);

        store.setMsg({from, to: localStorage.getItem('username').split('/')[0], message: messageText})
    }

    // Return true to keep the handler active and continue receiving messages
    return true;
}


function makeActive(d) {
    store.setActive(d.jid)
}

</script>

<template>
    <div id="chat-panel">
        <div class="sidebar">
            <h1>CA</h1>

            <div class="options">
                <button class="btn">
                    <img src="/user.png" alt="" srcset="">
                </button>

                <button class="btn active">
                    <img src="/message.png" alt="" srcset="">
                </button>

                <button class="btn">
                    <img src="/group.png" alt="" srcset="">
                </button>

                <button class="btn">
                    <img src="/contact.png" alt="" srcset="">
                </button>
            </div>
        </div>

        <div class="chat-bar">
            <li v-for="(d, i) in store.getCotact" :key="i" :class="{active: d.isActive}" @click="makeActive(d)">
                <img src="/user.png" alt="">
                <p>{{ d.name }}</p>
            </li>
        </div>

        <div class="user-chat">
            <div class="user-info">
                <img src="/user.png" alt="">
                <p>{{ store.getActiveContact }}</p>
            </div>

            <div class="chat-panel">

            </div>

            <div class="chat-action">
                <input type="text" v-model="message" placeholder="Enter Message">
                <button class="btn" @click="sendMsg()">Send</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#chat-panel {
    display: flex;
}

.sidebar {
    padding: 20px 0;
    background: #fff;
    box-shadow: 0 2px 4px rgba(15, 34, 58, .12);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    max-width: 75px;
    min-height: 570px;
    min-width: 75px;
    z-index: 9;

    .options {
        width: 100%;
        text-align: center;
        margin-top: 100px;
        padding: 10px;
    }

    button {
        padding: 0;
        width: 100%;
        margin-bottom: 10px;
        padding: 10px;
        background-color: #fff;

        &.active {
            background-color: #4f78ff90;
        }

        img {
            display: block;
            width: 100%;
        }
    }
}

.chat-bar {
    max-width: 320px;
    min-width: 320px;
    background-color: #f5f7fb;
    height: 100vh;


    li {
        padding: 5px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        background-color: #ccc;
        width: 85%;
        margin: 10px auto;
        border-radius: 5px;
        cursor: pointer;

        &.active {
            background-color: #4f77ff90;
        }
    }

    img {
        background-color: #ccc;
        height: 45px;
        width: 45px;
        padding: 10px;
        border-radius: 50%;
    }

    p {
        margin-left: 15px;
    }
}

.user-chat {
    width: 100%;
    position: relative;

    .user-info {
        padding: 20px;
        background: #fff;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;

        img {
            background-color: #ccc;
            height: 45px;
            width: 45px;
            padding: 10px;
            border-radius: 50%;
        }

        p {
            margin-left: 15px;
        }
    }

    .chat-action {
        width: 100%;
        position: absolute;
        bottom: 0;
        padding: 20px;
        background: #fff;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;


        input {
            display: block;
            width: 100%;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ccc;
            margin-right: 20px;

            &:focus {
                border-color: #ccc;
                outline: none;
            }
        }
    }
}
</style>