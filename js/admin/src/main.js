import User from 'flarum/core/models/User';
//import addTagsPermissionScope from 'flarum/tags/addTagsPermissionScope';
//import addTagPermission from 'flarum/tags/addTagPermission';
import addGuardianPane from 'hyn/guardian/addGuardianPane';
import addGuardianHomePageOption from 'hyn/guardian/addGuardianHomePageOption';

app.initializers.add('hyn-guardian', app => {
    app.store.models.user = User;

    //addTagsPermissionScope();
    //addTagPermission();
    addGuardianPane();
    addGuardianHomePageOption();
});
