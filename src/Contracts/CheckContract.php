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

namespace Flagrow\Guardian\Contracts;

use Flagrow\Guardian\Checks\State;

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
