<template>
  <div>
    <h1>LUNA Earn</h1>
    <p>
      Terra Earn displays the various methods to utilize your LUNA assets to
      (potentially) earn additional income. <br />You can either lock your LUNA
      in liquidity pools, or use your LUNA to secure the Terra network.
    </p>
    <br />
    <p>
      For more information about liquidity pools,
      <a :href="urlMeduim">click here</a>. For more information about staking,
      <a :href="urlDoc">click here</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: `PageSwap`,
  data: () => ({
    urlMeduim: 'https://imperator.co',
    urlDoc: 'https://imperator.co/',
  }),
}
</script>

<style>
.paragraph {
  margin-bottom: 15px;
  letter-spacing: 0.32px;
}
</style>
