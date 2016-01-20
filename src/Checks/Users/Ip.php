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

namespace Flagrow\Guardian\Checks\Users;

use Flarum\Core\User;
use Flagrow\Guardian\Abstracts\AbstractCheck;

class Ip extends AbstractCheck
{
    /**
     * @var User
     */
    protected $user;

    public function __construct(User $user)
    {
        parent::__construct();

        $this->user = $user;
    }

    /**
     * Executes the check.
     *
     * @todo use only one query, instead of the two seperate queries
     *
     * @return void
     */
    protected function execute()
    {
        $ips = $this->user->posts()->whereNotNull('ip_address')->lists('ip_address');

        $this->report['locations'] = "Ip's used: ".count($ips);
        $this->report['related'] = [];

        User::whereHas('posts', function ($q) use ($ips) {
            $q->whereIn('ip_address', $ips);
        })
            ->where('id', '!=', $this->user->id)
            ->chunk(10, function ($users) {
                foreach ($users as $user) {
                    $this->report['related'][] = $user->toJson();
                }
            });
    }
}
