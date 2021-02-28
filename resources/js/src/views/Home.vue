<template>
  <div class="Home">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function () {
    return {
      title: "Home",
      description: "This is a home page",
    };
  },
};
</script>
