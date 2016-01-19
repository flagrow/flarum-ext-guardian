<?php

namespace Flagrow\Guardian\Listeners;

use DirectoryIterator;
use Flarum\Api\Serializer\PostSerializer;
use Flarum\Event\ConfigureClientView;
use Flarum\Event\ConfigureLocales;
use Flarum\Event\PrepareApiAttributes;
use Illuminate\Contracts\Events\Dispatcher;

/**
 * Class AddClientAssets.
 */
class AddClientAssets
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'addAssets']);
        $events->listen(ConfigureLocales::class, [$this, 'addLocales']);
        $events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
    }

    /**
     * @param ConfigureClientView $event
     */
    public function addAssets(ConfigureClientView $event)
    {
        if ($event->isAdmin()) {
            $event->addAssets([
                __DIR__.'/../../js/admin/dist/extension.js',
                __DIR__.'/../../less/admin/extension.less',
            ]);

            $event->addBootstrapper('hyn/guardian/main');
        }

        if ($event->isForum()) {
            $event->addAssets([
                __DIR__.'/../../js/forum/dist/extension.js',
            ]);

            $event->addBootstrapper('hyn/guardian/main');
        }
    }

    /**
     * @param ConfigureLocales $event
     */
    public function addLocales(ConfigureLocales $event)
    {
        foreach (new DirectoryIterator(__DIR__.'/../../locale') as $file) {
            if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'])) {
                $event->locales->addTranslations($file->getBasename('.'.$file->getExtension()), $file->getPathname());
            }
        }
    }

    /**
     * @param PrepareApiAttributes $event
     */
    public function prepareApiAttributes(PrepareApiAttributes $event)
    {
        if ($event->isSerializer(PostSerializer::class) && $event->actor->can('guard', $event->model)) {
            $event->attributes['user_ip'] = $event->model->ip_address;
        }
    }
}
