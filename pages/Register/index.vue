<script setup>
 // Set up connection parameters
var server = "localhost";
var username = "ratul";
var password = "1234";

// Create a Strophe connection object
var connection = new Strophe.Connection("http://localhost:5280/http-bind");

</script>

<template>
    <div>
        <!-- <input name="phone" /> -->
        <!-- <input name="password" /> -->
        <button @click="increment">+</button>
        <button @click="state.count--">-</button>

    </div>
</template>