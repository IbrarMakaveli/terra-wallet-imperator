<template>
  <div id="proposal-description" class="proposal-description">
    <section
      v-if="proposal && proposal.description"
      class="description-container"
    >
      <h4>Description</h4>
      <div class="description">
        <pre>{{ proposal.description }}</pre>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: `ProposalDescription`,
  props: {
    proposal: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped>
h4 {
  font-size: var(--text-sm);
  padding-bottom: 1rem;
  color: var(--dim);
}

.proposal-description {
  padding: 2rem;
  margin: 2rem 0;
  width: 100%;
  border-radius: var(--border-radius);
  background: var(--gray-1200);
}

.description {
  white-space: pre-wrap;
  color: var(--txt);
  width: 100%;
  border-radius: var(--border-radius);
}

pre {
  font-family: 'Menlo', 'Consolas', monospace;
  border-radius: 0.25rem;
  background: var(--gray-1100);
  color: var(--gray-500);
  font-size: 14px;
  padding: 1rem;
  word-break: break-word;
  white-space: pre-wrap;
}

@media screen and (max-width: 1023px) {
  .description-content-container {
    flex-direction: column;
  }

  .proposal-description {
    display: block;
    word-break: break-word;
    text-align: justify;
  }

  .description {
    margin: 0;
  }
}
</style>
