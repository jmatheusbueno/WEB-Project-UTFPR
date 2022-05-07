let validToken = false;
let historic = [''];

document.addEventListener("DOMContentLoaded", function() {
    load();
});

function load() {
    // let code = window.location.href.split('=')[1];
    // if (code) {
    //     // document.location.href = `https://connect.deezer.com/oauth/access_token.php?app_id=538202&secret=d2fedf586f15a4ebdd0e20c79ecb5115&code=${connected}`

    //     var http = new XMLHttpRequest();
    //     http.open("get", `https://cors-anywhere.herokuapp.com/https://connect.deezer.com/oauth/access_token.php?app_id=538202&secret=d2fedf586f15a4ebdd0e20c79ecb5115&code=${code}`, true);
    //     http.onreadystatechange = function() {
    //         if (http.readyState === 4 && http.status === 200) {
    //             result = JSON.parse(http.responseText);
    //             console.log(result.data);
    //         }
    //     }
    //     http.send();
    // }
    
    let code = window.location.href.split('=')[1];
    if (code) {
        const options = {
            method: 'GET',
            mode: 'cors'
        }
        fetch(`https://cors-anywhere.herokuapp.com/https://connect.deezer.com/oauth/access_token.php?app_id=538202&secret=d2fedf586f15a4ebdd0e20c79ecb5115&code=${code}`, options)
            .then(response => {
                response.json().then(data => console.log('ok', data));
                validToken = true;
            })
            .catch(e => {
                console.log('dont ok', e.message);
                validToken = false;
            });
    }

    if (!localStorage.getItem('historic')) {
        localStorage.setItem('historic', historic);
    }
}

function search(historic) {
    let result;
    let search = document.querySelector('.search').value;
    var http = new XMLHttpRequest();
    if (historic) {
        console.log('ok');
        http.open("get", `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${historic}`, true);
    } else {
        console.log('n ok');
        http.open("get", `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${search}`, true);
    }
    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
            result = JSON.parse(http.responseText);
            loadDataSource(result.data);
        }
    }
    http.send();

    this.updateHistoric();
}

function search2() {
    clearDataSource();
    loadDataSource(example.data);
    this.updateHistoric();
}

function updateHistoric() {
    let search = document.querySelector('.search').value;
    historic.push(search);
    localStorage.setItem('historic', historic);
}

function createHistoricElements() {
    let ulContainer = this.document.querySelector('.ul-historic-list');

    historic = historic.filter(item => item !== '');
    let liContainer = elementFactory('li');
    let input = elementFactory('input');
    input.type = 'button';
    input.value = historic[historic.length - 1];
    input.addEventListener("click",  function(){ search(input.value); });

    liContainer.appendChild(input);
    ulContainer.appendChild(liContainer);
}

function loadDataSource(data) {
    this.document.querySelector('.box-content-container').style.display = 'block';
    this.document.querySelector('.search').style.marginTop = '100px';

    let filteredData = [];
    let count = 1;
    for (let obj in data) {
        filteredData.push({
            number: count,
            title: data[obj].title,
            preview: data[obj].preview,
            avatar: data[obj].album.cover_small,
        });

        if (count === 13) break;

        count++;
    }

    for (let obj in filteredData) {
        let tableContainer = document.querySelector('.table-container');

        let trCard = elementFactory('tr');
    
        let tdCardCounter = elementFactory('td');
        tdCardCounter.classList.add('card-counter');
        tdCardCounter.innerHTML = filteredData[obj].number;
        trCard.appendChild(tdCardCounter);

        let tdCardImg = elementFactory('td');
        let imgCardImg = elementFactory('img');
        imgCardImg.src = filteredData[obj].avatar;
        imgCardImg.classList.add('card-avatar');
        tdCardImg.appendChild(imgCardImg);
        trCard.appendChild(tdCardImg);

        let tdCardTitle = elementFactory('td');
        tdCardTitle.classList.add('card-tittle');
        tdCardTitle.innerHTML = filteredData[obj].title;
        trCard.appendChild(tdCardTitle);

        let tdCardAudio = elementFactory('td');
        let audioCardAudio = elementFactory('audio');
        audioCardAudio.controls = 'controls';
        let sourceAudioCardAudio = elementFactory('source');
        sourceAudioCardAudio.src = filteredData[obj].preview;
        sourceAudioCardAudio.type = 'audio/mp3';
        audioCardAudio.appendChild(sourceAudioCardAudio);
        tdCardAudio.appendChild(audioCardAudio);
        trCard.appendChild(tdCardAudio);

        tableContainer.appendChild(trCard);
    }
}

function clearDataSource() {
    let tableContainer = document.querySelector('.table-container');
    tableContainer.innerHTML = '';
}

function elementFactory(element) {
    return document.createElement(element)
}