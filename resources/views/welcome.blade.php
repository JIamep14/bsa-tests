<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link type="text/css" rel="stylesheet" href="https://bootswatch.com/cerulean/bootstrap.min.css">
    <script src="/src/library/jquery-3.1.0.js"></script>
    <script src="/src/library/underscore.js"></script>
    <script src="/src/library/backbone.js"></script>
    <script src="/src/library/backbone.marionette.js"></script>
    <title>Title</title>
</head>
<body>

<div class="container">
    <div id="header-container">

    </div>
    <div class="col-md-12 col-md-offset-0">

        <div id="main">

        </div>

        <div id="submain"></div>

    </div>
</div>




<script type="text/html" id="user-tr">
    <td><%- firstname %></td>
    <td><%- lastname %></td>
    <td><%- email %></td>
    <td><%- bookscount %></td>
    <td>
        <button class="btn btn-small btn-success js-show">Show</button>
        <button class="btn btn-small btn-warning js-edit">Edit</button>
        <button class="btn btn-small btn-default js-give">Give a free book</button>
        <button class="btn btn-small btn-danger pull-right js-delete">Delete</button>

    </td>
</script>

<script type="text/html" id="users-table-template">

    <thead>
    <tr>
        <th>FirstName:</th>
        <th>LastName:</th>
        <th>Email:</th>
        <th>Books:</th>
        <th>Action:</th>
    </tr>
    </thead>
    <tbody>

    </tbody>

</script>

<script type="text/html" id="user-view">
    <div class="form-group">
        <label for="">First Name</label>
        <input class="form-control" readonly="readonly" name="firstname" type="text" value="<%- firstname %>">
    </div>
    <div class="form-group">
        <label for="">Last Name</label>
        <input class="form-control" readonly="readonly" name="lastname" type="text" value="<%- lastname %>">
    </div>

    <div class="form-group">
        <label for="">Email</label>
        <input class="form-control" readonly="readonly" name="email" type="text" value="<%- email %>">
    </div>
    <button class="btn btn-primary js-edit">Edit</button>

    <table class="table table-striped table-hover table-bordered"><br><br>
        <thead>
        <td>Book info:</td>
        </thead>
        <tbody>
        <% _.each(books, function(book, key) { %>
        <tr><td><%- book.title %> - <%- book.author %> - <%- book.genre %> - <%- book.year %></td>

        </tr>
        <% }); %>
        </tbody>
    </table>
</script>

<script type="text/html" id="book-view">
    <div class="form-group">
        <label for="">Title</label>
        <input class="form-control" readonly="readonly" name="title" type="text" value="<%- title %>">
    </div>
    <div class="form-group">
        <label for="">Author</label>
        <input class="form-control" readonly="readonly" name="author" type="text" value="<%- author %>">
    </div>

    <div class="form-group">
        <label for="">Genre</label>
        <input class="form-control" readonly="readonly" name="genre" type="text" value="<%- genre %>">
    </div>
    <div class="form-group">
        <label for="">Year</label>
        <input class="form-control" readonly="readonly" name="year" type="text" value="<%- year %>">
    </div>
    <button class="btn btn-primary js-edit">Edit</button>
    <% if(user_id != 0)  { %><button class="btn btn-primary js-return">Return book</button> <% } %>
</script>

<script type="text/html" id="header-template">

    <ul class="nav navbar-nav">
        <li><a style="cursor: pointer;" class="js-view-users">View all users</a></li>
        <li><a style="cursor: pointer;" class="js-create-user">Add new user</a></li>
        <li><a style="cursor: pointer;" class="js-view-books">View all books</a></li>
        <li><a style="cursor: pointer;" class="js-create-book">Add new book</a></li>
    </ul>

</script>

<script type="text/html" id="loading-template">
    <!-- Here can be custom loading template -->
    <div style="display:flex;justify-content:center;align-items:center;">Please, wait. We are loading data from
        server.
    </div>
</script>

<script type="text/html" id="user-not-exist">

    <div class="alert alert-dismissible alert-warning">This user doesn't exist !</div>

</script>

<script type="text/html" id="book-not-exist">

    <div class="alert alert-dismissible alert-warning">This book doesn't exist !</div>

</script>

