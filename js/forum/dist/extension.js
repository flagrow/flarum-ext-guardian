System.register('hyn/guardian/main', ['flarum/extend', 'flarum/components/PostMeta', 'flarum/components/CommentPost', 'flarum/models/Post', 'flarum/Model'], function (_export) {
    'use strict';

    var extend, PostMeta, CommentPost, Post, Model;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsPostMeta) {
            PostMeta = _flarumComponentsPostMeta['default'];
        }, function (_flarumComponentsCommentPost) {
            CommentPost = _flarumComponentsCommentPost['default'];
        }, function (_flarumModelsPost) {
            Post = _flarumModelsPost['default'];
        }, function (_flarumModel) {
            Model = _flarumModel['default'];
        }],
        execute: function () {

            app.initializers.add('hyn-guardian', function (app) {
                babelHelpers._extends(Post.prototype, {
                    user_ip: Model.attribute('user_ip')
                });
                extend(CommentPost.prototype, 'headerItems', function (items) {
                    if (this.props.post.user_ip()) {
                        items.add('guardian', m('div', { className: 'PostGuardian PostMeta' }, [this.props.post.user_ip()]));
                    }

                    return items;
                });
            });
        }
    };
});