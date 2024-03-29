<template>
  <div class="table-container">
    <CommonStatsmain :balance="balances" />
    <div class="header-container">
      <h1>Your Balances</h1>
      <div>
        <CommonButton
          id="claim-button"
          :disabled="!readyToWithdraw || !balancesLoaded"
          value="Claim Rewards"
          @click.native="readyToWithdraw && openClaimModal()"
        />
        <CommonButton
          id="refresh-button"
          value="Refresh"
          @click.native="refreshData()"
        />
      </div>
    </div>
    <CommonTableContainer
      :length="sortedBalances.length"
      :columns="properties"
      :sort="sort"
      :show-row-count="false"
      :loaded="balancesLoaded"
    >
      <PortfolioBalanceRow
        v-for="balance in sortedBalances"
        :key="balance.id"
        :balances="balances"
        :balance="balance"
        :total-rewards-per-denom="totalRewardsPerDenom"
        :send="true"
        @open-send-modal="openSendModal(balance.denom)"
      />
    </CommonTableContainer>
    <LazyModalSend ref="SendModal" :denoms="getAllDenoms" />
    <LazyModalClaim
      ref="ClaimModal"
      :address="session.address"
      :rewards="rewards"
      :balances="balances"
    />
  </div>
</template>
<script>
import { orderBy } from 'lodash'
import { mapState } from 'vuex'
import network from '~/network'

export default {
  name: `Balances`,
  data: () => ({
    sort: {
      property: `Available`,
      order: `desc`,
    },
  }),
  computed: {
    ...mapState([`session`]),
    ...mapState(`data`, ['balances', 'balancesLoaded', 'rewards']),
    readyToWithdraw() {
      return Boolean(
        Object.values(this.totalRewardsPerDenom).find((value) => value > 0)
      )
    },
    getAllDenoms() {
      if (this.balances.length > 0) {
        const balances = this.balances
        return balances.map(({ denom }) => denom)
      } else {
        return [network.stakingDenom]
      }
    },
    totalRewardsPerDenom() {
      return this.rewards.reduce((all, reward) => {
        return {
          ...all,
          [reward.denom]: parseFloat(reward.amount) + (all[reward.denom] || 0),
        }
      }, {})
    },
    sortedBalances() {
      const orderedBalances = orderBy(
        this.balances.map((balance) => ({
          ...balance,
          rewards: this.totalRewardsPerDenom[balance.denom]
            ? this.totalRewardsPerDenom[balance.denom].amount
            : 0,
        })),
        [this.sort.property],
        [this.sort.order]
      )
      return orderedBalances
    },
    properties() {
      return [
        {
          title: `Total`,
          value: `total`,
        },
        {
          title: `Rewards`,
          value: `rewards`,
        },
        {
          title: `Available`,
          value: `available`,
        },
      ]
    },
  },
  methods: {
    openSendModal(denom = undefined) {
      this.$refs.SendModal.open(denom)
    },
    openClaimModal() {
      this.$refs.ClaimModal.open()
    },
    refreshData() {
      this.$store.dispatch('data/refresh')
      this.$toast.success('Data has been refreshed!', {
        position: 'top-right',
        timeout: 2000,
        closeOnClick: true,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
      })
    },
  },
}
</script>
<style scoped>
h1 {
  padding-bottom: 0;
}

.table-container {
  width: 100%;
  padding: 3rem 1.5rem;
  margin: 0 auto;
}

.header-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 0 2rem;
  width: 100%;
}

.header-container > div {
  position: absolute;
  right: calc(1% + 10px);
  justify-content: space-between;
}

.icon-button-container {
  margin-right: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 3rem;
}

.icon-button-container span {
  display: block;
  font-size: var(--text-xs);
  text-align: center;
  color: var(--dim);
  padding-top: 2px;
}

.icon-button {
  border-radius: 50%;
  background: var(--primary);
  border: none;
  outline: none;
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.25s ease;
}

.icon-button:hover {
  background: var(--primary-hover);
  cursor: pointer;
}

.icon-button i {
  font-size: 14px;
  color: var(--white);
  font-weight: 900;
}

@media screen and (max-width: 1023px) {
  .table-container {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

@media screen and (max-width: 667px) {
  .table-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
