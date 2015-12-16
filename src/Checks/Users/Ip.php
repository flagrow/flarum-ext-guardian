<?php

namespace Hyn\Guardian\Checks\Users;

use Flarum\Core\User;
use Hyn\Guardian\Abstracts\AbstractCheck;

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
     * @return void
     */
    public function execute()
    {
        $ips = $this->user->posts()->whereNotNull('ip_address')->lists('ip_address');

        $this->report['locations'] = "Ip's used: " . count($ips);
        $this->report['related']   = [];

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