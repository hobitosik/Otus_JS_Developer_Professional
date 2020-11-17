const tplLeaf = document.createElement('template');
tplLeaf.innerHTML = `
    <style>
        .leaf {
            position: relative;
            z-index:1;
            background: green;
            width: 15px;
            height: 25px;
            padding: 5px;
            margin: 5px 15px;
            border-radius: 0 15px 5px 15px;
            text-align: center;
            color: white;
        }
    </style>
    <div class="leaf"></div>
`;

class MyLeaf extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback(){
        this.shadowRoot.appendChild(tplLeaf.content.cloneNode(true));
        let leafEl = this.shadowRoot.querySelector('.leaf');
        leafEl.innerHTML = this.getAttribute('leafId')
    }
}

customElements.get('my-leaf') || customElements.define('my-leaf', MyLeaf)
