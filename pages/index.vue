<script setup>


</script>

<template>
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

    </div>

    <div class="user-chat">
        <input v-model="msg" type="text">
        <button @click="sendMsg">Send</button>
    </div>
</template>

<style lang="scss">
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
</style>