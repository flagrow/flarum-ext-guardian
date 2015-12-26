import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import humanTime from 'flarum/utils/humanTime';
import username from 'flarum/helpers/username';
import icon from 'flarum/helpers/icon';
import listItems from 'flarum/helpers/listItems';
import GuardianUserDetailsPopup from 'hyn/guardian/components/GuardianUserDetailsPopup';

function userItem(user) {
    return m('tr', {dataId: user.id(), className: 'PermissionGrid-child'}, [
        m('th', [
            m('a', {href: app.forum.attribute('baseUrl') + '/u/' + user.username()}, user.username())
        ]),
        m('td', humanTime(user.joinTime())),
        m('td', user.lastSeenTime() ? humanTime(user.lastSeenTime()) : app.translator.trans('hyn-guardian.admin.grid.user.states.never_visited')),
        m('td', user.isActivated() ? icon('check') : icon('close')),
        m('td', user.badges().toArray().length ? m('ul', {className: 'UserCard-badges badges'}, listItems(user.badges().toArray())) : ''),
        m('td', {
            style: {'text-align': 'right'}
        }, [
            m('button', {className: 'Button Button-Default', onclick: () =>  app.modal.show(new GuardianUserDetailsPopup({user}))}, app.translator.trans('hyn-guardian.admin.grid.user.details'))
        ])
    ]);
}

export default class GuardianPage extends Component {
    init() {
        this.users = [];
        this.sorting = 'username';
        this.offset = 0;
        this.limit = 20;

        this.oldOffset = null;

        this.queryList();
    }

    view() {
        return m('div', {className: 'PermissionsPage container'}, [
            m('table', {className: 'PermissionGrid'}, [
                m('thead', [
                    m('tr', [
                        m('th', ''),
                        m('th', app.translator.trans('hyn-guardian.admin.grid.user.joined_at')),
                        m('th', app.translator.trans('hyn-guardian.admin.grid.user.last_seen_at')),
                        m('th', app.translator.trans('hyn-guardian.admin.grid.user.activated')),
                        m('th', app.translator.trans('hyn-guardian.admin.grid.user.badges')),
                        m('th', '')
                    ])
                ]),
                m('tbody', this.users.map(userItem)),
                m('tfoot', [
                    m('tr', [
                        m('td', {colspan: 3}, [
                            m('button', {
                                className: 'Button Button-Default',
                                onclick: this.movePage.bind(this, -1)
                            }, 'Previous'),
                        ]),
                        m('td', {
                            colspan: 3,
                            style: {'text-align': 'right'}
                        }, [
                            m('button', {
                                className: 'Button Button-Default Pull-Right',
                                onclick: this.movePage.bind(this, 1)
                            }, 'Next')
                        ])
                    ])
                ])
            ])
        ]);
    }

    queryList() {
        app.store.find('users',
            {sort: this.sorting, page: {limit: this.limit, offset: this.offset}}
        ).then(users => {
            if (users.length > 0) {
                this.users = users;
                m.redraw();
            } else {
                this.offset = this.oldOffset;
            }
        });
    }

    movePage(direction) {
        this.oldOffset = this.offset;
        this.offset = this.offset + (direction * this.limit);

        if (this.offset < 0) {
            this.offset = 0;
        }

        this.queryList();
    }
}
