<?php

namespace App\Jobs;

use App\Jobs\Job;
use App\User;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class remindTakenBook extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $book;
    protected $user_id;
    protected $attachcode;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($book)
    {
        $this->book = $book;
        $this->user_id = $book->user_id;
        $this->attachcode = $book->attachcode;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(Mailer $mailer)
    {
        // я не знал, как найти и удалить job, если пользователь вернул книгу и оповещать не нужно, поэтому сочинил такую проверку
        if($this->book->user_id != 0 &&
            $this->book->user_id == $this->user_id &&
            $this->book->attachcode == $this->attachcode) {
            $user = User::findOrFail($this->user_id);
            $mailer->send('emails.takenbookremind', ['book' => $this->book] , function($m) use ($user) {
                $m->from('library@gmail.com');
                $m->to($user->email);
            });
        }
    }
}
