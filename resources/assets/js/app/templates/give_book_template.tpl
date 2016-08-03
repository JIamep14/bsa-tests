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