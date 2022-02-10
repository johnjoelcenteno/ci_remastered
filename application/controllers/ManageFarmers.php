<?php
defined('BASEPATH') or exit('No direct script access allowed');

class ManageFarmers extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('Main_model');
    }

    public function index()
    {
        $data['guid'] = $this->Main_model->createGuid();

        $params['viewName'] = 'manageFarmers';
        $params['pageTitle'] = '';
        $params['renderedData'] = $data;

        $this->load->library('view_manipulation', $params);
        $this->view_manipulation->renderViewWithLayout();
    }

    public function farmersList()
    {
        $this->db->select('*');
        $this->db->from('users');
        $this->db->join('province', 'users.province_id = province.province_id');
        $this->db->join('division', 'users.division_id = division.division_id');
        $this->db->where('is_employee', 0);
        $query = $this->db->get()->result_array();

        echo json_encode($query);
    }

    public function create()
    {
        $userId = $this->Main_model->createGuid();

        $resp = json_decode(file_get_contents('php://input'), true);

        $insertUser['users_id'] = $userId;
        $insertUser['firstname'] = ucwords($resp['firstname']);
        $insertUser['lastname'] = ucwords($resp['lastname']);
        $insertUser['fullname'] = ucwords($resp['firstname']) . " " . ucwords($resp['lastname']);
        $insertUser['province_id'] = $this->Main_model->get_where("province", "province_name", $resp['province_name'])->row()->province_id;
        $insertUser['division_id'] = $this->Main_model->get_where("division", "division_name", $resp['division_name'])->row()->division_id;
        $insertUser['credentials_id'] = "";
        $insertUser['is_employee'] = 0;
        $this->Main_model->_insert("users", $insertUser);
    }

    public function update()
    {
        $resp = json_decode(file_get_contents('php://input'));

        $usersId = $resp->users_id;

        $user['firstname'] = ucwords($resp->firstname);
        $user['lastname'] = ucwords($resp->lastname);
        $user['fullname'] = $user['firstname'] . " " . $user['lastname'];
        $user['contact_number'] = $resp->contact_number;
        $user['province_id'] = $this->Main_model->get_where("province", "province_name", $resp->province_name)->row()->province_id;
        $user['division_id'] = $this->Main_model->get_where("division", "division_name", $resp->division_name)->row()->division_id;
        $user['credentials_id'] = $resp->credentials_id;
        $user['is_employee'] = $resp->is_employee;

        $this->Main_model->_update("users", "users_id", $usersId, $user);
    }

    public function destroy()
    {
        $resp = json_decode(file_get_contents('php://input'));
        $this->Main_model->_delete("users", "users_id", $resp->users_id);
    }
}