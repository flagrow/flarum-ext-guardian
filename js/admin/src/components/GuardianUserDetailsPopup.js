import Modal from 'flarum/components/Modal';

export default class GuardianUserDetailsPopup extends Modal {

    init() {
        this.user = this.props.user;
        super.init();
    }

    title() {
        return this.user.username();
    }

    className() {
        return 'EditTagModal Modal--large';
    }

    content() {

    }
}