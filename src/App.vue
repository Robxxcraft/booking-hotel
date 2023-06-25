<template>
  <div class="bg-slate-50 min-h-screen">
    <div class="flex flex-col space-y-3 mx-auto max-w-4xl">
      <template v-if="dataPaginated.length > 0">
        <div class="flex justify-between items-end pt-12">
          <div class="text-sm text-gray-400">menampilkan {{ data.length+'+' }} akomodasi terbaik dengan harga terbaik</div>
          <div class="flex">
            <div class="relative flex items-end">
                <div class="flex justify-end items-center">
                    <div class="tracking-wide select-none">
                        <div class="mr-5 text-orange-400 text-sm font-bold cursor-pointer hover:bg-orange-500 hover:text-white px-2 md:px-4 py-1 rounded" @click="openSort">
                            <span class="inline" id="text">Sort</span> 
                            <svg class="ml-2 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"/></svg>
                        </div>
                        <div id="sortDropdown" class="absolute hidden bg-white top-12 right-0 rounded-sm overflow-hidden shadow" style="z-index: 5;">
                            <div class="flex flex-col w-48">
                              <div @click="sortHotel('namaHotel')" class="flex justify-between px-2 py-1 hover:bg-orange-400 hover:text-white text-sm cursor-pointer">Nama Hotel 
                                <template v-if="sort.namaHotel == 'asc'">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 8L18 14H6L12 8Z"></path></svg>
                                </template>
                                <template v-else-if="sort.namaHotel == 'desc'">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 16L6 10H18L12 16Z"></path></svg>
                                </template>
                              </div>
                              <div @click="sortHotel('harga')" class="flex justify-between px-2 py-1 hover:bg-orange-400 hover:text-white text-sm cursor-pointer">Harga
                                <template v-if="sort.harga == 'asc'">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 8L18 14H6L12 8Z"></path></svg>
                                </template>
                                <template v-else-if="sort.harga == 'desc'">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 16L6 10H18L12 16Z"></path></svg>
                                </template>
                              </div>
                              <div @click="sortHotel('rating')" class="flex justify-between px-2 py-1 hover:bg-orange-400 hover:text-white text-sm cursor-pointer">Rating
                                <template v-if="sort.rating == 'asc'">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 8L18 14H6L12 8Z"></path></svg>
                                </template>
                                <template v-else-if="sort.rating == 'desc'">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 16L6 10H18L12 16Z"></path></svg>
                                </template>
                              </div>
                              <div @click="sortHotel('halal')" class="flex justify-between px-2 py-1 hover:bg-orange-400 hover:text-white text-sm cursor-pointer">Halal
                                <template v-if="sort.halal == true">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 8L18 14H6L12 8Z"></path></svg>
                                </template>
                                <template v-else-if="sort.halal == false">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 16L6 10H18L12 16Z"></path></svg>
                                </template>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative">
              <input @focusin="searchIcon" @focusout="searchIcon" v-model="search" @keyup.enter="searchHotel" id="search" type="text" class="w-full bg-white pl-4 pr-12 py-2 border border-gray-200 transition ease-in delay-100 rounded-md focus:outline-none" placeholder="Cari" :autocomplete="false">
              <svg @click="searchHotel" id="magnify" class="text-gray-200 cursor-pointer absolute right-4 transition ease-in delay-100" style="bottom: 24%;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>
        </div>
        <div v-if="searched">Hasil pencarian <span class="font-semibold">{{search}} {{ !notFound ? '('+filteredData.length+')' : '(0)' }}</span></div>
        <template v-if="!notFound">
          <template v-for="(hotel, index) in dataPaginated" :key="index">
            <div class="flex p-3 bg-white rounded-sm space-x-5">
              <div class="h-48 w-96 bg-slate-400 rounded overflow-hidden">
                <img class="w-full h-full" :src="hotel.HotelPicture" :alt="hotel.HotelName">
              </div>
              <div class="w-full flex justify-between items-center">
                <div class="w-full">
                  <div class="font-semibold text-lg">{{hotel.HotelName}}</div>
                  <div class="mt-1 flex space-x-4 w-full items-center">
                    <div class="flex w-28">
                      <template v-if="hotel.Rating == '1.0'">
                        <img src="./assets/star.svg" alt="star">
                      </template>
                      <template v-else-if="hotel.Rating == '2.0'">
                        <template v-for="i in 2" :key="i">
                          <img src="./assets/star.svg" alt="star">
                        </template>
                      </template>
                      <template v-else-if="hotel.Rating == '3.0'">
                        <template v-for="i in 3" :key="i">
                          <img src="./assets/star.svg" alt="star">
                        </template>    
                      </template>
                      <template v-else-if="hotel.Rating == '4.0'">
                        <template v-for="i in 4" :key="i">
                          <img src="./assets/star.svg" alt="star">
                        </template>  
                      </template>
                      <template v-else-if="hotel.Rating == '5.0' || hotel.Rating == 'All'">
                        <template v-for="i in 5" :key="i">
                          <img src="./assets/star.svg" alt="star">
                        </template>
                      </template>
                    </div>
                    <div class="flex space-x-9">
                      <div class="text-sm">Latitude : <span class="font-semibold">{{ hotel.Latitude }}</span></div>
                      <div class="text-sm">Longitude : <span class="font-semibold">{{ hotel.Longitude }}</span></div>
                    </div>
                  </div>
                  <div class="flex items-center my-3">
                    <div class="bg-orange-400 text-white font-semibold rounded px-1.5 py-0.5 mr-3">
                      {{ hotel.Rating }}
                    </div>
                    <template v-if="hotel.Rating == 5 || hotel.Rating == 'All'">  
                        <div class="text-orange-400 font-semibold mr-8">
                          Best
                        </div>
                    </template>
                    <template v-else-if="hotel.Rating >= 3">  
                        <div class="text-orange-400 font-semibold mr-8">
                          Good
                        </div>
                    </template>
                    <template v-else-if="hotel.Rating < 3">  
                        <div class="text-orange-400 font-semibold mr-8">
                          Bad
                        </div>
                    </template>                    
                  <template v-if="hotel.TripAdvisorRating">
                    <div class="bg-orange-400 text-white font-semibold rounded px-1.5 py-0.5 mr-3">
                      {{ hotel.TripAdvisorRating }}
                    </div>
                    <div class="text-orange-400 font-semibold">Trip Advisor</div>
                  </template>
                  </div>
                  <div class="flex items-center space-x-3">
                    <template v-if="hotel.IsPackageRate == 'true'">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22 21H2V19H3V4C3 3.44772 3.44772 3 4 3H18C18.5523 3 19 3.44772 19 4V9H21V19H22V21ZM17 19H19V11H13V19H15V13H17V19ZM17 9V5H5V19H11V9H17ZM7 11H9V13H7V11ZM7 15H9V17H7V15ZM7 7H9V9H7V7Z"></path></svg>
                    </template>
                    <template v-if="hotel.MappedHotel == 'true'">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2 5L9 2L15 5L21.303 2.2987C21.5569 2.18992 21.8508 2.30749 21.9596 2.56131C21.9862 2.62355 22 2.69056 22 2.75827V19L15 22L9 19L2.69696 21.7013C2.44314 21.8101 2.14921 21.6925 2.04043 21.4387C2.01375 21.3765 2 21.3094 2 21.2417V5ZM16 19.3955L20 17.6812V5.03308L16 6.74736V19.3955ZM14 19.2639V6.73607L10 4.73607V17.2639L14 19.2639ZM8 17.2526V4.60451L4 6.31879V18.9669L8 17.2526Z"></path></svg>
                    </template>
                    <template v-if="hotel.IsPkgProperty == 'true'">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.2847 10.6683L22.5 13.9909L17.248 17.3368L12 13.9934L6.75198 17.3368L1.5 13.9909L6.7152 10.6684L1.5 7.34587L6.75206 4L11.9999 7.34335L17.2481 4L22.5 7.34587L17.2847 10.6683ZM17.2112 10.6684L11.9999 7.3484L6.78869 10.6683L12 13.9883L17.2112 10.6684ZM6.78574 18.4456L12.0377 15.1L17.2898 18.4456L12.0377 21.7916L6.78574 18.4456Z"></path></svg>
                    </template>
                    <template v-if="hotel.Halal == 'true'">
                      <img src="./assets/halal.svg" alt="halal">
                    </template>
                  </div>
                  <div class="flex space-x-2 mt-3 h-8">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path></svg>
                    <div class="text-sm max-w-sm text-gray-600">{{hotel.HotelAddress}}</div>
                  </div>
                </div>
                <div class="text-right w-48 mt-8 pr-2">
                  <!-- <strike class="text-gray-300 font-semibold">{{hotel.Price}}</strike> -->
                  <div class="text-orange-400 font-semibold flex justify-end">{{hotel.Currency}} {{currencyFormat(hotel.Price)}}</div>
                  <div class="text-sm text-gray-600">per kamar per malam</div>
                </div>
              </div>
            </div>
          </template>
        </template>
        <template v-else>
          <div class="text-red-500 font-bold">Not Found</div>
        </template>
        
        <template v-if="!notFound">
          <div class="pt-6 pb-12 flex items-center justify-end space-x-2 text-orange-400 font-semibold">
            <button class="h-8 w-8 hover:text-orange-800 focus:outline-none" v-if="currentPage > 1" @click="getData(currentPage - 1)">
              <svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            </button>
            <template v-if="currentPage > 2">
              <button :class="currentPage == 1 ? 'bg-orange-400 shadow-sm hover:shadow focus:outline-none text-white border-2 border-orange-400 py-1 px-3 rounded-2xl' : 'hover:bg-orange-400 shadow-sm hover:text-white hover:shadow focus:outline-none border-2 border-orange-400 py-1 px-3 rounded-2xl'" @click="getData(1)">1</button>
            </template>
            <template v-if="currentPage > 3">
              <button class="shadow-sm focus:outline-none border-2 border-orange-400 py-1 px-3 rounded-2xl" disabled>...</button>
            </template>
            <div class="space-x-1">
              <template v-for="(page, index) in pagination" :key="index">
                <button :class="page === currentPage ? 'bg-orange-400 shadow-sm hover:shadow focus:outline-none text-white border-2 border-orange-400 py-1 px-3 rounded-2xl' : 'hover:bg-orange-400 shadow-sm hover:text-white hover:shadow focus:outline-none border-2 border-orange-400 py-1 px-3 rounded-2xl'" @click="getData(page)">{{page}}</button>
              </template>
            </div>
            <template v-if="nextPage && currentPage < lastPage-2">
              <button class="shadow-sm focus:outline-none border-2 border-orange-400 py-1 px-3 rounded-2xl" disabled>...</button>
            </template>
            <template v-if="nextPage && currentPage < lastPage-1">
              <button :class="currentPage == lastPage ? 'bg-orange-400 shadow-sm hover:shadow focus:outline-none text-white border-2 border-orange-400 py-1 px-3 rounded-2xl' : 'hover:bg-orange-400 shadow-sm hover:text-white hover:shadow focus:outline-none border-2 border-orange-400 py-1 px-3 rounded-2xl'" @click="getData(lastPage)">{{lastPage}}</button>
            </template>
            <button class="h-8 w-8 hover:text-orange-800 focus:outline-none" v-if="nextPage" @click="getData(currentPage + 1)">
              <svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
            </button>
          </div>`
        </template>
      </template>
      <template v-else>
        <div class="h-screen w-full flex flex-col justify-center items-center">
          <img src="./assets/loading.svg" alt="loading">
          <div class="text-orange-400 font-bold text-2xl">Memuat</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
export default {
  setup(){
    const data = ref([])
    const filteredData = ref([])
    const rowPerPage = ref(10)
    const lastPage = ref(1)
    const dataPaginated = ref([])
    const currentPage = ref(1)
    const nextPage = ref(null)
    const sort = ref({
      namaHotel: '',
      harga: '',
      rating: '',
      halal: null,
    })
    const search = ref('')
    const searched = ref(false)
    const notFound = ref(false)

    const getData = (page=1) => {
        window.scrollTo(0, 0)
        if (filteredData.value.length > 0) {
          dataPaginated.value = []
          currentPage.value = page
          let firstIndexPage = (currentPage.value*rowPerPage.value)-rowPerPage.value
          let lastIndexPage = currentPage.value*rowPerPage.value
          for(let i=firstIndexPage; i < lastIndexPage; i++){
            if(filteredData.value[i] != null){
              dataPaginated.value.push({
                HotelCode: filteredData.value[i].HotelCode,
                HotelName: filteredData.value[i].HotelName,
                HotelPicture: filteredData.value[i].HotelPicture,
                Latitude: filteredData.value[i].Latitude,
                Longitude: filteredData.value[i].Longitude,
                HotelAddress: filteredData.value[i].HotelAddress,
                Rating: filteredData.value[i].Rating,
                TripAdvisorRating: filteredData.value[i].TripAdvisorRating,
                Price: filteredData.value[i].Price,
                Currency: filteredData.value[i].Currency,
                IsPackageRate: filteredData.value[i].IsPackageRate,
                MappedHotel: filteredData.value[i].MappedHotel,
                IsPkgProperty: filteredData.value[i].IsPkgProperty,
                Halal: filteredData.value[i].Halal,
              })
          }
          }
          lastPage.value = Math.floor(filteredData.value.length/rowPerPage.value)
          if (filteredData.value.length-(currentPage.value*rowPerPage.value)>=rowPerPage.value) {
            return nextPage.value = currentPage.value+1
          } else {
            return nextPage.value = null
          }
        }
        dataPaginated.value = []
        currentPage.value = page
        let firstIndexPage = (currentPage.value*rowPerPage.value)-rowPerPage.value
        let lastIndexPage = currentPage.value*rowPerPage.value
        for(let i=firstIndexPage; i < lastIndexPage; i++){
          if(data.value[i] != null){
            dataPaginated.value.push({
              HotelCode: data.value[i].HotelCode,
              HotelName: data.value[i].HotelName,
              HotelPicture: data.value[i].HotelPicture,
              Latitude: data.value[i].Latitude,
              Longitude: data.value[i].Longitude,
              HotelAddress: data.value[i].HotelAddress,
              Rating: data.value[i].Rating,
              TripAdvisorRating: data.value[i].TripAdvisorRating,
              Price: data.value[i].Price,
              Currency: data.value[i].Currency,
              IsPackageRate: data.value[i].IsPackageRate,
              MappedHotel: data.value[i].MappedHotel,
              IsPkgProperty: data.value[i].IsPkgProperty,
              Halal: data.value[i].Halal,
            })
          }
        }
        lastPage.value = Math.floor(data.value.length/rowPerPage.value)
        if (data.value.length-(currentPage.value*rowPerPage.value)>=rowPerPage.value) {
          return nextPage.value = currentPage.value+1
        } else {
          return nextPage.value = null
        }
    }

    onMounted(async()=>{
      await fetch(new URL('./assets/Response.xml', import.meta.url)).then(response=>{
        return response.text();
      }).then(xmlString=>{
        let xmlDoc = new DOMParser()
        let hotelList = xmlDoc.parseFromString(xmlString, "text/xml").querySelectorAll('HotelResult')
        for (let i = 0; i < hotelList.length; i++) {
          let rating = ''
            switch (hotelList[i].getElementsByTagName('HotelInfo')[0].getElementsByTagName('Rating')[0].textContent) {
              case 'OneStar':
              rating = '1.0';
              break;
              case 'TwoStar':
              rating = '2.0';
              break;
              case 'ThreeStar':
              rating = '3.0';
              break;
              case 'FourStar':
              rating = '4.0';
              break;
              case 'FiveStar':
              rating = '5.0';
              break;
              default:
              rating = hotelList[i].getElementsByTagName('HotelInfo')[0].getElementsByTagName('Rating')[0].textContent;
              break;
            }
          data.value.push({
            HotelCode: hotelList[i].getElementsByTagName('HotelInfo')[0].getElementsByTagName('HotelCode')[0].textContent,
            HotelName: hotelList[i].getElementsByTagName('HotelInfo')[0].getElementsByTagName('HotelName')[0].textContent,
            HotelPicture: hotelList[i].getElementsByTagName('HotelInfo')[0].getElementsByTagName('HotelPicture')[0] ? hotelList[i].getElementsByTagName('HotelInfo')[0].getElementsByTagName('HotelPicture')[0].textContent : '',
            HotelDescription: hotelList[i].getElementsByTagName('HotelInfo')[0].getElementsByTagName('HotelDescription')[0].textContent,
            Latitude: hotelList[i].getElementsByTagName('HotelInfo')[0].getElementsByTagName('Latitude')[0].textContent,
            Longitude: hotelList[i].getElementsByTagName('HotelInfo')[0].getElementsByTagName('Longitude')[0].textContent,
            HotelAddress: hotelList[i].getElementsByTagName('HotelInfo')[0].getElementsByTagName('HotelAddress')[0].textContent,
            Rating: rating,
            TripAdvisorRating: hotelList[i].getElementsByTagName('HotelInfo')[0].getElementsByTagName('TripAdvisorRating')[0] ? hotelList[i].getElementsByTagName('HotelInfo')[0].getElementsByTagName('TripAdvisorRating')[0].textContent : '',
            Price: parseFloat(hotelList[i].getElementsByTagName('MinHotelPrice')[0].getAttribute('TotalPrice')),
            Currency: hotelList[i].getElementsByTagName('MinHotelPrice')[0].getAttribute('Currency'),
            IsPackageRate: hotelList[i].getElementsByTagName('IsPackageRate')[0].textContent,
            MappedHotel: hotelList[i].getElementsByTagName('MappedHotel')[0].textContent,
            IsPkgProperty: hotelList[i].getElementsByTagName('IsPkgProperty')[0].textContent,
            Halal: hotelList[i].getElementsByTagName('IsHalal')[0].textContent,
          });
        }
      })
      getData(currentPage.value)
    })

    const pagination = computed(() => {
      let arr = []
      let endLength = currentPage.value+1
      if (!nextPage.value) {
        endLength = currentPage.value
      }
      for(let pageLength = currentPage.value-1; pageLength <= endLength; pageLength++){
        if (pageLength < 1) {
          continue
        }
        arr.push(pageLength)
      }
      return arr
    })

    const searchIcon = () => {
      document.getElementById('search').classList.toggle('border-orange-400')
      document.getElementById('magnify').classList.toggle('text-orange-400')
    }

    const searchHotel = () => {
      if (search.value != '') {
        const keys = Object.keys(data.value[0])
        let filter = data.value.map(obj => ({...obj}))
        let result = filter.filter(i=>{
          for(let key of keys){
            if (i[key].toString().toLowerCase().includes(search.value.toLowerCase())) {
              return -1
            }
          }
        })

        if (result.length > 0) {
          filteredData.value = result
        } else {
          notFound.value = true
        }
        
        searched.value = true
      } else {
        filteredData.value = []
        notFound.value = false
        searched.value = false
      }
      getData(1)
    }

    const sortHotel = (sortCol) => {
      notFound.value = false
      searched.value = false
      if(sortCol == 'namaHotel'){
        filteredData.value = []
        sort.value.harga = ''
        sort.value.rating = ''
        sort.value.halal = null
        if (sort.value.namaHotel == '') {
          let filter = data.value.map(obj => ({...obj}))
          filter.sort((a, b) => {
            if (a.HotelName < b.HotelName) {
              return -1
            }
          })
          filteredData.value = filter
          sort.value.namaHotel = 'asc'
        } else if (sort.value.namaHotel == 'asc') {
          let filter = data.value.map(obj => ({...obj}))
          filter.sort((a, b) => {
            if (a.HotelName > b.HotelName) {
              return -1
            }
          })
          filteredData.value = filter
          sort.value.namaHotel = 'desc'
        } else {
          sort.value.namaHotel = ''
          getData(1)
        }
      } else if(sortCol == 'harga'){
        filteredData.value = []
        sort.value.namaHotel = ''
        sort.value.rating = ''
        sort.value.halal = null
        if (sort.value.harga == '') {
          let filter = data.value.map(obj => ({...obj}))
          filter.sort((a, b) => {
            if (a.HotelName < b.HotelName) {
              return -1
            }
          }).sort((a, b) => {
            if (a.Price > b.Price) {
              return -1
            }
          })
          filteredData.value = filter
          sort.value.harga = 'asc'
        } else if (sort.value.harga == 'asc') {
          let filter = data.value.map(obj => ({...obj}))
          filter.sort((a, b) => {
            if (a.HotelName < b.HotelName) {
              return -1
            }
          }).sort((a, b) => {
            if (a.Price < b.Price) {
              return -1
            }
          })
          filteredData.value = filter
          sort.value.harga = 'desc'
        } else {
          sort.value.harga = ''
        }
      } else if(sortCol == 'rating'){
        filteredData.value = []
        sort.value.namaHotel = ''
        sort.value.harga = ''
        sort.value.halal = null
        if (sort.value.rating == '') {
          let filter = data.value.map(obj => ({...obj}))
          filter.sort((a, b) => {
            if (a.HotelName < b.HotelName) {
              return -1
            }
          }).sort((a, b) => {
            if (a.Rating > b.Rating) {
              return -1
            }
          })
          filteredData.value = filter
          sort.value.rating = 'asc'
        } else if (sort.value.rating == 'asc') {
          let filter = data.value.map(obj => ({...obj}))
          filter.sort((a, b) => {
            if (a.HotelName < b.HotelName) {
              return -1
            }
          }).sort((a, b) => {
            if (a.Rating < b.Rating) {
              return -1
            }
          })
          filteredData.value = filter
          sort.value.rating = 'desc'
        } else {
          sort.value.rating = ''
        }
      } else if(sortCol == 'halal'){
        filteredData.value = []
        sort.value.namaHotel = ''
        sort.value.harga = ''
        sort.value.rating = ''
        if (sort.value.halal == null) {
          let filters = data.value.map(obj => ({...obj}))
          filteredData.value = filters.sort((a, b) => {
            if (a.HotelName < b.HotelName) {
              return -1
            }
          }).filter(i => i.Halal == 'true')
          sort.value.halal = true
        } else if (sort.value.halal == true) {
          let filter = data.value.map(obj => ({...obj}))
          filteredData.value = filter.sort((a, b) => {
            if (a.HotelName < b.HotelName) {
              return -1
            }
          }).filter(i => i => i.Halal == 'false')
          sort.value.halal = false
        } else {
          sort.value.halal = null
        }
      }
      openSort()
      getData(1)
    }

    const openSort = () => {
      document.getElementById('sortDropdown').classList.toggle('hidden')
    }

    const currencyFormat = (n)=>{
      return n.toLocaleString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    return { data, dataPaginated, filteredData, pagination, nextPage, currentPage, lastPage, getData, searchIcon, search, notFound, searched, searchHotel, sort, openSort, sortHotel, currencyFormat }
  }
}
</script>