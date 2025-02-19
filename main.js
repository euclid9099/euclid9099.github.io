const config = {
    links: {
        github: 'https://github.com/euclid9099',
        mail: 'mailto:kevast2004@gmail.com',
        issues: 'https://github.com/euclid9099/euclid9099.github.io/issues/new',
        school: 'https://www.htlsaalfelden.at',
        ourTanks: 'https://github.com/euclid9099/OurTanks',
        kornelja: 'https://github.com/euclid9099/messageboard',
        monhike: 'mailto:kevast2004@gmail.com?subject=Monhike further information',
    },
    corners: 4
}

let targetHeader = ''
let longestHeaderLength = 0;

let fillChar = '.';

const setTargetHeader = (value) => {
    if (typeof value !== 'string') {
        console.error('Can not set target header to anything other than string');
        return;
    }

    targetHeader = value.toUpperCase().replace(/[^A-Z]/g, fillChar).padEnd(longestHeaderLength, fillChar)
}

document.addEventListener('DOMContentLoaded', () => {
    //replace 'config:...' links with configured ones
    document.querySelectorAll('a').forEach((link) => {
        if (!link.getAttribute('href')?.startsWith('config:')) return;

        link.setAttribute('href', config.links[link.getAttribute('href').split(':')[1]]);
    });

    //get longest header to avoid resizing of navigation
    let sections = document.querySelectorAll('section');
    longestHeaderLength = Array.from(sections)
        .map(section => section.getAttribute('id').length)
        .reduce((max, number) => Math.max(max, number));
    document.getElementById('current-header').textContent = fillChar.repeat(longestHeaderLength);
    setTargetHeader(document.querySelector('section').id);

    //get width of navigation for clean animation
    document.getElementById('navigation').style.setProperty('--link-width', longestHeaderLength);

    //randomly use corners for projects
    document.querySelectorAll('article').forEach((article) => {
        article.style.setProperty('--corner-svg', `url(corners/corner${Math.floor(Math.random() * config.corners)}.svg)`);
    });
});

document.addEventListener('scroll', () => {
    let header = '';
    document.querySelectorAll('section').forEach((section) => {
        let viewPortHeight = section.getBoundingClientRect().y / window.innerHeight;
        if (0.5 < viewPortHeight) {
            return;
        }
        header = section.getAttribute('id');
    })
    setTargetHeader(header);
})

setInterval(() => {
    let currentHeader = document.querySelector('#current-header').textContent;
    if (targetHeader === currentHeader) {
        return;
    }

    if (targetHeader.length !== currentHeader.length) {
        console.error(`length of '${targetHeader}' and '${currentHeader}' do not match`);
        return;
    }

    let diff = Array.from(Array(targetHeader.length).keys()).map((index) => targetHeader[index] !== currentHeader[index]);

    currentHeader = Array.from(currentHeader);
    diff.forEach((change, index) => {
        if (!change) {
            return;
        }

        if (currentHeader[index] === fillChar) {
            currentHeader[index] = 'A';
            return;
        }

        if (currentHeader[index] === 'Z') {
            currentHeader[index] = fillChar;
            return;
        }

        currentHeader[index] = String.fromCharCode(currentHeader[index].charCodeAt(0) + 1)[0];
    })

    document.querySelector('#current-header').textContent = currentHeader.join('');
}, 25)