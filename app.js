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
    mainSection.innerHTML = '';

    arrowElement = document.createElement('span');
    arrowElement.classList.add('material-icons')
    arrowElement.classList.add('arrow')
    arrowElement.classList.add('rotate')
    arrowElement.addEventListener('click', () => {
        expandNav('main');
    })
    arrowElement.textContent = 'expand_more';

    detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container');

    statsContainer = document.createElement('div');
    statsContainer.classList.add('stats-container');

    createBannerItem(champData.id);
    mainSection.appendChild(arrowElement);
    mainSection.appendChild(detailsContainer);
    mainSection.appendChild(statsContainer);
    createDetails(champData);
    createStats(champData);
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

// --- DETAILS SECTION ---

// CREATES THE HEADING, TEXT AND TITLE FOR THE INDIVIDUAL PAGE.
const createDetails = (data) => {
    const detailsContainer = document.querySelector('.details-container');

    // CREATION OF ELEMENTS
    const container = document.createElement('div');
    container.classList.add('title');


    const champName = document.createElement('h1');
    champName.style
    champName.textContent = data.name;

    const title = document.createElement('span');
    title.textContent = data.title;

    const horizontalLine = document.createElement('div');
    horizontalLine.classList.add('horizontal-line');

    const lorePara = document.createElement('p');
    lorePara.textContent = data.blurb;
    lorePara.classList.add('lore');

    // APPENDING
    container.appendChild(champName);
    container.appendChild(title);

    detailsContainer.appendChild(container);
    detailsContainer.appendChild(horizontalLine);
    detailsContainer.appendChild(lorePara);
}

// STATS SECTION

const createStats = (data) => {
    const statsContainer = document.querySelector('.stats-container');

    const infoHeader = document.createElement('h2');
    infoHeader.textContent = 'INFO';
    const infoDiv = document.createElement('div');

    const statHeader = document.createElement('h2');
    statHeader.textContent = 'STATS';
    const statDiv = document.createElement('div');

    // GENERATE THE INFORMATION
    for (const [key, value] of Object.entries(data.info)) {
        p = document.createElement('p');
        p.textContent = `${key.toUpperCase()}: `;

        s = document.createElement('span');
        s.textContent = value;

        p.appendChild(s);
        infoDiv.appendChild(p);
    }

    // GENERATE THE STATS
    for (const [key, value] of Object.entries(data.stats)) {
        p = document.createElement('p');
        p.textContent = `${key.toUpperCase()}: `;

        s = document.createElement('span');
        s.textContent = value;

        p.appendChild(s);
        statDiv.appendChild(p);
    }

    statsContainer.appendChild(infoHeader);
    statsContainer.appendChild(infoDiv);
    statsContainer.appendChild(statHeader);
    statsContainer.appendChild(statDiv);
}

fetchChampions();