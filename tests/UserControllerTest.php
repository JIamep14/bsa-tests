<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserControllerTest extends TestCase
{
    use WithoutMiddleware;
    use DatabaseMigrations;

    public function test_index_method()
    {
        $users = factory(App\User::class, 8)->create();

        $this->get(route('api.user.index'))
            ->seeStatusCode(200);

        foreach ($users as $user) {
            $this->seeJson([
                'id' => $user->id,
                'firstname' => $user->firstname,
                'lastname' => $user->lastname,
                'email' => $user->email,
            ]);
        }
    }

    public function test_user_books_method()
    {

        $user = factory(App\User::class)->create();
        $books = factory(App\Book::class, 5)->create(['user_id' => $user->id]);

        $this->get(route('user-books', ['id' => $user->id]))->seeStatusCode(200);

        foreach ($books as $book) {
            $this->seeJson([
                'title' => $book->title,
                'genre' => $book->genre,
                'author' => $book->author,
                'year' => (string)$book->year
            ]);
        }
    }

    public function test_user_and_free_books_in_one_request()
    {
        $user = factory(App\User::class)->create();
        $books = factory(App\Book::class, 5)->create(['user_id' => 0]);

        $this->get(route('free', ['id' => $user->id]))->seeStatusCode(200);
        $this->seeJson([
            'id' => $user->id,
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'email' => $user->email
        ]);

        foreach ($books as $book) {
            $this->seeJson([
                'id' => $book->id,
                'title' => $book->title,
                'author' => $book->author,
                'genre' => $book->genre,
                'year' => (string)$book->year
            ]);
        }
    }

    public function test_user_show_method()
    {
        $user = factory(App\User::class)->create();
        $books = factory(App\Book::class, 5)->create(['user_id' => 1]);

        $this->get(route('api.user.show', ['id' => $user->id]))->seeStatusCode(200);
        $this->seeJson([
            'id' => $user->id,
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'email' => $user->email
        ]);

        foreach ($books as $book) {
            $this->seeJson([
                'id' => $book->id,
                'title' => $book->title,
                'author' => $book->author,
                'genre' => $book->genre,
                'year' => (string)$book->year

            ]);
        }
    }

    public function test_user_destroy_method()
    {
        $user = factory(App\User::class)->create();

        $this->delete(route('api.user.destroy', ['id' => $user->id]))
            ->seeStatusCode(200);

        $this->seeJson([
            'status' => 'success'
        ]);

        $this->notSeeInDatabase('users', ['id' => $user->id]);
    }

    public function test_user_update_method()
    {
        $user = factory(App\User::class)->create(['email' => 'example1@example.com']);
        $user = factory(App\User::class)->create(['email' => 'example2@example.com']);

        $this->put(route('api.user.update', ['id' => $user->id]), [
            'firstname' => 'newfirstname',
            'lastname' => 'newlastname',
            //'email'=>'example1@example.com'
            'email' => 'example2@example.com'
        ])->seeStatusCode(200);

        $this->seeJson([
            'id' => $user->id,
            'firstname' => 'newfirstname',
            'lastname' => 'newlastname',
            'email' => 'example2@example.com'
        ]);

        $this->seeInDatabase('users', [
            'id' => $user->id,
            'firstname' => 'newfirstname',
            'lastname' => 'newlastname',
            'email' => 'example2@example.com'
        ]);
    }

    public function test_user_store_method()
    {
        $user = [
            'firstname' => 'newfirstname',
            'lastname' => 'newlastname',
            //'email'=>'example1@example.com'
            'email' => 'example2@example.com',
            'password' => bcrypt('123456')
        ];
        $this->post(route('api.user.store'), $user)->seeStatusCode(200);

        $this->seeJson([
            'email' => 'example2@example.com'
        ]);
        $this->seeInDatabase('users', ['email' => 'example2@example.com']);
    }
}
