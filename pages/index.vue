<script setup>


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

        </div>

        <div class="user-chat">
            <div class="user-info">
                <img src="/user.png" alt="">
                <p>User Name</p>
            </div>

            <div class="chat-panel">

            </div>

            <div class="chat-action">
                <input type="text" placeholder="Enter Message">
                <button class="btn">Send</button>
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