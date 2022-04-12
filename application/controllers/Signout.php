<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Signout extends CI_Controller
{
    public function index()
    {
        session_destroy();
        echo "success";
    }
}
