<template>
    <div>
        <nav>
            <ul class="nav-menu">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.nav-menu {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
}

.nav-menu li {
    margin: 0 10px;
}

.nav-menu li a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
}

.nav-menu li a:hover {
    color: #555;
}
</style>

<script>
export default {
  name: 'HomeComponent',
  // Your component's options go here
}
</script>


