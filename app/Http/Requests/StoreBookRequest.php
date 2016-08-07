<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class StoreBookRequest extends Request
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
            'title' => ['required'],
            'author' => ['required', 'regex:/^[a-zA-Z\s]+$/'],
            'year' => ['required', 'regex: /^[0-9]+$/'],
            'genre' => ['required', 'regex:/^[a-zA-Z\s]+$/']
        ];
    }
}
