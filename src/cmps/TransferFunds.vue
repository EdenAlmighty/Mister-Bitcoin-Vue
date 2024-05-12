<template>
    <div>
      <h1>Transfer</h1>
      <form @submit.prevent="transferFunds">
        <label for="amount">Amount:</label>
        <input v-model.number="formData.amount" type="number" id="amount" required>
        <button type="submit">Transfer</button>
      </form>
    </div>
  </template>
  
  <script>
import { showErrorMsg, showSuccessMsg } from '@/services/event-bus.service'

  export default {
    data() {
      return {
        formData: {
          contactId: this.$route.params.contactId, 
          amount: null
        },
      }
    },
    methods: {
      async transferFunds() {
        try {
          console.log('formData: ', this.formData.contactId)
          await this.$store.dispatch('transferFunds', {
            contactId: this.formData.contactId, 
            funds: this.formData.amount
          })

          this.formData.amount = null
          this.errorMessage = ''
          showSuccessMsg('Transfer successful!')
        } catch (err) {

          showErrorMsg('Error transferring funds:', err)
        }
      }
    }
  }
  </script>
  
  <style>
  </style>
  