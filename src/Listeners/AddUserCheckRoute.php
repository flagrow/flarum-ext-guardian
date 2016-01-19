<?php

namespace Flagrow\Guardian\Listeners;

use Flarum\Event\ConfigureApiRoutes;
use Flagrow\Guardian\Controllers\UserCheckController;
use Illuminate\Contracts\Events\Dispatcher;

class AddUserCheckRoute
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'configureApiRoutes']);
    }

    public function configureApiRoutes(ConfigureApiRoutes $event)
    {
        $event->get('/guardian/u/check/{id}', 'guardian.user.check', UserCheckController::class);
    }
}
