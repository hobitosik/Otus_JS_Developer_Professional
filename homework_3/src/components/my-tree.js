const tplTree = document.createElement('template');
tplTree.innerHTML = `
    <style>
        .tree {
            background: brown;
            width: 15px;
            height: 125px;
            padding: 5px;
            border: 1px solid grey;
            margin: 10px 25px;
            text-align: center;
            color: yellow;
        }
    </style>
    <div class="tree">
        <slot name="treeId"></slot>
        <slot></slot>
    </div>`;

class MyTree extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback(){
        this.shadowRoot.appendChild(tplTree.content.cloneNode(true));
        let treeEl = this.shadowRoot.querySelector('slot[name="treeId"]');
        treeEl.innerHTML = this.getAttribute('treeId')
    }
}

customElements.get('my-tree') || customElements.define('my-tree', MyTree)
