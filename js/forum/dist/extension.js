System.register('hyn/guardian/main', ['flarum/extend', 'flarum/components/CommentPost', 'flarum/models/Post', 'flarum/Model', 'flarum/helpers/icon'], function (_export) {
    'use strict';

    var extend, CommentPost, Post, Model, icon;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsCommentPost) {
            CommentPost = _flarumComponentsCommentPost['default'];
        }, function (_flarumModelsPost) {
            Post = _flarumModelsPost['default'];
        }, function (_flarumModel) {
            Model = _flarumModel['default'];
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon['default'];
        }],
        execute: function () {

            app.initializers.add('hyn-guardian', function (app) {
                // extend the Post object to add the user_ip
                babelHelpers._extends(Post.prototype, {
                    user_ip: Model.attribute('user_ip')
                });
                // extend the CommentPost
                extend(CommentPost.prototype, 'headerItems', function (items) {
                    if (this.props.post.user_ip()) {
                        items.add('guardian', m('div', { className: 'PostGuardian PostMeta Dropdown' }, [m('a', { className: 'Dropdown-toggle', 'data-toggle': 'dropdown' }, [icon('user-secret')]), m('div', { className: 'Dropdown-menu dropdown-menu' }, [m('span', [icon('wifi'), this.props.post.user_ip()])])]));
                    }

                    return items;
                });
            });
        }
    };
});