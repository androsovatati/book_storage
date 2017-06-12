function AppController($http) {
    var self = this;

    self.books = [];
    self.showModal = false;
    self.error = false;
    self.errorMessage = 'Заполните все поля!';

    $http.get('/data/books.json').then(function(data) {
        self.books = self.books.concat(data.data)
    });

    self.addBook = function (book) {
        self.showModal = true;
        self.modalType = 'add';
        self.currentBook = {};
        self.currentIndex = -1;
    };

    self.editBook = function(book, index) {
        self.showModal = true;
        self.modalType = 'edit';
        self.currentBook = angular.copy(book);
        self.currentIndex = index;
    };

    self.deleteBook = function (index) {
        self.books.splice(index, 1);
    };

    self.onSave = function () {

        var book = angular.copy(self.currentBook);

        if(!book.title || !book.author || !book.year) {
            self.error = true;
            return;
        }
        else {
            self.error = false;
        }

        if (self.currentIndex < 0) {
            self.books.unshift(book);
        }
        else {
            self.books[self.currentIndex] = book;
        }

        self.showModal = false;
    };

    self.onCancel = function () {
        self.showModal = false
        self.error = false;
    };
}