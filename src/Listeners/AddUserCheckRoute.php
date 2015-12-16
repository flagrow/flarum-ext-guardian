<?php

namespace Hyn\Guardian\Listeners;

use Flarum\Event\ConfigureApiRoutes;
use Hyn\Guardian\Controllers\UserCheckController;
use Illuminate\Contracts\Events\Dispatcher;

class AddUserCheckRoute
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'configureRoute']);
    }

    public function configureRoute(ConfigureApiRoutes $event)
    {
        $event->get('/guardian/u/check/{user_id}', 'guardian.user.check', UserCheckController::class);
    }
}