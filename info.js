const dialogs = {
    algorithms: {
        title: 'Algorithms 60%',
        introductory: 'I tried to use <a class="hyperlink" href="https://www.codewars.com/" target="_blank">Codewars</a> as measurement. I chose the most popular kata of each difficulty tagged with "Algorithm".',
        data: [
            ['Difficulty', 'Kata', 'Language', 'Points'],
            ['8kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/582cb0224e56e068d800003c" target="_blank">Keep Hydrated!</a>', 'python', '1 / 1'],
            ['7kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/65112af7056ad6004b5672f8" target="_blank">All or Nothing</a>', 'haskell', '2 / 2'],
            ['6kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/514b92a657cdc65150000006" target="_blank">Multiples of 3 or 5</a>', 'haskell', '3 / 3'],
            ['5kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/52597aa56021e91c93000cb0" target="_blank">Moving Zeros To The End</a>', 'rust', '4 / 4'],
            ['4kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1" target="_blank">Snail</a>', 'python', '5 / 5'],
            ['3kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7" target="_blank">Battleship field validator</a>', 'python', '6 / 6'],
            ['2kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/52a78825cdfc2cfc87000005" target="_blank">Evaluate mathematical expression</a>', '-', '0 / 7'],
            ['1kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/5265b0885fda8eac5900093b" target="_blank">Tiny Three-Pass Compiler</a>', '-', '0 / 8'],
            ['-', 'Self Judgement', '-', '3 / 4']
        ],
        conclusion: 'Total: 24 / 40'
    },
    functional: {
        title: 'Functional Programming 40%',
        introductory: 'I tried to use <a class="hyperlink" href="https://www.codewars.com/" target="_blank">Codewars</a> as measurement. I chose the most popular kata of each difficulty tagged with "Functional Programming".',
        data: [
            ['Difficulty', 'Kata', 'Language', 'Points'],
            ['8kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/55902c5eaa8069a5b4000083" target="_blank">Dollars and Cents</a>', 'elixir', '1 / 1'],
            ['7kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/582746fa14b3892727000c4f" target="_blank">Coding Meetup #1</a>', 'JS', '2 / 2'],
            ['6kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/582887f7d04efdaae3000090" target="_blank">Coding Meetup #7</a>', 'JS', '3 / 3'],
            ['5kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39" target="_blank">Calculating with Functions</a>', 'python', '4 / 4'],
            ['4kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/53cf7e37e9876c35a60002c9" target="_blank">Currying vs. Partial Application</a>', 'JS', '5 / 5'],
            ['3kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/5922543bf9c15705d0000020" target="_blank">Isomorphism</a>', '-', '0 / 6'],
            ['2kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/5470c635304c127cad000f0d" target="_blank">Regular expression parser</a>', '-', '0 / 7'],
            ['1kyu', '<a class="hyperlink" href="https://www.codewars.com/kata/545434090294935e7d0010ab" target="_blank">Functional SQL</a>', '-', '0 / 8'],
            ['-', 'Self Judgement', '-', '1 / 4']
        ],
        conclusion: 'Total: 16 / 40'
    },
    web: {
        title: 'Web development 46%',
        introductory: 'I compared (by self-judgement) my personal knowledge with the top five web frameworks based on the <a class="hyperlink" href="https://survey.stackoverflow.co/2023/#section-most-popular-technologies-web-frameworks-and-technologies" target="_blank">Stackoverflow developer survey 2023</a>.',
        data: [
            ['Framework', 'Experience', 'Points'],
            ['React', 'Used for several small projects', '2 / 4'],
            ['Node.js', 'As per my knowledge, it is basically just a JS runtime', '2  /4'],
            ['jQuery', 'I prefer vanilla JS, but I use it at work', '1 / 4'],
            ['Angular', 'We currently learn it at school', '2 / 4'],
            ['Express', 'I used it in school once, and used the similar framework "Oak" in Deno', '1 / 4'],
            ['-', 'JavaScript, TypeScript, deno, reactive frameworks, HTML & CSS', '3 / 4']
        ],
        conclusion: 'Total: 11 / 24'
    },
    project: {
        title: 'Project Management 75%',
        introductory: 'This is just based on my school grade and my personal impression',
        data: [
            ['School Grade', '4 / 4'],
            ['Personal judgement', '2 / 4']
        ],
        conclusion: 'Total: 6 / 8'
    }
}

const showDialog = (key) => {
    if (typeof key !== 'string') {
        console.error('Key must be a string');
        return;
    }

    if (dialogs[key] === undefined) {
        console.error('Dialog not found');
        return;
    }

    const dialog = document.getElementById('dialog');

    dialog.innerHTML = `<div id="dialog-content">
        <button id="dialog-close" class="button button-sm" onclick="dialog.close()"><span class="icon icon-close"></span></button>
        <h2>${dialogs[key].title}</h2>
        <p>${dialogs[key].introductory}</p>
        <div>
            <table>
                ${dialogs[key].data.map((row) => {
                    return `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`;
                }).join('')}
            </table>
        </div>
        <br>
        <p>${dialogs[key].conclusion}</p>
        <button class="button button-dynamic button-centered" onclick="dialog.close()">Close</button>
    </div>`
    dialog.onclick = (event) => {
        if (event.target === event.currentTarget) dialog.close();
    }
    dialog.showModal();
};