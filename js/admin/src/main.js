import { extend } from 'flarum/extend';
import PermissionGrid from 'flarum/components/PermissionGrid';
import addGuardianPane from 'hyn/guardian/addGuardianPane';

app.initializers.add('hyn-guardian', app => {
    /**
     * Add the admin pane to Flarum for Guardian.
     */
    addGuardianPane();

    /**
     * Add permission to the Grid.
     */
    extend(PermissionGrid.prototype, 'useGuardian', items => {
        items.add('useGuardian', {
            icon: 'user-secret',
            label: 'Allow usage of Guardian',
            permission: 'hyn.guardian.useGuardian'
        }, 65);
    });
});
