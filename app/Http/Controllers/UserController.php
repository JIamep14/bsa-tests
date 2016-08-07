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
        return Response::json($response, 200);
    }

    public function userBooks($id)
    {
        //Предоставление списка книг, которые взял определенный пользователь
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
        return Response::json($response, 200);
    }


    public function giveBook($id)
    {
        $response['user'] = User::findOrFail($id);
        $response['books'] = Book::where('user_id', '=', 0)->get();

        return Response::json($response, 200);
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
        $response = ['status' => 'success'];
        return Response::json($response, 200);
    }

    public function update($id, Requests\UpdateUserRequest $request)
    {

        $user = User::findOrFail($id);
        $user->update($request->all());
        $user->save();

        return Response::json($user, 200);
    }

    public function store(Request $request)
    {

        $user = User::create($request->all());
        
        return Response::json($user, 200);
    }

}
