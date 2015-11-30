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
            icon: 'guardian',
            children: app.translator.trans('hyn-guardian.admin.nav.guardian_button'),
            description: app.translator.trans('hyn-guardian.admin.nav.guardian_text')
          }));
        });
      });
    }
  };
});;
System.register('hyn/guardian/components/GuardianPage', ['flarum/Component', 'flarum/components/Button'], function (_export) {

  //import EditTagModal from 'flarum/tags/components/EditTagModal';
  //import TagSettingsModal from 'flarum/tags/components/TagSettingsModal';
  //import tagIcon from 'flarum/tags/helpers/tagIcon';
  //import sortTags from 'flarum/tags/utils/sortTags';

  //function tagItem(tag) {
  //  return (
  //    <li data-id={tag.id()} style={{color: tag.color()}}>
  //      <div className="TagListItem-info">
  //        {tagIcon(tag)}
  //        <span className="TagListItem-name">{tag.name()}</span>
  //        {Button.component({
  //          className: 'Button Button--link',
  //          icon: 'pencil',
  //          onclick: () => app.modal.show(new EditTagModal({tag}))
  //        })}
  //      </div>
  //      {!tag.isChild() && tag.position() !== null ? (
  //        <ol className="TagListItem-children">
  //          {sortTags(app.store.all('tags'))
  //            .filter(child => child.parent() === tag)
  //            .map(tagItem)}
  //        </ol>
  //      ) : ''}
  //    </li>
  //  );
  //}

  'use strict';

  var Component, Button, GuardianPage;
  return {
    setters: [function (_flarumComponent) {
      Component = _flarumComponent['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
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
                { className: 'GuardianPage-header' },
                m(
                  'div',
                  { className: 'container' },
                  m(
                    'p',
                    null,
                    app.translator.trans('flarum-tags.admin.tags.about_tags_text')
                  ),
                  Button.component({
                    className: 'Button Button--primary',
                    icon: 'plus',
                    children: app.translator.trans('flarum-tags.admin.tags.create_tag_button'),
                    onclick: function onclick() {
                      return app.modal.show(new EditTagModal());
                    }
                  }),
                  Button.component({
                    className: 'Button',
                    children: app.translator.trans('flarum-tags.admin.tags.settings_button'),
                    onclick: function onclick() {
                      return app.modal.show(new TagSettingsModal());
                    }
                  })
                )
              ),
              m(
                'div',
                { className: 'TagsPage-list' },
                m(
                  'div',
                  { className: 'container' },
                  m(
                    'div',
                    { className: 'TagGroup' },
                    m(
                      'label',
                      null,
                      app.translator.trans('flarum-tags.admin.tags.primary_heading')
                    ),
                    m(
                      'ol',
                      { className: 'TagList TagList--primary' },
                      sortTags(app.store.all('tags')).filter(function (tag) {
                        return tag.position() !== null && !tag.isChild();
                      }).map(tagItem)
                    )
                  ),
                  m(
                    'div',
                    { className: 'TagGroup' },
                    m(
                      'label',
                      null,
                      app.translator.trans('flarum-tags.admin.tags.secondary_heading')
                    ),
                    m(
                      'ul',
                      { className: 'TagList' },
                      app.store.all('tags').filter(function (tag) {
                        return tag.position() === null;
                      }).sort(function (a, b) {
                        return a.name().localeCompare(b.name());
                      }).map(tagItem)
                    )
                  )
                )
              )
            );
          }
        }, {
          key: 'config',
          value: function config() {
            var _this = this;

            this.$('ol, ul').sortable({ connectWith: 'primary' }).on('sortupdate', function (e, ui) {
              // If we've moved a tag from 'primary' to 'secondary', then we'll update
              // its attributes in our local store so that when we redraw the change
              // will be made.
              if (ui.startparent.is('ol') && ui.endparent.is('ul')) {
                app.store.getById('tags', ui.item.data('id')).pushData({
                  attributes: {
                    position: null,
                    isChild: false
                  },
                  relationships: { parent: null }
                });
              }

              // Construct an array of primary tag IDs and their children, in the same
              // order that they have been arranged in.
              var order = _this.$('.TagList--primary > li').map(function () {
                return {
                  id: $(this).data('id'),
                  children: $(this).find('li').map(function () {
                    return $(this).data('id');
                  }).get()
                };
              }).get();

              // Now that we have an accurate representation of the order which the
              // primary tags are in, we will update the tag attributes in our local
              // store to reflect this order.
              order.forEach(function (tag, i) {
                var parent = app.store.getById('tags', tag.id);
                parent.pushData({
                  attributes: {
                    position: i,
                    isChild: false
                  },
                  relationships: { parent: null }
                });

                tag.children.forEach(function (child, j) {
                  app.store.getById('tags', child).pushData({
                    attributes: {
                      position: j,
                      isChild: true
                    },
                    relationships: { parent: parent }
                  });
                });
              });

              app.request({
                url: app.forum.attribute('apiUrl') + '/tags/order',
                method: 'POST',
                data: { order: order }
              });

              // A diff redraw won't work here, because sortable has mucked around
              // with the DOM which will confuse Mithril's diffing algorithm. Instead
              // we force a full reconstruction of the DOM.
              m.redraw.strategy('all');
              m.redraw();
            });
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
                app.store.models.user = User;

                //addTagsPermissionScope();
                //addTagPermission();
                addGuardianPane();
                addGuardianHomePageOption();
            });
        }
    };
});