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

namespace Flagrow\Guardian\Checks;

use SplEnum;

/**
 * Class State.
 */
class State extends SplEnum
{
    const __default = self::UNKNOWN;

    const UNKNOWN = 1;

    const REQUIRES_CONFIGURATION = 2;

    const REQUIRES_RETRY = 3;

    const SUCCESS = 4;

    const FAILED = 5;
}
