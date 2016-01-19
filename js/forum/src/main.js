import { extend } from 'flarum/extend';
import PostMeta from 'flarum/components/PostMeta';
import CommentPost from 'flarum/components/CommentPost';
import Post from 'flarum/models/Post';
import Model from 'flarum/Model';

app.initializers.add('hyn-guardian', app => {
    Object.assign(Post.prototype, {
        user_ip: Model.attribute('user_ip')
    });
    extend(CommentPost.prototype, 'headerItems', function(items) {
        if(this.props.post.user_ip()) {
            items.add('guardian', m('div', {className: 'PostGuardian PostMeta'}, [
                this.props.post.user_ip()
            ]));
        }

        return items;
    });
});
