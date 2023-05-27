<script setup>

</script>

<template>
    <div id="login">
        <h1>Login</h1>

        <div class="content">
            <div class="input-group">
                <label for="">Email</label>
                <input type="text" name="email" v-model="email" :autocomplete="false">
            </div>

            <div class="input-group">
                <label for="">Password</label>
                <input type="password" name="password" v-model="password" :autocomplete="false">
            </div>

            <button class="btn btn-primary">Login</button>
        </div>
    </div>
</template>
