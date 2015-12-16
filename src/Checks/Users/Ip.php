<?php

namespace Hyn\Guardian\Checks\Users;

use Flarum\Core\User;
use Hyn\Guardian\Abstracts\AbstractCheck;
use Hyn\Guardian\Checks\State;

class Ip extends AbstractCheck
{
    /**
     * @var User
     */
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Provides a detailed report of the check.
     *
     * @return mixed
     */
    public function getReport()
    {
        // TODO: Implement getReport() method.
    }

    /**
     * The score of the result, indicates severity.
     *
     * @return mixed
     */
    public function getScore()
    {
        // TODO: Implement getScore() method.
    }

    /**
     * Indicates the current state of the check.
     *
     * @return State
     */
    public function getState()
    {
        // TODO: Implement getState() method.
    }

    /**
     * Executes the check.
     *
     * @return void
     */
    public function execute()
    {
        // TODO: Implement execute() method.
    }
}