<script type="text/html" id="edit-user-template">
    <div class="messages" style="min-height: 40px;">

    </div>
    <form>
        <input class="form-control" name="id" type="hidden" value="<%- id %>">
        <div class="form-group">
            <label for="">First Name</label>
            <input class="form-control" id="firstname" name="firstname" type="text" value="<%- firstname %>">
        </div>
        <div class="form-group">
            <label for="">Last Name</label>
            <input class="form-control" name="lastname" type="text" value="<%- lastname %>">
        </div>

        <div class="form-group">
            <label for="">Email</label>
            <input class="form-control" name="email" type="text" value="<%- email %>">
        </div>
        <input class="btn btn-primary js-save" type="submit" value="Save">
    </form>
</script>

<script type="text/html" id="book-tr">
    <td><%- title %></td>
    <td><%- author %></td>
    <td><%- genre %></td>
    <td><%- year %></td>
    <td> <% if(user.firstname) { %> <a class="btn btn-primary btn-xs js-show-user"><%- user.firstname %>  <%- user.lastname %> <a style="cursor:pointer;" class="btn btn-primary btn-xs js-return-book">Return</a> <% } %></a></td>
    <td>
        <button class="btn btn-small btn-success js-show">Show</button>
        <button class="btn btn-small btn-warning js-edit">Edit</button>

        <button class="btn btn-small btn-danger pull-right js-delete">Delete</button>
    </td>
</script>

<script type="text/html" id="books-table-template">

    <thead>
    <tr>
        <th>Title:</th>
        <th>Author:</th>
        <th>Genre:</th>
        <th>Year:</th>
        <th>Owner:</th>
        <th>Action:</th>
    </tr>
    </thead>
    <tbody>

    </tbody>

</script>

<script type="text/html" id="edit-book-template">
    <div id="messages2" style="min-height: 40px;">

    </div>
    <form>
        <input class="form-control" name="id" type="hidden" value="<%- id %>">
        <div class="form-group">
            <label for="">Title</label>
            <input class="form-control" name="title" type="text" value="<%- title %>">
        </div>
        <div class="form-group">
            <label for="">Author</label>
            <input class="form-control" name="author" type="text" value="<%- author %>">
        </div>

        <div class="form-group">
            <label for="">Genre</label>
            <input class="form-control" name="genre" type="text" value="<%- genre %>">
        </div>
        <div class="form-group">
            <label for="">Year</label>
            <input class="form-control" name="year" type="text" value="<%- year %>">
        </div>
        <input class="btn btn-primary js-save" type="submit" value="Save">
    </form>
</script>

<script type="text/html" id="give-book-template">
    <form>
        <div class="form-group">
            <label for="">Info</label>
            <input class="form-control" readonly="readonly" name="info" type="text" value="<%- user.firstname %> <%- user.lastname %>, <%- user.email %>">
        </div>

        <div class="form-group">
            <select class="form-control" name="select" id="select">
                <option value="0"></option>
                <%
                _.each(books, function(book, key){ %>
                <option value="<%- book.id %>"><%- book.title %> <%- book.author %> <%- book.genre %> <%- book.year %></option>
                <%
                ;
                });
                %>
            </select>
        </div>
        <input class="btn btn-primary js-submit" type="submit" value="Save">
    </form>
</script>

<script src="/src/js/app.js"></script>
<script src="/src/js/users/users_app.js"></script>
<script src="/src/js/entities/user.js"></script>
<script src="/src/js/users/users_view.js"></script>
<script src="/src/js/users/users_controller.js"></script>
<script src="/src/js/commontemplates.js"></script>
<script src="/src/js/entities/book.js"></script>
<script src="/src/js/books/books_view.js"></script>
<script src="/src/js/books/books_controller.js"></script>


<script type="application/javascript">
    //<nav id="header" class="navbar navbar-inverse"></nav>
    //    Library.TableTemplate = Marionette.ItemView.extend({
    //        template: '#table-template',
    //        className: 'table table-striped table-hover table-bordered',
    //        tagName: 'table'
    //    });

    //
    //    Library.UsersView = Marionette.CompositeView.extend({
    //        tagName: 'table',
    //        className: 'table table-striped table-hover table-bordered',
    //        template: '#table-template',
    //        itemView: Library.UserItemView,
    //        itemViewContainer: 'tbody'
    //    });

    app.start();
</script>
</body>
</html>