const PathService = require('./main');

const rawHTML = `<body>
<header><h1>Заголовок h1 документа</h1></header>
<div class="flex">
    <aside>
        <header>
            <h2 class="title">Заголовок левой колонки</h2>
        </header>
        <nav>
            <ul>
                <li><a href="#">Меню первый пункт</a></li>
                <li><a href="#">Меню второй пункт</a></li>
                <li><a href="#">Меню третий пункт</a></li>
                <li><a href="#">Меню четвертый пункт</a></li>
            </ul>
        </nav>
    </aside>
    <main id="content">
        <header><h2 class="title">Заголовок основного контента</h2></header>
        <div class="content">
            <div>
                <p><img class="left" src="https://picsum.photos/id/237/200/300" alt="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Augue neque gravida in fermentum et sollicitudin ac orci phasellus. Diam maecenas sed enim ut sem. Varius vel pharetra vel turpis. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis.</p>
                <p>Consectetur purus ut faucibus pulvinar elementum integer. Cursus sit amet dictum sit amet. Lectus nulla at volutpat diam ut venenatis tellus in metus. Semper risus in hendrerit gravida rutrum. Enim ut tellus elementum sagittis vitae et leo duis ut.</p>
                <ul>
                    <li>Integer nec odio</li>
                    <li>Praesent libero</li>
                    <li>Sed cursus ante dapibus diam</li>
                    <li>Sed nisi</li>
                    <li>Nulla quis sem at nibh elementum imperdiet</li>
                    <li>Duis sagittis ipsum</li>
                </ul>
            </div>
            <p>Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. </p>
            <ul>
                <li>Praesent mauris</li>
                <li>Fusce nec tellus sed augue semper porta</li>
                <li>Mauris massa</li>
                <li>Vestibulum lacinia arcu eget nulla</li>
            </ul>
            <div class="someclass_1 someclass_2">
                <h3>Sed lectus.</h3>
                <p><img class="right" src="https://picsum.photos/seed/picsum/200/300" alt="">Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. </p>
                <p>Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor.</p>
                <p>In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. <a href="#">Sed non quam.</a> Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. </p>
                <p>Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. </p>                    
            </div>
            <table>
                <tr>
                    <th>Lorem </th>
                    <th>Ipsum</th>
                    <th>dolor sit amet</th>
                </tr>
                <tr>
                    <th>consectetur</th>
                    <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. </td>
                    <td>Ex, incidunt! Ea architecto blanditiis, quis temporibus neque molestias officia incidunt perspiciatis necessitatibus, voluptas voluptates nam delectus nihil doloremque non debitis ut.</td>
                </tr>
                <tr>
                    <th></th>
                    <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat voluptate inventore dolores accusamus maiores voluptatibus? </td>
                    <td>Unde quibusdam nesciunt deleniti sunt esse, quas nihil saepe, mollitia ea odit dignissimos earum rerum.</td>
                </tr>
                <tr>
                    <td>Sunt, suscipit nihil dolore numquam eius autem voluptatum laboriosam odio mollitia aperiam tenetur nulla facere perferendis modi iste eum cumque incidunt corrupti?</td>
                    <td>Quisquam, rerum. Impedit excepturi saepe natus.</td>
                    <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
                </tr>
            </table>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae autem itaque voluptates, debitis eum natus tempora accusantium dolore. Alias corrupti dolore, blanditiis commodi inventore culpa? Necessitatibus accusamus velit ad nulla.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, laudantium consequuntur obcaecati quos est at repudiandae! Sed adipisci similique voluptates, id, vel dolor nostrum doloremque, dolores sint neque iure autem.</p>    
        </div>
    </main>
    <aside>
        <header>
            <h2 class="title">Заголовок правой колонки</h2>
        </header>
        <ul>
            <li><a href="#">Меню первый пункт</a></li>
            <li><a href="#">Меню второй пункт</a></li>
            <li><a href="#">Меню третий пункт</a></li>
            <li class="someclass_3"><a href="#">Меню четвертый пункт</a></li>
            <li><a href="#">Меню пятый пункт</a></li>
            <li class="someclass_3"><a href="#">Меню шестой пункт</a></li>
            <li><a href="#">Меню седьмой пункт</a></li>
            <li><a href="#">Меню восьмой пункт</a></li>
        </ul>
    </aside>
</div>
<footer>
    <p class="right">Разработано после уроков OTUS</p>
    <p class="left">Все права соблюдены. 2020</p>
</footer>
</body>`;
const parser = new DOMParser();
const doc = parser.parseFromString( rawHTML, 'text/html' );

test('getPath should find unique path for selector', () => {
    const service = new PathService()
    const element = doc.querySelector('#content div.someclass_1.someclass_2 h3 + p + p')
    const selector = service.getPath( element )
    console.log( 'unique selector: ->', selector )
    const amountOfElements = doc.querySelectorAll( selector ).length
    expect( amountOfElements ).toBe(1)
})

test('getPseudoClass should return ":first-child"', () => {
    const service = new PathService()
    document.body.innerHTML = `<ul>
        <li data-class="someclass_1"></li>
        <li data-class="someclass_2"></li>
        <li data-class="someclass_3"></li>
    </ul>`
    const pseudo = service.getPseudoClass( document.querySelector('[data-class="someclass_1"]') )
    expect( pseudo ).toMatch('li:first-child')
})

test('getPseudoClass should return ":last-child"', () => {
    const service = new PathService()
    document.body.innerHTML = `<ul>
        <li data-class="someclass_1"></li>
        <li data-class="someclass_2"></li>
        <li data-class="someclass_3"></li>
    </ul>`
    const pseudo = service.getPseudoClass( document.querySelector('[data-class="someclass_3"]') )
    expect( pseudo ).toMatch('li:last-child')
})

test('getPseudoClass should return tagName', () => {
    const service = new PathService()
    document.body.innerHTML = `<div>
        <h2></h2>
        <p></p>
        <h3></h3>
        <p></p>
    </div>`
    const pseudo = service.getPseudoClass( document.querySelector('h2') )
    expect( pseudo ).toMatch('h2')
})

test('getPseudoClass should return ":nth-child"', () => {
    const service = new PathService()
    document.body.innerHTML = `<ul>
        <li data-class="someclass_1"></li>
        <li data-class="someclass_1"></li>
        <li data-class="someclass_1"></li>
        <li data-class="someclass_2"></li>
        <li data-class="someclass_3"></li>
    </ul>`
    const pseudo = service.getPseudoClass( document.querySelector('[data-class="someclass_2"]') )
    expect( pseudo ).toMatch('li:nth-child(4)')
})

test('getPseudoClass should return ":nth-of-type"', () => {
    const service = new PathService()
    document.body.innerHTML = `<div>
        <h2></h2>
        <p></p>
        <h3></h3>
        <p></p><p></p><p></p>
    </div>`
    const pseudo = service.getPseudoClass( document.querySelector('h3+p+p') )
    expect( pseudo ).toMatch('p:nth-of-type(3)')
})
