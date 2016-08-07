<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class BookControllerTest extends TestCase
{
    use DatabaseMigrations;
    use WithoutMiddleware;


    public function test_index_method_returns_all_books()
    {
        $books = factory(App\Book::class, 5)->create();

        $this->get(route('api.book.index'))->seeStatusCode(200);

        foreach ($books as $book) {
            $this->seeJson([
                'title' => $book->title,
                'author' => $book->author,
                'genre' => $book->genre,
                'year' => (string)$book->year
            ]);
        }

    }

    public function test_user_and_free_books()
    {
        $user = factory(App\User::class)->create();
        $books = factory(App\Book::class, 5)->create();

        $this->get(route('free', ['id' => $user->id]))->seeStatusCode(200);
        foreach ($books as $book) {
            $this->seeJson([
                'title' => $book->title,
                'author' => $book->author,
                'genre' => $book->genre,
                'year' => (string)$book->year,
            ]);
        }
    }

    public function test_store_book()
    {
        //$this->expectsJobs(App\Jobs\NewBookNotification::class);

        $response = $this->call('POST', 'api/book',[
            'title' => 'Some title',
            'author' => 'Some author',
            'genre' => 'Genre',
            'year' => rand(1, 2016),
        ]);

        $data = json_decode($response->getContent());

        $this->seeJson( [
            'title' => 'Some title',
            'author' => 'Some author',
            'genre' => 'Genre',
        ])->seeStatusCode(200);


        $this->seeInDatabase('books', ['id' => $data->id]);
    }

    public function test_update_method()
    {
        $book = factory(App\Book::class)->create();

        $this->put(route('api.book.update', ['id' => $book->id]), [
            'title' => 'updatedtitle',
            'author' => 'updatedautor',
            'genre' => 'updatedgenre',
            'year' => rand(1, 2016)
        ])->seeStatusCode(200)->seeJson([
            'title' => 'updatedtitle',
            'author' => 'updatedautor',
            'genre' => 'updatedgenre',
        ]);

        $this->seeInDatabase('books', ['id' => $book->id, 'title' => 'updatedtitle']);
    }

    public function test_show_method()
    {
        $book = factory(App\Book::class)->create();

        $this->get(route('api.book.show', ['id' => $book->id]))
            ->seeStatusCode(200)->seeJson([
                'title' => $book->title,
                'author' => $book->author,
                'genre' => $book->genre,
                'year' => (string)$book->year
            ]);

        $this->seeInDatabase('books', ['id' => $book->id]);
    }

    public function test_delete_method()
    {
        $book = factory(App\Book::class)->create();

        $this->delete(route('api.book.destroy', ['id' => $book->id]))
            ->seeStatusCode(200)
            ->seeJson(['status' => 'success']);

        $this->notSeeInDatabase('books', ['id' => $book->id]);
    }
}
