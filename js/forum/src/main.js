import { extend } from 'flarum/extend';
import CommentPost from 'flarum/components/CommentPost';
import Post from 'flarum/models/Post';
import Model from 'flarum/Model';
import icon from 'flarum/helpers/icon';

app.initializers.add('hyn-guardian', app => {
    // extend the Post object to add the user_ip
    Object.assign(Post.prototype, {
        user_ip: Model.attribute('user_ip')
    });
    // extend the CommentPost
    extend(CommentPost.prototype, 'headerItems', function(items) {
        if(this.props.post.user_ip()) {
            items.add('guardian', m('div', {className: 'PostGuardian PostMeta Dropdown'}, [
                m('a', {className: 'Dropdown-toggle', 'data-toggle': 'dropdown'}, [
                    icon('user-secret')
                ]),
                m('div', {className: 'Dropdown-menu dropdown-menu'}, [
                    m('span', [
                        icon('wifi'),
                        this.props.post.user_ip()
                    ])
                ])
            ]));
        }

        return items;
    });
});
