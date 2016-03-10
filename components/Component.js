import capitalise from '../utils/capitalise';

export default class Component {

    static component = null;
    static proto = null;
    static tag = null;
    static styles = null;
    static template = null;
    static attributes = null;

    static registerComponent() {
        if(this.component){
            throw Error('Component already created');
        }

        this.proto = Object.create(HTMLElement.prototype);

        const styles = this.styles, template = this.template, attributes = this.attributes;

        this.proto.createdCallback = function(){
            const rootNode = this.createShadowRoot();

            const containerNode = document.createElement('div');
            containerNode.innerHTML = template;

            const styleNode = document.createElement('style');
            styleNode.innerHTML = styles.toString();

            const clonedNode = document.importNode(containerNode, true);

            for(let attribute of attributes){
                if (this.hasAttribute(attribute)
                    && typeof this['set' + capitalise(attribute)] ==='function') {
                    this['set' + capitalise(attribute)](this.getAttribute(attribute));
                }
            }

            rootNode.appendChild(styleNode);
            rootNode.appendChild(clonedNode);
        };

        this.setAttributes();

        this.component = document.registerElement(this.tag, {
            prototype: this.proto
        });

    }


    static setAttributes() {}
}