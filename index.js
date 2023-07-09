
function getCssValuePrefix() {
    var rtrnVal = '';//default to standard syntax
    var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

    // Create a temporary DOM object for testing
    var dom = document.createElement('div');

    for (var i = 0; i < prefixes.length; i++) {
        // Attempt to set the style
        dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';

        // Detect if the style was successfully set
        if (dom.style.background) {
            rtrnVal = prefixes[i];
        }
    }

    dom = null;
    delete dom;

    return rtrnVal;
}

var read = 0;

function switchOn(calledElement) {
    let changeColor = document.getElementById(calledElement.id).parentElement.parentElement.parentElement.parentElement;
    var classValue = document.getElementById('not-read').className;
    if (classValue == "not-read") {
        changeColor.style.backgroundImage = getCssValuePrefix() + 'linear-gradient('
            + '#0c7fc2' + ', ' + '#3b7da3' + ')';
        document.getElementById('not-read').className = 'read';
        changeColor.lastElementChild.lastElementChild.lastElementChild.textContent = 'Read';

    } else if (classValue == "read") {
        changeColor.style.backgroundImage = getCssValuePrefix() + 'linear-gradient('
            + '#00A6FB' + ', ' + '#00A6FB'  +')';
        document.getElementById('not-read').className = 'not-read';
        changeColor.lastElementChild.lastElementChild.lastElementChild.textContent = 'Not-Read'
    }
}

var add = 0;

function addClose() {
    if (add == 0) {
        if(document.getElementById('empty') !== null){
            document.getElementById('empty').remove();
        }
        document.getElementById('box').style.display = 'block';
        add = 1;
    } else {
        document.getElementById('box').style.display = 'none';
        add = 0;
    }
}


function deleteCard(elementToDelete) {
        elementToDelete.parentElement.parentElement.remove();
        if(document.getElementById('container').firstElementChild === null){
            var newELe = document.createElement('h1');
            newELe.setAttribute('id', 'empty');
            newELe.textContent = 'Your Library is Empty'
            var conELe = document.getElementById('container');
            conELe.style.textAlign = 'center';
            conELe.appendChild(newELe);
        }
}

let library = [];

class libraryObj {
    constructor(name, author, numberOfPages) {
        this.name = name;
        this.author = author;
        this.numberOfPages = numberOfPages;
    }
}

function addToLibrary() {
    if(document.getElementById('Title').value == null || document.getElementById('Title').value == ""){
        alert("All input fields must be filled");
        document.getElementById('box').style.display = 'none';
    }else{
    var getName = document.getElementById('Title').value;
    var getAuthor = document.getElementById('author').value;
    var getPage = document.getElementById('pages').value;
    var newBook = new libraryObj(getName, getAuthor, getPage);
    library.push(newBook);
    document.getElementById('box').style.display = 'none';
    var container = document.getElementById('container');

    //create new book card
    for (let i = 0; i < library.length; i++) {
        var containerData = document.createElement('div');
        containerData.classList.add('data');
        containerData.setAttribute('id', 'data');
        var newDiv = document.createElement('div');
        newDiv.classList.add('sub-items');
        var title = document.createElement('h2');
        title.classList.add('title');
        title.textContent = library[i].name;
        var author = document.createElement('p');
        author.classList.add('author');
        var authorItag = document.createElement('i');
        var authorBtag = document.createElement('b');
        var authorTextB = document.createElement('b');
        authorBtag.textContent = "Author "+": ";
        authorTextB.textContent = library[i].author;
        authorItag.appendChild(authorBtag);
        author.appendChild(authorItag);
        author.appendChild(authorTextB);

        var numberPages = document.createElement('p');
        numberPages.classList.add('number');
        var numberItag = document.createElement('i');
        var numberBtag = document.createElement('b');
        var numberTextB = document.createElement('b');
        numberBtag.textContent = "Number Of Pages "+": ";
        numberTextB.textContent = library[i].numberOfPages;
        numberItag.appendChild(numberBtag);
        numberPages.appendChild(numberItag);
        numberPages.appendChild(numberTextB);

        var plug = document.createElement('div');
        plug.classList.add('plug');
        var switchPlug = document.createElement('label');
        switchPlug.classList.add('switch')
        var check = document.createElement('input');
        check.type = 'checkbox';
        var spanning = document.createElement('span');
        spanning.classList.add('slider');
        spanning.classList.add('round');
        spanning.setAttribute('id', ('current'+i));
        spanning.setAttribute('onclick', 'switchOn(this)');

        var reading = document.createElement('p');
        reading.classList.add('not-read');
        reading.setAttribute('id', 'not-read');
        reading.textContent= 'Not Read';
        var atag = document.createElement('a');
        atag.classList.add('delete');
        atag.setAttribute('id', 'delete');
        atag.setAttribute('onclick', 'deleteCard(this)');
        atag.textContent = "Delete";
        var combiner = document.createElement('div');

        newDiv.appendChild(title);
        newDiv.appendChild(author);
        newDiv.appendChild(numberPages);
        newDiv.appendChild(plug);
        containerData.appendChild(newDiv);
        switchPlug.appendChild(check);
        switchPlug.appendChild(spanning);
        combiner.appendChild(switchPlug);
        combiner.appendChild(reading);
        plug.appendChild(atag);
        plug.appendChild(combiner);
        container.appendChild(containerData);
        containerData.appendChild(plug);
    }
    }
}