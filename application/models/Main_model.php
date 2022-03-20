<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Main_model extends CI_Model
{
	function createGuid()
	{
		if (function_exists('com_create_guid') === true) {
			return trim(com_create_guid(), '{}');
		}

		return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
	}

	public function getPenroByOfficeId($officeId)
	{
		return $this->Main_model->get_where("offices", "office_id", $officeId)->row()->province;
	}


	function generateRandomString($strength)
	{
		$permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

		$input_length = strlen($permitted_chars);
		$random_string = '';
		for ($i = 0; $i < $strength; $i++) {
			$random_character = $permitted_chars[mt_rand(0, $input_length - 1)];
			$random_string .= $random_character;
		}

		return $random_string;
	}

	function deactivateActivators()
	{
		//SET PAGE ACTIVATORS
		$data['active1'] = null;
		$data['active2'] = null;
		$data['active3'] = null;
		$data['active4'] = null;
		$data['active5'] = null;
		$data['active6'] = null;
		$data['active7'] = null;
		$data['active8'] = null;
		$data['active8'] = null;
		$data['active9'] = null;
		$data['active10'] = null;
		$this->session->set_userdata($data);
	}

	function activateCurrentNav($x)
	{
		$this->deactivateActivators();
		switch ($x) {
			case 1:
				$this->session->set_userdata('active1', 'active');
				break;
			case 2:
				$this->session->set_userdata('active2', 'active');
				break;
			case 3:
				$this->session->set_userdata('active3', 'active');
				break;

			case 4:
				$this->session->set_userdata('active4', 'active');
				break;
			case 5:
				$this->session->set_userdata('active5', 'active');
				break;
			case 6:
				$this->session->set_userdata('active6', 'active');
				break;
			case 7:
				$this->session->set_userdata('active7', 'active');
				break;

			case 8:
				$this->session->set_userdata('active8', 'active');
				break;
			case 9:
				$this->session->set_userdata('active9', 'active');
				break;
			default:
				# code...
				break;
		}
	}

	function get($table, $order_by)  //ascending order
	{
		$this->db->order_by($order_by, "desc");
		$query = $this->db->get($table);
		return $query;
	}

	function getFullName($table, $column, $teacherId)
	{
		$table = $this->get_where($table, $column, $teacherId);
		if (count($table->result_array()) == 0) return null;
		$table = $table->row();
		return "$table->firstname $table->middlename $table->lastname";
	}

	function getFullNameSliced($table, $column, $teacherId)
	{
		$table = $this->Main_model->get_where($table, $column, $teacherId);

		if (count($table->result_array()) == 0) return Null;
		$table = $table->row();
		$data['firstname'] = $table->firstname;
		$data['middlename'] = $table->middlename;
		$data['lastname'] = $table->lastname;
		return $data;
	}

	function get_where($table, $db_column_name, $value)
	{
		$this->db->where($db_column_name, $value);
		$query = $this->db->get($table);
		return $query;
	}

	function get_where_limit($table, $db_column_name, $value, $limit)
	{
		$this->db->where($db_column_name, $value);
		$this->db->limit($limit);
		$query = $this->db->get($table)->result();
		return $query;
	}


	function multiple_where($table_name, $array)
	{
		$this->db->where($array);
		$query = $this->db->get($table_name);

		return $query;
	}

	function passwordEncryptor($string)
	{
		$string = hash('md5', $string);
		return $string;
	}

	function array_show($array)
	{
		echo "<pre>";
		print_r($array->result_array());
		echo "</pre>";
	}

	function seeAllSessions()
	{
		echo "<pre>" . print_r($_SESSION, true) . "</pre>";
	}

	function _insert($table_name, $data)
	{
		$table = $table_name;
		$this->db->insert($table, $data);
		// OPTIONAL: Return ID of inserted table for Reference purposes
		return $this->db->insert_id();
	}

	function _update($table_name, $column_id_name, $id, $data)
	{
		$table = $table_name;
		$this->db->where($column_id_name, $id);
		$this->db->update($table, $data);
	}

	function _multi_update($table_name, $where, $update)
	{
		$this->db->where($where);
		$this->db->update($table_name, $update);
	}

	function _delete($table, $column_id_name, $id)
	{
		$this->db->where($column_id_name, $id);
		$this->db->delete($table);
	}

	function multiple_delete($table, $data)
	{
		$this->db->delete($table, $data);
	}

	function showNormalArray($array)
	{
		echo "<pre>";
		print_r($array);
		echo "</pre>";
	}

	function alertPromt($message, $sessionName)
	{
		if (isset($_SESSION[$sessionName])) {
			echo '<script>alert("' . $message . '");</script>';
			unset($_SESSION[$sessionName]);
		}
	}

	function notifyAndRedirect($sessionName, $redirect)
	{
		$this->session->set_userdata($sessionName, 1);
		redirect($redirect);
	}
}
