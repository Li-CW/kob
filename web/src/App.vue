<template>
  helloworld
</template>

<script>
import axios from "axios"
export default {
  name: "App",
  setup: () => {
    axios.get("http://127.0.0.1:3000/pk/getbotinfo/")
      .then((response) => {
        console.log(response);
      })
  }

}


</script>

<style>
body{
  background-image: url("./assets/background.png");
  background-size: cover;
}
</style>

