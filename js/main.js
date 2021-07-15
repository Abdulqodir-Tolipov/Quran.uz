input.onkeyup = async (event) => {
    try {
        if (event.keyCode == 13){
            if (input.value === '') throw new Error('Please enter surah name!')
            if (input.value < 0 && input.value > 115) throw new Error('Please enter a valid number')

            let response = await fetch(`https://api.quran.sutanlab.id/surah/${input.value}`)
            response = await response.json()

            // Shu joyini chunmadim
            let { data: { verses } } = response

            // console.log(surah);
            nameSurah.textContent = response.data.name.transliteration.en
            ararbic_text.innerHTML = null
            for (let i = 0; i < verses.length; i++){

                let li = document.createElement('li')
                li.textContent = verses[i].text.arab
                ararbic_text.append(li)

                li.onclick = () => {
                    audioWrapper.innerHTML = null
                    let surah_audio = document.createElement('audio')
                    let source_audio = document.createElement('source')
                    source_audio.src = verses[i].audio.primary 
                    surah_audio.append(source_audio)
                    audioWrapper.append(surah_audio)
                    surah_audio.play()

                    //Shu joyini chunmadim
                    let actives = document.querySelectorAll('.active')
                    actives.forEach(el => el.classList.remove('active'))
                    li.classList.add('active')
                }
            }

            let index = 0
            function readQuranAyats (index) {
                let actives = document.querySelectorAll('.active')
                actives.forEach( el => el.classList.remove('active'))

                let items = document.querySelectorAll('li')
                items[index].classList.add('active')
                let audio = document.createElement('audio')
                let source = document.createElement('source')
                source.src = verses[index].audio.primary
                audio.append(source)
                audioWrapper.append(audio)
                audio.play()
                audio.onended = () => {
                    if (index < verses.length) {
                        return readQuranAyats(index + 1)
                    }
                }
            }
            
            readAll.onclick = () => {
                audioWrapper.innerHTML=null
                readQuranAyats(index)
            }

        }
    }catch (error) {
        console.log(error);
    }
}