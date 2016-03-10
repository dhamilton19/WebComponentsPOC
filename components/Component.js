export default (styles, template, tag) => {
    const component = Object.create(HTMLElement.prototype);

    component.createdCallback = function() {
        const rootNode = this.createShadowRoot();

        const containerNode = document.createElement('div');
        containerNode.innerHTML = template;

        const styleNode = document.createElement('style');
        styleNode.innerHTML = styles.toString();

        const clonedNode = document.importNode(containerNode, true);

        rootNode.appendChild(styleNode);
        rootNode.appendChild(clonedNode);
    };

    const Element = document.registerElement(tag, {
        prototype: component
    });

    return new Element();
}