const config = {
    links: {
        discord: 'https://example.com/discord',
        github: 'https://github.com/euclid9099',
        mail: 'mailto:mail@example.com',
        issues: 'https://github.com/euclid9099/portfolio/issues/new'
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a').forEach((link) => {
        if (!link.getAttribute('href')?.startsWith('config:')) return;

        link.setAttribute('href', config.links[link.getAttribute('href').split(':')[1]]);
    });
});