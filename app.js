let langaugeType = 'en_US';

// VARIABLE ELEMENTS
const navList = document.getElementById('#championList');
const mainSection = document.querySelector('.main-container');

fetch(`https://ddragon.leagueoflegends.com/cdn/languages.json`)
    .then(response => response.json())
    .then((data) => {
        // THIS IS TO FETCH THE LANGAUGE DATA, WHEN READY.
    })

// GRABBING CHAMPION DATA WITH LANGUAGE & PROCESSING
const fetchChampions = (lang) => {
    fetch(`http://ddragon.leagueoflegends.com/cdn/11.19.1/data/${langaugeType}/champion.json`)
        .then(response => response.json())
        .then((data) => {
            createListItem(data.data);
        })
}


// CREATING CHAMPION ITEMS ON NAVIGATION LIST
const createListItem = (data) => {
    Object.values(data).forEach(champion => {
        const listItem = document.createElement('li');
        const a = document.createElement('a');

        // a.href = `#${champion.id}`
        a.textContent = champion.id

        listItem.addEventListener('click', () => {
            regenInfo(data[champion.id]);
        })

        listItem.appendChild(a);
        navList.appendChild(listItem);
    })
}

// REGENERATE BASED ON NEW CHAMPION DATA.
const regenInfo = (champData) => {
    console.log(champData);
    mainSection.innerHTML = '';
    createBannerItem(champData.id);
}


// CREATE CHAMPINO BANNER BASED ON REGENERATED INFORMATION
const createBannerItem = (champName) => {
    const imageElement = document.createElement('img');
    imageElement.classList.add('splash-art');
    imageElement.src = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg`;
    imageElement.alt = `${champName}-splash art`

    mainSection.appendChild(imageElement)
}

const expandNav = (event) => {
    const navSection = document.querySelector('.champion-nav');

    if (event === 'nav') {
        navSection.style.display = 'none';
        mainSection.style.display = 'block';
    } else {
        navSection.style.display = 'flex';
        mainSection.style.display = 'none';
    }
}

const filterSearch = () => {
    input = document.querySelector('#input');
    console.log(input);
    filter = input.value.toUpperCase();
    li = navList.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('a')[0];

        txtValue = a.textContent || a.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

fetchChampions();