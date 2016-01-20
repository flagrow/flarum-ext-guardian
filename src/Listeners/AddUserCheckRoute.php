<?php

/*
 * This file is part of flagrow/flarum-ext-guardian.
 *
 * Copyright (c) Flagrow.
 *
 * http://flagrow.github.io
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

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
