import template from "./template.html";
import styles from "./styles.css";

import Component from '../Component';

export default class Button extends Component {

    static tag = 'x-button';
    static styles = styles;
    static template = template;

    static setAttributes() {
        this.proto.setBar = function(value){
            console.log(value);
        }
    }

}