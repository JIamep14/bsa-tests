<?php

namespace App\Http\Controllers;

use App\Book;
use App\Exceptions\MyException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Requests;
use App\User;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $response = [];
        $statusCode = 200;
        $users = User::all();

        foreach ($users as $user) {

            $response[] = [
                'id' => $user->id,
                'firstname' => $user->firstname,
                'lastname' => $user->lastname,
                'email' => $user->email,
                'bookscount' => $user->books->count()
            ];
        }
        return Response::json($response, $statusCode);
    }

    public function userBooks($id)
    {
        //Предоставление списка книг, которые взял определенный пользователь
        $statusCode = 200;
        $user = User::findOrFail($id);
        $books = $user->books()->get();
        $response = [];
        foreach ($books as $book) {
            $response[] = [
                'id' => $book->id,
                'title' => $book->title,
                'author' => $book->author,
                'genre' => $book->genre,
                'year' => $book->year
            ];
        }
        return Response::json($response, $statusCode);
    }


    public function giveBook($id)
    {
        $response['user'] = User::findOrFail($id);
        $response['books'] = Book::where('user_id', '=' , 0)->get();

        $statusCode = 200;
        return Response::json($response, $statusCode);
    }

    public function show($id)
    {   //Возвращать данные профиля об определенном пользователе
        $user = User::findOrFail($id);
        $user['books'] = $user->books;
        $statusCode = 200;
        $response = $user;
        return Response::json($response, $statusCode);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        $statusCode = 200;
        $response = ['status' => 'success'];
        return Response::json($response, $statusCode);
    }

    public function update(Request $request, $id){

        $rules = array(
            'firstname'=> array('required', 'min:3', 'regex:/^[a-zA-Z]+$/'),
            'lastname' => array('required','min:3','Regex:/^[a-zA-Z]+$/'),
            'email' => 'required|email|unique:users,id,'.$id
        );
//                'required|regex:[A-Za-z]',
        $validator = Validator::make($request->all(), $rules);
        if($validator->fails()) {
            return Response::json('', 400);
        } else {

            $user = User::find($id);
            $user->firstname = $request->firstname;
            $user->lastname = $request->lastname;
            $user->email = $request->email;
            //$user->save();
            $user->update($request->all());
            $user->save();
            $user = User::find($id);

            return Response::json($request->all(), 200);
        }
    }

    public function store(Request $request)
    {
        $rules = array(
            'firstname'=> array('required', 'min:3', 'regex:/^[a-zA-Z]+$/'),
            'lastname' => array('required','min:3','Regex:/^[a-zA-Z]+$/'),
            'email' => 'required|email|unique:users'
        );
//                'required|regex:[A-Za-z]',
        $validator = Validator::make($request->all(), $rules);
        if($validator->fails()) {
            return Response::json('', 400);
        } else {

            $user = new User($request->all());
            //$user->password = bcrypt($request->password);
            //$user->firstname = $request->firstname;
            //$user->lastname = $request->lastname;
            //$user->email = $request->email;
            $user->save();
//            $user = User::create([
//                'firstname' => $request->firstname,
//                'lastname' => $request->lastname,
//                'email' => $request->email
//            ]);

            return Response::json($user, 200);
        }
    }

}
