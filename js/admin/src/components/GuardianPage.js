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
        <tr data-id={user.id()} className="PermissionGrid-child">
            <th>
                {user.username()}
            </th>
            <td>{humanTime(user.joinTime())}</td>
            <td>{humanTime(user.lastSeenTime())}</td>
            <td>{user.badges().toArray().length ? (
                <ul className="UserCard-badges badges">
                    {listItems(user.badges().toArray())}
                </ul>
            ) : ''}
            </td>
        </tr>
    );
}

export default class GuardianPage extends Component {
    init() {
        this.users = [];
        app.store.find('users').then(users => {
            this.users = users;
            m.redraw();
        });
    }
    view() {
        return (
            <div className="PermissionsPage container">
                <table className="PermissionGrid">
                    <thead>
                    <tr>
                        <td></td>
                        <th>{app.translator.trans('hyn-guardian.admin.grid.user.joined_at')}</th>
                        <th>{app.translator.trans('hyn-guardian.admin.grid.user.last_seen_at')}</th>
                        <th>{app.translator.trans('hyn-guardian.admin.grid.user.badges')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.users.map(userItem)}
                    </tbody>
                </table>
            </div>
        );
    }
}
