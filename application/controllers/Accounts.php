<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Accounts extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('Main_model');
    }

    public function index()
    {
        $data['guid'] = $this->Main_model->createGuid();

        $params['viewName'] = 'accounts';
        $params['pageTitle'] = '';
        $params['renderedData'] = $data;

        $this->load->library('view_manipulation', $params);
        $this->view_manipulation->renderViewWithLayout();
    }
}
