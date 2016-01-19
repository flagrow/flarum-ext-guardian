<?php

namespace Flagrow\Guardian\Controllers;

use Flarum\Core\User;
use Flarum\Http\Controller\ControllerInterface;
use Flagrow\Guardian\Checks\Users\Ip;
use Psr\Http\Message\ServerRequestInterface;

class UserCheckController implements ControllerInterface
{
    /**
     * @param ServerRequestInterface $request
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function handle(ServerRequestInterface $request)
    {
        $userId = array_get($request->getQueryParams(), 'id');

        $testCheck = new Ip(User::find($userId));
        $testCheck->run();

        return json_encode($testCheck->getReport());
    }
}
