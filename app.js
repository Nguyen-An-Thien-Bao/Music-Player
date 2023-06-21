let player = document.querySelector(".player")
let playBtn = document.querySelector(".btn-toggle-play")
let heading = document.querySelector("header h2")
let cbThumb = document.querySelector(".cd-thumb")
let audio = document.querySelector("#audio")
let progressBar = document.querySelector("#progress")

let nextBtn = document.querySelector(".btn-next")
let prevBtn = document.querySelector(".btn-prev")
let randomBtn = document.querySelector(".btn-random")
let repeatBtn = document.querySelector(".btn-repeat")

let playlist = document.querySelector(".playlist")


const app = {
    currentIndex: 0,
    isPlay: false,
    isRandom: false,
    isRepeat: false,
    songs: [
      {
        name: "How You Like That",
        singer: "BLACKPINK",
        path: "./Music cho Api/HowYouLikeThat-BLACKPINK-6720100.mp3",
        image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
      },
      {
        name: "Lalisa",
        singer: "LISA",
        path: "./Music cho Api/Lalisa-LISA-7086697.mp3",
        image:
          "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
      },
      {
        name: "Money",
        singer: "LISA",
        path:
          "./Music cho Api/Money-LISA-7086698.mp3",
        image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
      },
      {
        name: "On The Ground",
        singer: "ROSÉ",
        path: "./Music cho Api/OnTheGround-ROSE-6964051.mp3",
        image:
          "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
      },
      {
        name: "Pink Venom",
        singer: "BLACKPINK",
        path: "./Music cho Api/PinkVenom-BLACKPINK-7802564.mp3",
        image:
          "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
      },
      {
        name: "ShutDown",
        singer: "BLACKPINK",
        path:
          "./Music cho Api/ShutDown-BLACKPINK-7887142.mp3",
        image:
          "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
      },
      {
        name: "Solo",
        singer: "JENNIE",
        path: "./Music cho Api/Solo-JennieBlackPink-5738971.mp3",
        image:
          "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
      }
    ],
    // change the song item when play
    activeSong(){
      document.querySelector(".song.active").classList.remove("active")
      let lstItem = document.querySelectorAll(".song")
      lstItem[this.currentIndex].classList.add("active")
    }
    ,
    renderSong(){
        let html = this.songs.map((song, idx) => {
            return `
            <div class="song ${idx == this.currentIndex ? "active" : ""}">
                <div class="thumb" style="background-image: url('${song.image}')"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })

        document.querySelector(".playlist").innerHTML = html.join("")
    },
    definePropertis: function(){
      Object.defineProperty(this, "currentSong", {
        get: function(){
          return this.songs[this.currentIndex]
        }
      })
    }
    ,
    nextSong(){
      this.currentIndex++
      if(this.currentIndex > this.songs.length - 1){
        this.currentIndex = 0
      }
      this.activeSong()
      this.loadCurrentSong()
    },
    prevSong(){
      this.currentIndex--
      if(this.currentIndex < 0){
        this.currentIndex = this.songs.length - 1
      }
      this.activeSong()
      this.loadCurrentSong()
    },
    randomSong(){
      let newIdx
      do{
        newIdx = Math.floor(Math.random() * this.songs.length - 1)
      }
      while(newIdx === this.currentIndex)

      this.currentIndex = newIdx
      this.activeSong()
      this.loadCurrentSong()
    }
    ,
    clickToActive(){
      let _this = this
      let songlist = Array.from(playlist.children)
      songlist.forEach((song, songIdx) => {
        song.addEventListener("click", () => {
          _this.currentIndex = songIdx
          _this.loadCurrentSong()
          _this.activeSong()
          audio.play()
        })
      })
    }
    ,
    handleEvents(){
        let _this = this
        let cb = document.querySelector(".cd")
        let oldWidth = cb.offsetWidth
        
        let cdThumbRotate = cbThumb.animate([
          {transform: 'rotate(360deg)'}
        ], {
          duration: 10000,
          iterations: Infinity
        })
        cdThumbRotate.pause()

        document.onscroll = function(){
            let scrollTop = Math.round(window.scrollY || document.documentElement.scrollTop)
            let newWidth = oldWidth - scrollTop
            cb.style.width = newWidth > 0 ? newWidth : 0 + "px"
            cb.style.opacity = newWidth / oldWidth
        }

        playBtn.onclick = function(){
          if(!_this.isPlay){
            audio.play()
            
          }
          else{
            audio.pause()
          }
        }


        audio.onplay = function(){
          _this.isPlay = true
          player.classList.add("playing")
          cdThumbRotate.play()
        }

        audio.onpause =  function(){
          _this.isPlay = false
          player.classList.remove("playing")
          cdThumbRotate.pause()
        }
        
        audio.ontimeupdate = function(){
          if(audio.currentTime){
            let currentPosi = Math.floor(audio.currentTime)
            progressBar.value = currentPosi / audio.duration * 100
          }
        }

        progressBar.onchange = function(){
          audio.currentTime = audio.duration / 100 * progressBar.value
        }

        nextBtn.onclick = function(){
          if(_this.isRandom){
            _this.randomSong()
          }
          else{
            _this.nextSong()
          }
          audio.play()
        }

        prevBtn.onclick = function(){
          if(_this.isRandom){
            _this.randomSong()
          }
          else{
            _this.prevSong()
          }
          audio.play()
        }

        randomBtn.onclick = function(){
          _this.isRandom = !_this.isRandom

          randomBtn.classList.toggle("active", _this.isRandom)
        }

        repeatBtn.onclick = function(){
          _this.isRepeat = !_this.isRepeat
          repeatBtn.classList.toggle("active", _this.isRepeat)
        }

        audio.onended = function(){
          if(_this.isRepeat){
            audio.play()
          }
          else{
            nextBtn.click()
          }
        }

        // playSong when clicked
        
    },
    loadCurrentSong(){
      heading.innerText = this.currentSong.name
      cbThumb.style.backgroundImage = `url(${this.currentSong.image})`
      audio.setAttribute("src", this.currentSong.path)
    }
    ,
    start(){
        this.definePropertis()
        this.loadCurrentSong()
        this.handleEvents()
        this.renderSong()
        this.clickToActive()
    }
}

app.start()