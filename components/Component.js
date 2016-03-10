import capitalise from '../utils/capitalise';

export default class Component {

    static component = null;
    static proto = null;
    static tag = null;
    static styles = null;
    static template = null;

    static registerComponent() {
        if(this.component){
            throw Error('Component already created');
        }

        this.proto = Object.create(HTMLElement.prototype);

        const styles = this.styles, template = this.template;

        this.proto.createdCallback = function(){
            const rootNode = this.createShadowRoot();

            const containerNode = document.createElement('div');
            containerNode.innerHTML = template;

            const styleNode = document.createElement('style');
            styleNode.innerHTML = styles.toString();

            const clonedNode = document.importNode(containerNode, true);

            Array.prototype.slice.call(this.attributes).forEach((attribute) => {
                const func = this['set' + capitalise(attribute.name)];
                if (typeof func ==='function') {
                    func(attribute.value);
                }
            });

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