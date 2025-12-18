<template>
  <section class="home-page">
    <SubnetCalculator />
  </section>
</template>

<script setup lang="ts">
import SubnetCalculator from '@/components/SubnetCalculator.vue';
</script>

<style scoped>
.home-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
