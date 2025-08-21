<template>
<ul class="nav">
  <li class="nav-item">
    <router-link class="nav-link active" to="/"><button class="btn btn-sm btn-primary">Home</button></router-link>
  </li>
  <li class="nav-item">
    <router-link class="nav-link" to="/about"><button class="btn btn-sm btn-primary">About</button></router-link>
  </li>  
</ul>
<router-view />
</template>

<script>
export default{

}
</script>