<template lang="html">
  <nav class="navbar navbar-expand-lg navbar-primary bg-primary mb-4">
    <a class="navbar-brand text-light" href="#">SomeLogo</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link text-light" :to="{ name: 'MainPage' }">Home</router-link>
        </li>
        <li class="nav-item">
          <!-- PARAMS POSLE DODAJ -->
          <router-link class="nav-link text-light" :to="{ name: 'Statistics' }">Statistics</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav"
}
</script>
