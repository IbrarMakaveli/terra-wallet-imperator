<template>
  <CommonForm :submit="onSubmit">
    <h2 class="session-title">Create a new address</h2>
    <div class="session-main bottom-indent">
      <CommonFormGroup
        :error="$v.fieldName.$error"
        field-id="sign-up-name"
        field-label="Account Name"
      >
        <CommonField
          id="sign-up-name"
          v-model.trim="fieldName"
          v-focus
          type="text"
          placeholder="Must be at least 3 characters"
        />
        <CommonFormMessage
          v-if="$v.fieldName.$error && !$v.fieldName.required"
          name="Name"
          type="required"
        />
        <CommonFormMessage
          v-if="$v.fieldName.$error && !$v.fieldName.minLength"
          name="Name"
          type="minLength"
          min="3"
        />
        <CommonFormMessage
          v-if="$v.fieldName.$error && !$v.fieldName.nameExists"
          name="Name"
          type="custom"
          msg="already exists"
        />
      </CommonFormGroup>
    </div>
    <div class="session-footer">
      <CommonButton value="Next" type="submit" />
    </div>
  </CommonForm>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { getWalletIndex } from '~/common/keystore'

const nameExists = (value) => {
  const walletIndex = getWalletIndex()
  if (walletIndex.some((e) => e.name === value)) {
    return false
  } else {
    return true
  }
}

export default {
  name: `NameStep`,
  props: {
    name: {
      type: String,
      default: undefined,
    },
  },
  data: () => ({
    fieldName: undefined,
  }),
  mounted() {
    this.fieldName = this.name
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (this.$v.$error) return

      this.$emit('submit', this.fieldName)
    },
  },
  validations: () => ({
    fieldName: { required, minLength: minLength(3), nameExists },
  }),
}
</script>
