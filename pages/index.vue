<script setup>
import { storeToRefs } from 'pinia'
let un = localStorage.getItem('username')
let pass = localStorage.getItem('pass')
let connection = new Strophe.Connection("http://chat.beeda.com:5280/http-bind");
let loggedInUser = un.split('/')[0];

const { $mainStore } = useNuxtApp();
const store = $mainStore;

if (!un || !pass) {
    navigateTo('/login')
} else {
    connection.connect(un, pass, onConnect)
}

let activeJid = reactive({ jid: "" })

function onConnect(status) {
    if (status == Strophe.Status.CONNECTED) {
        let iq = $iq({ type: "get" }).c("query", { xmlns: "jabber:iq:roster" });

        connection.sendIQ(iq, function (response) {
            let items = response.getElementsByTagName("item");

            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let jid = item.getAttribute("jid");
                let name = item.getAttribute("name");


                // contacts.push({name, jid});
                if (i == 0) {
                    activeJid.jid = jid;
                }
                store.setContact({ name, jid, isActive: i == 0 });
            }
        });

        connection.addHandler(onMessage, null, 'message', null, null, null);

    }
}

let message = ''
let activeReciever = reactive({ jid: '', name: '' });
function sendMsg() {
    console.log(message);

    if (message && store.getActiveContact.jid) {

//         var m = $msg({
//     to: $('#to').get(0).value,
//     from: $('#jid').get(0).value,
//     type: 'chat'
//   }).c("body").t(msg);
//   connection.send(m);
        let msg = $msg({
            to: store.getActiveContact.jid,
            from: un,
            type: 'chat'
        }).c('body').t(message);

       
        message = '';
        connection.send(msg);
        store.setMsg({ from: localStorage.getItem('username').split('/')[0], to: store.getActiveContact.jid.split('/')[0], message: message })
    }
}

function onMessage(msg) {
    let to = msg.getAttribute('to');
    let from = msg.getAttribute('from');
    let type = msg.getAttribute('type');
    let elems = msg.getElementsByTagName('body');

    if (type == "chat" && elems.length > 0) {
        let body = elems[0];
        log('CHAT: I got a message from ' + from + ': ' + Strophe.getText(body));
    }
    // we must return true to keep the handler alive.
    // returning false would remove it after it finishes.
    return true;
}

function handleMessage(message) {
    let from = message.getAttribute('from');
    let body = message.getElementsByTagName('body')[0];

    let attachments = message.getElementsByTagName('attachment');

    console.log(attachments);
    if (attachments.length > 0) {
        let attachment = attachments[0];
        let contentType = attachment.getAttribute('content-type');
        let body = attachment.getElementsByTagName('body')[0].textContent;
        console.log(body);

    }

    if (body) {
        let messageText = Strophe.getText(body);
        console.log('Received message from ' + from + ': ' + messageText);

        store.setMsg({ from: from.split('/')[0], to: localStorage.getItem('username').split('/')[0], message: messageText })
    }

    // Return true to keep the handler active and continue receiving messages
    return true;
}
function sendFile(event) {
    let file = event.target.files[0];

    // Read the file as binary data
    let reader = new FileReader();
    reader.onloadend = function () {
        let imageData = new Uint8Array(reader.result);

        // Create the message with the image data
        let message = $msg({
            to: store.getActiveContact.jid,
            type: 'chat'
        });

        let attachment = $build('attachment', {
            xmlns: 'urn:xmpp:attachment',
            'content-type': file.type
        });

        let body = $build('body').t(btoa(String.fromCharCode.apply(null, imageData)));
        attachment.cnode(body.tree());

        message.cnode(attachment.tree());

        // Send the message
        connection.send(message.tree());
    };

    reader.readAsArrayBuffer(file);
}


function makeActive(d) {
    store.setActive(d.jid)
    activeJid.jid = d.jid;
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
            <li v-for="(d, i) in store.getCotact" :key="i" :class="{ active: d.isActive }" @click="makeActive(d)">
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
                <div class="chat-text" v-for="(d, i) in store.getMessageByActiveUser(activeJid.jid)" :key="i"
                    :class="{ received: d.to == loggedInUser }">
                    {{ d.message }}
                </div>
            </div>

            <div class="chat-action">
                <input type="text" v-model="message" placeholder="Enter Message">
                <input type="file" class="btn" style="width: 160px" name="" id="" @change="sendFile($event)">
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

.chat-panel {
    padding: 20px;

    .chat-text {
        padding: 10px;
        background-color: #4f77ff90;
        border-radius: 10px;
        margin-top: 10px;
        margin-left: auto;
        max-width: 75%;
        width: fit-content;

        &.received {
            background-color: #fff;
            margin-left: unset;
        }
    }
}
</style>