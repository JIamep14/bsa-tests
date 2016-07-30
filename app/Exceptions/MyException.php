<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 24.07.2016
 * Time: 17:13
 */

namespace App\Exceptions;


class MyException extends \Exception
{
    public function __construct($message, $code = 0, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}

