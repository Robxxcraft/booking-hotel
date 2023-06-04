<template>
  <div class="position-absolute w-screen h-screen flex flex-col items-center justify-center">
    <div class="font-bold text-5xl">Country</div>
    <div class="mt-8 w-full max-w-lg">
      <div class="relative">
        <input @focusin="searchIcon" @focusout="searchIcon" v-model="country" id="search" type="text" class="w-full bg-white shadow px-6 py-3 border-2 border-gray-200 transition ease-in delay-100 rounded-md focus:outline-none" placeholder="Tap any country name" :autocomplete="false">
        <svg id="magnify" class="text-gray-200 absolute right-6 transition ease-in delay-100" style="bottom: 26%;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </div>
      <div class="mt-5 rounded min-h-200">
        <template v-if="!notFound">
          <div class="shadow flex flex-col">
            <template v-for="(res, index) in result" :key="index">
              <router-link :to="{name: 'detailCountry', params: { country: res.name.common.toLowerCase() }}" class="country-item font-semibold px-6 py-2 cursor-pointer">{{res.name.common}}</router-link>
            </template>
          </div>
        </template>
        <template v-else>
          <div class="shadow flex flex-col">
            <div class="text-red-500 px-6 py-3">Data Not Found</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, watch } from 'vue'
export default {
  setup() {
    const country = ref(null)
    const result = ref([])
    const notFound = ref(null)

    const debounce = (fn, delay)=>{
      let timer;
      return function(...args){
        if (timer) {
          clearTimeout(timer)   
        }
        const context = this
        timer = setTimeout(()=>{
          fn.apply(context, args)
        }, delay)
      }
    }

    const getCountries = name => {
      if (country.value.length > 0) {
          axios.get(`https://restcountries.com/v3.1/name/${name}`).then(res => {
          notFound.value = false
          result.value = res.data.sort((a, b) => {
            if (a.name.common.includes(name) || a.name.common < b.name.common.includes(name) || b.name.common ) {
              return -1;
            }
          }).slice(0,5).sort((a, b) => {
            if (a.name.common < b.name.common ) {
              return -1;
            }
          })  
        }).catch(err => {
          if (err.response.status == 404) {
            notFound.value = true
          }
        })
      }
    }

    const searchCountry = debounce((val)=>{
      getCountries(val)
    }, 500)

    const searchIcon = () => {
      document.getElementById('search').classList.toggle('border-primary')
      document.getElementById('magnify').classList.toggle('text-primary')
    }

    watch(country, (newVal, oldVal)=>{
      if (newVal.length > 0) {
        searchCountry(newVal)
      } else if (newVal.length <= 0) {
        notFound.value = false
        result.value = []
      }
    })

    return { country, result, notFound, searchIcon }
  },
}

</script>

<style>
.country-item:hover {
  background-color: #f4f4f4;
}
.min-h-200 {
  min-height: 200px;
}
</style>