<?php

namespace Hyn\Guardian\Contracts;

use Hyn\Guardian\Checks\State;

interface CheckContract
{
    /**
     * Provides a detailed report of the check.
     *
     * @return mixed
     */
    public function getReport();

    /**
     * The score of the result, indicates severity.
     *
     * @return mixed
     */
    public function getScore();

    /**
     * Indicates the current state of the check.
     *
     * @return State
     */
    public function getState();

    /**
     * Runs the check.
     *
     * @return void
     */
    public function run();
}
