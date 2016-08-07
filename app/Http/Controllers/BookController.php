<?php

namespace App\Http\Controllers;

use App\Book;
use App\Exceptions\MyException;
use App\Jobs\NewBookNotification;
use App\Jobs\remindTakenBook;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use App\Http\Requests;
use App\User;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Предоставление списка книг, имеющихся в библиотеке
        $response = [];
        $books = Book::all();

        for ($i = 0; $i < count($books); $i++) {
            $book = $books[$i];
            $response[$i] = [
                'id' => $book->id,
                'user_id' => $book->user_id,
                'title' => $book->title,
                'user' => [
                    'id' => '',
                    'firstname' => '',
                    'lastname' => '',
                    'email' => ''
                ],
                'genre' => $book->genre,
                'year' => $book->year,
                'author' => $book->author,
            ];
            if (!is_null($book->user)) {
                $response[$i]['user'] = [
                    'id' => $book->user->id,
                    'firstname' => $book->user->firstname,
                    'lastname' => $book->user->lastname,
                    'email' => $book->user->email
                ];
            }
        }
        return Response::json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Requests\StoreBookRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(Requests\StoreBookRequest $request)
    {
        // Добавление новой книги в библиотеку
        $book = new Book($request->all());
        $book->save();

        $this->dispatch((new NewBookNotification($book)));
        return Response::json($book, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //Предоставление детальной инорфмации о книге

        $response = Book::findOrFail($id,['id', 'title', 'author', 'genre', 'year', 'user_id']);
        return Response::json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Списание книги из библиотеки
        $response = ['status' => 'success'];

        $book = Book::findOrFail($id);
        $book->delete();

        return Response::json($response, 200);
    }

    public function update(Requests\StoreBookRequest $request, $id)
    {
        $book = Book::findOrFail($id);

        $book->update($request->all());

        if ($request->input('attached') == 1) {
            $book->attachcode = rand(1, 25000);
            $this->dispatch((new remindTakenBook($book))->delay(2592000));
        } else if ($request->input('attached') == 0) {
            $book->attachcode = '0';
        }

        $book->save();
        return Response::json($book, 200);
    }
}

