---
layout: post
title: The accepts_nested_attributes_for Handbook
date: 2014-04-08 15:09:10.000000000 +01:00
---
Rails has `accepts_nested_attributes_for` which helps when building forms that combine a parent and their related models. Unfortunately, I normally get it wrong and spend far too long tracking down why it isn't working. Hopefully this will help reduce that time in future.

### Gotchas

* If you're using `update_attributes` then `:foo_attributes` must be `attr_accessible`.
* Pass in the parent object instance to `form_for`, then use `form.fields_for` inside that for the related models.

### Example
#### Models
```ruby
class Library
  attr_accessible :name, :books_attributes
  
  has_many :books, :inverse_of => :library
  accepts_nested_attributes_for :books
end

class Book
  attr_accessible :title, :author
  
  belongs_to :library, :inverse_of => :books
end
```

#### View
```ruby
<%= form_for @library do |form| %>
  Library name: <%= form.text_field :name %>
  <h2>Books</h2>
  <%= form.fields_for :books do |book_form| %>
	<p>
      Title: <%= book_form.text_field :title %>
      Author: <%= book_form.text_field :author %>
    </p>
  <% end %>
<% end %>
```

#### Controller
```ruby
class LibraryController < ApplicationController
  def update
    @library = Library.find(params[:id])
   
    # This updates the books as well
    if @library.update_attributes(params[:library])
      redirect_to :show
    else
      redirect_to :edit
    end
  end
end
```
