<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Credentials_model extends CI_Model
{
    function accessGranted()
    {
        if (!isset($_SESSION['credentials_id'])) {
            session_destroy();
            redirect("SignIn");
        }
    }

    function getUserId()
    {
        $userTable = $this->Main_model->get_where('employee', 'credentials_id', $_SESSION['credentials_id'])->row();

        return $userTable->employee_id;
    }

    function getUserType()
    {
        $credentialsTable = $this->Main_model->get_where('credentials', 'credentials_id', $_SESSION['credentials_id'])->row();

        return $credentialsTable->user_type;
    }

    function getProvinceDivision()
    {
        $userId = $this->getUserId();

        $this->db->select('*');
        $this->db->from("users");
        $this->db->join("province", "users.province_id = province.province_id");
        $this->db->join("division", "division.division_id = users.division_id");
        $this->db->where("users_id", $userId);
        return $this->db->get();
    }
}
