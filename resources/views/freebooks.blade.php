@extends('layout')

@section('title')
    A list of free books you can get after registration
@stop

@section('content')
    {{$books->links()}}
    <table class="table table-striped table-hover table-bordered">
        <thead>
        <td>Title</td>
        <td>Author</td>
        <td>Genre</td>
        <td>Year</td>
        </thead>
        <tbody>
        @foreach($books as $book)
            <tr>
                <td>{{$book->title}}</td>
                <td>{{$book->author}}</td>
                <td>{{$book->genre}}</td>
                <td>{{$book->year}}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
    {{$books->links()}}
@stop
<td>@if(count($book->user))
    <a href="/user/{{$book->user->id}}" class="btn btn-primary btn-xs">{{$book->user->firstname.' '.$book->user->lastname}}</a>
                        <br>
                        <a href="/book/{{$book->id}}" class="btn btn-primary btn-xs">Return</a>  @endif</td>
<td>
<a href="/book/{{$book->id}}" class="btn btn-small btn-success">Show </a>
                    <a href="/book/{{$book->id}}/edit" class="btn btn-small btn-warning">Edit</a>
                    {!! Form::open(array('url' => 'book/'.$book->id, 'class'=>'pull-right')) !!}
{!! Form::hidden('_method', 'delete') !!}
{!! Form::submit('Delete', array('class' => 'btn btn-small btn-danger')) !!}
{!! Form::close() !!}