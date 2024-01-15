const config = {
    links: {
        discord: 'https://example.com/discord',
        github: 'https://github.com/euclid9099',
        mail: 'mailto:mail@example.com',
        issues: 'https://github.com/euclid9099/portfolio/issues/new',
        school: 'https://example.org/school'
    }
}

let targetHeader = ''
let longestHeaderLength = 0;

let fillChar = '_';

const setTargetHeader = (value) => {
    if (typeof value !== 'string') {
        console.error('Can not set target header to anything other than string');
        return;
    }

    targetHeader = value.toUpperCase().replace(/[^A-Z]/g, fillChar).padEnd(longestHeaderLength, fillChar)
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a').forEach((link) => {
        if (!link.getAttribute('href')?.startsWith('config:')) return;

        link.setAttribute('href', config.links[link.getAttribute('href').split(':')[1]]);
    });

    longestHeaderLength = Array.from(document.querySelectorAll('section'))
        .map(section => section.getAttribute('id').length)
        .reduce((max, number) => Math.max(max, number));
    document.querySelector('#current-header').textContent = '-'.repeat(longestHeaderLength);
    setTargetHeader(document.querySelector('section').id);
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