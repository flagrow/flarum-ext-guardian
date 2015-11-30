import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import humanTime from 'flarum/utils/humanTime';
import ItemList from 'flarum/utils/ItemList';
import avatar from 'flarum/helpers/avatar';
import username from 'flarum/helpers/username';
import icon from 'flarum/helpers/icon';
import UserBio from 'flarum/components/UserBio';
import AvatarEditor from 'flarum/components/AvatarEditor';
import listItems from 'flarum/helpers/listItems';

//import EditTagModal from 'flarum/tags/components/EditTagModal';
//import TagSettingsModal from 'flarum/tags/components/TagSettingsModal';
//import tagIcon from 'flarum/tags/helpers/tagIcon';
//import sortTags from 'flarum/tags/utils/sortTags';

function userItem(user) {

    return (
        <li data-id={user.id()}>
            <div class="container">
                <span className="GuardianUser-name">{user.username()}</span>
                <span className="GuardianUser-badges">
                    {user.badges().toArray().length ? (
                        <ul className="UserCard-badges badges">
                            {listItems(user.badges().toArray())}
                        </ul>
                    ) : ''}
                </span>
            </div>
        </li>
    );
}

export default class GuardianPage extends Component {
    view() {
        return (
            <div className="GuardianPage">
                <div className="GuardianPage-list">
                    <div className="container">
                        <ul>
                            {app.store.all('users').map(userItem)}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
