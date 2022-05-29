<template>
  <div class="proposals">
    <h1>Wallet Statistics</h1>
    <div class="data-row">
      <div>
        <h4 class="icon">
          <img src="icon/wallet.png" />
          &ensp; Wallet value
        </h4>
        <p v-for="item in balance" :key="item.id" class="text-block">
          $ {{ lunaToFiat | bigFigureOrShortDecimals }}
        </p>
      </div>
      <div>
        <h4 class="icon">
          <img src="icon/tokens.png" />
          &ensp; LUNA price
        </h4>
        <p class="text-block">$ {{ lunaValue }}</p>
      </div>
      <div>
        <h4 class="icon">
          <img src="icon/apr.png" />
          &ensp; APR
        </h4>
        <!-- <p class="text-block">{{ lunaApr | bigFigureOrShortDecimals }} %</p> -->
        <p class="text-block">7 %</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { bigFigureOrShortDecimals } from '~/common/numbers'

export default {
  name: `Statsmain`,
  filters: {
    bigFigureOrShortDecimals,
  },
  props: {
    balance: {
      type: Array,
      default: () => [],
    },
  },
  fetch() {
    // console.log(this.balance)
  },
  computed: {
    ...mapState([`session`]),
    ...mapState(`data`, ['lunaApr', 'lunaValue', 'rewards']),
    lunaToFiat() {
      // console.log(this.balance)
      return this.balance[0].total * this.lunaValue
    },
  },
  mounted() {
    this.loadRewards()
    this.loadBlance(this.session.address)
    setInterval(() => {
      this.loadRewards(this.session.address)
    }, 10000)
  },
  methods: {
    loadRewards(address) {
      // this.$store.dispatch('data/getLunaValue')
      this.$store.dispatch('data/refreshPortfolio')
    },
    loadBlance(address) {
      // this.$store.dispatch('data/getLunaValue')
      this.$store.dispatch('data/getBalances', { address })
      this.$store.dispatch('data/getLunaValue')
    },
  },
}
</script>

<style scoped>
.icon {
  display: inline-flex;
  align-self: center;
}

.text-block {
  text-align: right;
}

.proposals {
  padding: 0 0 3rem;
}

.data-row {
  display: flex;
  justify-content: space-between;
}

.data-row div {
  font-size: 22px;
  color: var(--txt);
  padding: 1rem 1.5rem;
  width: 100%;
  white-space: nowrap;
  border-radius: var(--border-radius);
  background: var(--gray-1100);
}

.data-row > div {
  margin-right: 1rem;
}
.data-row div:last-child {
  margin-right: 0;
}
</style>
