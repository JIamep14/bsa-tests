<?php

namespace App\Jobs;

use App\Jobs\Job;
use App\User;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewBookNotification extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;


    protected $book;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($book)
    {
        $this->book = $book;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(Mailer $mailer)
    {
        $users = User::all();
        
        foreach ($users as $user) {
            $mailer->send('emails.newbooknotification', ['book' => $this->book] , function($m) use ($user) {
                $m->from('library@gmail.com');
                $m->to($user->email);
            });
        }

    }
}
