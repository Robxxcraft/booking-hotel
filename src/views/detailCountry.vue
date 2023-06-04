<template>
    <div class="relative p-12 z-10">
      <div class="inline-block">
        <router-link to="/" class="flex bg-primary text-white p-3 rounded-lg">
          <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
          Back to Homepage
        </router-link>
      </div>
      <template v-if="country.name">
        <div class="mt-9 flex items-end">
          <div class="font-bold text-4xl me-3">{{ country.name.common }}</div>
          <template v-if="country.flags">
            <img class="w-8 h-7" :src="country.flags.svg" :alt="country.flags.alt">
          </template>
        </div>
      </template>
      <div class="mt-3 flex space-x-2">
        <template v-if="country.altSpellings">
          <div v-for="(spell, index) in country.altSpellings" :key="index" class="bg-secondary text-white px-3 py-1 rounded-2xl">{{spell}}</div>
        </template>
      </div>
      <div class="mt-6 flex space-x-5">
        <div class="width-card relative shadow-md border border-gray-50 p-6 mb-3">
          <div class="font-bold text-lg mb-1">LatLong</div>
          <template v-if="country.latlng">
            <div class="text-primary font-bold text-4xl">{{country.latlng.join(', ')}}</div>
          </template>
          <div class="absolute globe-svg" style="">
            <svg  width="204px" height="204px" viewBox="0 0 496 512" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M248 8C111.03 8 0 119.03 0 256C0 392.97 111.03 504 248 504C384.97 504 496 392.97 496 256C496 119.03 384.97 8 248 8ZM408 223.5V230.43C408 236.3 404.68 241.67 399.43 244.29L384.04 251.99C381.596 253.213 378.872 253.768 376.144 253.597C373.417 253.427 370.783 252.538 368.51 251.02L350.3 238.88C348.336 237.572 346.099 236.729 343.759 236.415C341.42 236.101 339.04 236.325 336.8 237.07L334.15 237.95C324.45 241.18 320.49 252.74 326.16 261.25L339.4 281.11C342.27 285.42 347.11 288.01 352.29 288.01H360.5C369.06 288.01 376 294.95 376 303.51V314.85C376 318.2 374.91 321.47 372.9 324.15L354.16 349.13C352.74 351.03 351.77 353.23 351.33 355.56L347.03 378.39C346.41 381.68 344.74 384.68 342.27 386.95C332.793 395.628 324.399 405.419 317.27 416.11L304.24 435.66C301.706 439.461 298.272 442.578 294.244 444.735C290.217 446.891 285.719 448.019 281.15 448.02C270.64 448.02 261.03 442.08 256.33 432.68C250.851 421.723 247.999 409.641 248 397.39V367.5C248 358.94 241.06 352 232.5 352H206.62C192.13 352 178.24 346.24 167.99 336C157.748 325.753 151.993 311.858 151.99 297.37V283.31C151.99 266.12 160.09 249.93 173.84 239.61L201.42 218.92C210.877 211.828 222.379 207.993 234.2 207.99H235.09C243.57 207.99 251.94 209.96 259.52 213.76L274.24 221.12C277.92 222.96 282.17 223.26 286.07 221.96L333.38 206.19C339.71 204.08 343.98 198.16 343.98 191.49C343.98 182.93 337.04 175.99 328.48 175.99H318.39C314.28 175.99 310.34 174.36 307.43 171.45L300.51 164.53C299.071 163.09 297.362 161.948 295.482 161.169C293.601 160.39 291.586 159.99 289.55 159.99H199.5C190.94 159.99 184 153.05 184 144.49V140.09C184 132.98 188.84 126.78 195.74 125.05L210.19 121.44C213.93 120.5 217.19 118.21 219.33 115L227.41 102.89C230.28 98.58 235.12 95.99 240.3 95.99H264.51C273.07 95.99 280.01 89.05 280.01 80.49V58.79C359.23 71.63 422.86 131.02 441.93 208H423.5C414.94 208 408 214.94 408 223.5Z" fill="black" fill-opacity="0.05"/>
            </svg>
            <div class="absolute w-60 h-60 z-10 bg-white" style="top: 58%;"></div>
          </div>
        </div>
        
        <div class="width-card shadow-md flex flex-col space-y-1 p-6 mb-3">
          <template v-if="country.capital">
            <div>Capital: <span class="font-bold">{{country.capital[0]}}</span></div>
          </template>
          <div>Region: <span class="font-bold">{{country.region}}</span></div>
          <div>Subregion: <span class="font-bold">{{country.subregion}}</span></div>
        </div>
      </div>
      <div class="mt-6 flex space-x-5">
        <div class="width-card relative">
          <div class="font-bold text-lg">Calling Code</div>
          <div class="text-primary font-bold text-4xl my-2">{{callingCode}}</div>
          <div class="font-bold pb-3"><span :onmouseover="hoverCountryWSCC" :onmouseleave="hoverCountryWSCC" class="cursor-pointer text-primary underline">{{countryWithSameCallingCode.length}} country</span> with this calling code</div>
          <template v-if="countryWithSameCallingCode">
            <div class="hover-card absolute rounded-lg p-3 text-white none" id="countryWSCC">
              <div v-for="(country, index) in countryWithSameCallingCode" :key="index">{{ country.name }}</div>
            </div>
          </template>
        </div>
        
        <div class="relative">
          <div class="font-bold text-lg">Currency</div>
          <div class="text-primary font-bold text-4xl my-2">{{currency}}</div>
          <div class="font-bold pb-3"><span :onmouseover="hoverCountryWSC" :onmouseleave="hoverCountryWSC" class="cursor-pointer text-primary underline">{{countryWithSameCurrency.length}} country</span> with this currency</div>
          <template v-if="countryWithSameCurrency">
            <div class="hover-card absolute rounded-lg p-3 text-white none" id="countryWSC">
              <div v-for="(country, index) in countryWithSameCurrency" :key="index">{{ country.name.common }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const country = ref({})
    const countryName = ref(route.params.country)
    const callingCode = computed(()=>{
      if (country.value.idd) {
        const callingCodeValue = country.value.idd
        if (callingCodeValue.root && callingCodeValue.suffixes) {
          if (callingCodeValue.suffixes.length == 1) {
            return callingCodeValue.root.replace(/\D/g,'')+callingCodeValue.suffixes;
          } else {
            return callingCodeValue.root.replace(/\D/g,'');
          }
        }
      }
    })
    const currency = computed(()=>{
      if (country.value.currencies) {
        const currencyValue = country.value.currencies
        return Object.keys(currencyValue)[0]
      }
    })
    const countryWithSameCallingCode= ref([])
    const countryWithSameCurrency = ref([])

    onMounted(()=>{
      axios.get(`https://restcountries.com/v3.1/name/${countryName.value}?fullText=true`).then(res => {
        country.value = res.data[0]
      })
    })

    watch(callingCode, (newVal, oldVal)=>{
      if (callingCode.value.length > 0) {
        axios.get(`https://restcountries.com/v2/callingcode/${callingCode.value}`).then(res => {
          countryWithSameCallingCode.value = res.data
        })
      }
    })

    watch(currency, (newVal, oldVal)=>{
      if (currency.value.length > 0) {
        axios.get(`https://restcountries.com/v3.1/currency/${currency.value}`).then(res => {
          countryWithSameCurrency.value = res.data
        })
      }
    })

    const hoverCountryWSCC = () => {
      document.getElementById('countryWSCC').classList.toggle('none')
    }

    
    const hoverCountryWSC = () => {
      document.getElementById('countryWSC').classList.toggle('none')
    }

    return { country, callingCode, currency, countryWithSameCallingCode, countryWithSameCurrency, hoverCountryWSCC, hoverCountryWSC }
  }
}
</script>

<style>
.width-card {
  width: 540px;
}
.hover-card {
  background: #525252;
  width: 200px;
}
.none {
  display: none;
}
.globe-svg {
  right: -1%;
  top: 7.5%
}
</style>