<?php

namespace Hyn\Guardian\Checks;

use SplEnum;

/**
 * Class State
 *
 * @package Hyn\Guardian\Checks
 */
class State extends SplEnum {

    const __default = self::UNKNOWN;

    const UNKNOWN = 1;

    const REQUIRES_CONFIGURATION = 2;

    const REQUIRES_RETRY = 3;

    const SUCCESS = 4;

    const FAILED = 5;
}