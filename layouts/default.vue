<template>
  <div>
    <div>
      <navbar />
      <sidebar />
    </div>
    <main>
      <transition name="fade">
        <nuxt />
      </transition>
    </main>
  </div>
</template>

<script>
import Navbar from '~/components/Layout/Navbar/Navbar'
import Sidebar from '~/components/Layout/Sidebar/Sidebar'
export default {
  components: { Sidebar, Navbar },
}
</script>

<style>
main {
  display: flex;
  min-height: 100vh;
  background-color: #f5f1f1;
  flex-direction: column;
  flex: 1 0 auto;
  padding-top: 5rem;
  padding-left: 13.5rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
  transition-duration: 1.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media only screen and (max-width: 992px) {
  main {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
