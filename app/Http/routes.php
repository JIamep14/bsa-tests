<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::group(array('prefix' => 'api'), function()
{
    Route::get('user/{id}/free', ['as' => 'free', 'uses' => 'UserController@giveBook']);
    Route::get('user/{id}/books', ['as' => 'user-books', 'uses' => 'UserController@userBooks']);
    Route::resource('user', 'UserController');
    Route::resource('book', 'BookController');

});


Route::get('/', function() {
    return view('welcome');
});



