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

namespace Flagrow\Guardian\Abstracts;

use Flagrow\Guardian\Checks\State;
use Flagrow\Guardian\Contracts\CheckContract;

abstract class AbstractCheck implements CheckContract
{
    /**
     * @var array
     */
    protected $report = [];

    /**
     * @var int
     */
    protected $score = 0;

    /**
     * @var State
     */
    protected $state;

    public function __construct()
    {
        $this->report['timing'] = [];
        $this->report['timing']['init'] = microtime(true);
    }

    /**
     * Runs the check.
     */
    public function run()
    {
        $this->report['timing']['start'] = microtime(true);

        $this->execute();

        $this->report['timing']['end'] = microtime(true);
    }

    /**
     * Provides a detailed report of the check.
     *
     * @return mixed
     */
    public function getReport()
    {
        return $this->report;
    }

    /**
     * The score of the result, indicates severity.
     *
     * @return mixed
     */
    public function getScore()
    {
        return $this->score;
    }

    /**
     * Indicates the current state of the check.
     *
     * @return State
     */
    public function getState()
    {
        return $this->state ? $this->state : new State();
    }
}
