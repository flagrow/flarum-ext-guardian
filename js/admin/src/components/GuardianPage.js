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
                <a href={app.forum.attribute('baseUrl') + "/u/" + user.username()}>
                    {user.username()}
                </a>
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
        this.sorting = 'username';
        this.offset = 0;

        this.queryList();
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
                <button onclick={this.previousPage(this)}>Previous</button>
                <button onclick={this.nextPage(this)}>Next</button>
            </div>
        );
    }
    queryList() {
        app.store.find('users',
            {sort: this.sorting, page: { limit: 50, offset: this.offset}}
        ).then(users => {
            this.users = users;
            m.redraw();
        });
    }
    previousPage(e) {
        this.offset--;
        if(this.offset < 0) this.offset = 0;

        //this.queryList();
    }
    nextPage(e) {
        console.log(e);
        this.offset++;

        //this.queryList();
    }
}
