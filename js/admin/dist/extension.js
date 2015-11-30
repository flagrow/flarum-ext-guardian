System.register('hyn/guardian/addGuardianHomePageOption', ['flarum/extend', 'flarum/components/BasicsPage'], function (_export) {
  'use strict';

  var extend, BasicsPage;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsBasicsPage) {
      BasicsPage = _flarumComponentsBasicsPage['default'];
    }],
    execute: function () {
      _export('default', function () {
        extend(BasicsPage.prototype, 'homePageItems', function (items) {
          items.add('guardian', {
            path: '/guardian',
            label: app.translator.trans('hyn-guardian.admin.basics.guardian_label')
          });
        });
      });
    }
  };
});;
System.register('hyn/guardian/addGuardianPane', ['flarum/extend', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', 'hyn/guardian/components/GuardianPage'], function (_export) {
  'use strict';

  var extend, AdminNav, AdminLinkButton, GuardianPage;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsAdminNav) {
      AdminNav = _flarumComponentsAdminNav['default'];
    }, function (_flarumComponentsAdminLinkButton) {
      AdminLinkButton = _flarumComponentsAdminLinkButton['default'];
    }, function (_hynGuardianComponentsGuardianPage) {
      GuardianPage = _hynGuardianComponentsGuardianPage['default'];
    }],
    execute: function () {
      _export('default', function () {
        app.routes.guardian = { path: '/guardian', component: GuardianPage.component() };

        app.extensionSettings['hyn-guardian'] = function () {
          return m.route(app.route('guardian'));
        };

        extend(AdminNav.prototype, 'items', function (items) {
          items.add('guardian', AdminLinkButton.component({
            href: app.route('guardian'),
            icon: 'user-secret',
            children: app.translator.trans('hyn-guardian.admin.nav.guardian_button'),
            description: app.translator.trans('hyn-guardian.admin.nav.guardian_text')
          }));
        });
      });
    }
  };
});;
System.register('hyn/guardian/components/GuardianPage', ['flarum/Component', 'flarum/components/Button', 'flarum/utils/humanTime', 'flarum/utils/ItemList', 'flarum/helpers/avatar', 'flarum/helpers/username', 'flarum/helpers/icon', 'flarum/components/UserBio', 'flarum/components/AvatarEditor', 'flarum/helpers/listItems'], function (_export) {

    //import EditTagModal from 'flarum/tags/components/EditTagModal';
    //import TagSettingsModal from 'flarum/tags/components/TagSettingsModal';
    //import tagIcon from 'flarum/tags/helpers/tagIcon';
    //import sortTags from 'flarum/tags/utils/sortTags';

    'use strict';

    var Component, Button, humanTime, ItemList, avatar, username, icon, UserBio, AvatarEditor, listItems, GuardianPage;
    function userItem(user) {

        return m(
            'li',
            { 'data-id': user.id() },
            m(
                'div',
                { 'class': 'container' },
                m(
                    'span',
                    { className: 'GuardianUser-name' },
                    user.username()
                ),
                m(
                    'span',
                    { className: 'GuardianUser-badges' },
                    user.badges().toArray().length ? m(
                        'ul',
                        { className: 'UserCard-badges badges' },
                        listItems(user.badges().toArray())
                    ) : ''
                )
            )
        );
    }

    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent['default'];
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton['default'];
        }, function (_flarumUtilsHumanTime) {
            humanTime = _flarumUtilsHumanTime['default'];
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList['default'];
        }, function (_flarumHelpersAvatar) {
            avatar = _flarumHelpersAvatar['default'];
        }, function (_flarumHelpersUsername) {
            username = _flarumHelpersUsername['default'];
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon['default'];
        }, function (_flarumComponentsUserBio) {
            UserBio = _flarumComponentsUserBio['default'];
        }, function (_flarumComponentsAvatarEditor) {
            AvatarEditor = _flarumComponentsAvatarEditor['default'];
        }, function (_flarumHelpersListItems) {
            listItems = _flarumHelpersListItems['default'];
        }],
        execute: function () {
            GuardianPage = (function (_Component) {
                babelHelpers.inherits(GuardianPage, _Component);

                function GuardianPage() {
                    babelHelpers.classCallCheck(this, GuardianPage);
                    babelHelpers.get(Object.getPrototypeOf(GuardianPage.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(GuardianPage, [{
                    key: 'view',
                    value: function view() {
                        return m(
                            'div',
                            { className: 'GuardianPage' },
                            m(
                                'div',
                                { className: 'GuardianPage-list' },
                                m(
                                    'div',
                                    { className: 'container' },
                                    m(
                                        'ul',
                                        null,
                                        app.store.all('users').map(userItem)
                                    )
                                )
                            )
                        );
                    }
                }]);
                return GuardianPage;
            })(Component);

            _export('default', GuardianPage);
        }
    };
});;
System.register('hyn/guardian/main', ['flarum/core/models/User', 'hyn/guardian/addGuardianPane', 'hyn/guardian/addGuardianHomePageOption'], function (_export) {
    //import addTagsPermissionScope from 'flarum/tags/addTagsPermissionScope';
    //import addTagPermission from 'flarum/tags/addTagPermission';
    'use strict';

    var User, addGuardianPane, addGuardianHomePageOption;
    return {
        setters: [function (_flarumCoreModelsUser) {
            User = _flarumCoreModelsUser['default'];
        }, function (_hynGuardianAddGuardianPane) {
            addGuardianPane = _hynGuardianAddGuardianPane['default'];
        }, function (_hynGuardianAddGuardianHomePageOption) {
            addGuardianHomePageOption = _hynGuardianAddGuardianHomePageOption['default'];
        }],
        execute: function () {

            app.initializers.add('hyn-guardian', function (app) {
                //addTagsPermissionScope();
                //addTagPermission();
                addGuardianPane();
                addGuardianHomePageOption();
            });
        }
    };
});