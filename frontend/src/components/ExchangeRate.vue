<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
    <h1 class="text-2xl font-bold mb-4">
      Periksa Nilai Kurs
    </h1>

    <div class="mb-4">
      <label class="block text-gray-700">Dari:</label>
      <select 
        v-model="from"
        class="w-full px-3 py-2 border rounded">
        <option 
          v-for="(name, code) in currencies"
          :key="code"
          :value="code">
          {{ code }} - {{ name }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700">Ke:</label>
      <select 
        v-model="to"
        class="w-full px-3 py-2 border rounded">
        <option 
          v-for="(name, code) in currencies"
          :key="code"
          :value="code">
          {{ code }} - {{ name }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700">Nominal</label>
      <input 
        v-model.number="amount"
        type="number" 
        class="w-full px-3 py-2 border rounded"
        placeholder="IDR">
    </div>

    <button 
      @click="getRate"
      class="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800">
      Get Rate
    </button>

    <div class="mt-4 text-lg" v-if="result">
      💱 {{ amount }} {{ from }} = <strong>{{ result }}</strong> {{ to }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ExchangeRate',
  data() {
    return {
      from: 'USD',
      to: 'IDR',
      amount: 1,
      result: null,
      currencies: {}
    }
  },
  mounted() {
    this.fetchCurrencies()
  },
  methods: {
    async fetchCurrencies() {
      try {
        const response = await axios.get('http://localhost:3000/api/list');
        this.currencies = response.data.currencies;
      } catch (error) {
        alert('Gagal mengambil daftar mata uang.');
        console.error(error);
      }
    },
    async getRate() {
      try {
        const response = await axios.get(`http://localhost:3000/api/rate`, {
          params: {
            from: this.from,
            to: this.to,
            amount: this.amount
          }
        });
        this.result = response.data.result;
      } catch (error) {
        alert('Gagal mengambil data.');
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
</style>