<template>
  <div class="container">
    <nuxt />
  </div>
</template>

<style>
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  line-height: 1.6;
  font-size: 18px;
  background: #efefef;
}

* {
  box-sizing: border-box;
}

a {
  color: #0070f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  display: block;
}

.container {
  max-width: 36rem;
  min-height: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 3rem;
  border-radius: 1rem;
  /* box-shadow: 7px 7px 15px rgba(55, 84, 170, 0.15),
  -7px -7px 20px rgba(255, 255, 255, 1), 0px 0px 4px rgba(255, 255, 255, 0.2); */
}
</style>
