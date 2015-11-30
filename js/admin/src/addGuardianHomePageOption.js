import { extend } from 'flarum/extend';
import BasicsPage from 'flarum/components/BasicsPage';

export default function() {
  extend(BasicsPage.prototype, 'homePageItems', items => {
    items.add('guardian', {
      path: '/guardian',
      label: app.translator.trans('hyn-guardian.admin.basics.guardian_label')
    });
  });
}
