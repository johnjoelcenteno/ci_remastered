<?php
defined('BASEPATH') or exit('No direct script access allowed');

class SignIn extends CI_Controller
{

	function __construct()
	{
		parent::__construct();
		$this->load->model('Main_model');
	}

	public function index()
	{
		$this->load->view('authentication/auth_header');
		$this->load->view('authentication/login');
		$this->load->view('authentication/auth_footer');
	}

	public function postLogin()
	{
		$data['username'] = $this->input->post("username");
		$data['password'] = $this->Main_model->passwordEncryptor($this->input->post("password"));
		$result = $this->Main_model->multiple_where("credentials",  $data);

		if ($result) {
			$result = $result->row();
			$this->session->set_userdata("credentials_id", $result->credentials_id);

			echo "1";
		} else {
			echo "0";
		}
	}
}
