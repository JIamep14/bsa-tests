<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class UpdateUserRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'firstname'=> array('required', 'min:3', 'regex:/^[a-zA-Z]+$/'),
            'lastname' => array('required','min:3','Regex:/^[a-zA-Z]+$/'),
            'email' => 'required|email|unique:users,id,{id}'
        ];
    }
}
