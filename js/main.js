// listen for form submit
document.getElementById('myform').addEventListener('submit', saveBookmark);
// save bookmarker
function saveBookmark(e) {
  // get form values
  var siteName = document.getElementById('siteName').value;
  var siteURl = document.getElementById('siteURl').value;

  if (!validateForm(siteName, siteURl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteURl,
  };

  //   console.log(bookmark);
  /*
  //   local storage
  localStorage.setItem('test', 'hello world');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));
  */
  // test if localstorage is null
  if (localStorage.getItem('bookmarks') === null) {
    //    init array
    var bookmarks = [];
    bookmarks.push(bookmark);
    // set a local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //   get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // add bookmark to array
    bookmarks.push(bookmark);
    // reset back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // clear form
  document.getElementById('myform').reset();
  //   refetch bookmarks
  fetchBookmarks();

  // prevent default
  e.preventDefault();
}

// delete bookmark
function deleteBookmark(url) {
  //   get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //   loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // remove from array
      bookmarks.splice(i, 1);
    }
  }
  // reset back to localstorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  //   refetch bookmarks
  fetchBookmarks();
}

// fetch bookmark
function fetchBookmarks() {
  // get bookmark from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //   get output id
  var bookmarkresults = document.getElementById('bookmark results');

  //   build output
  bookmarkresults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarkresults.innerHTML +=
      '<div class="well">' +
      '<h3>' +
      name +
      '<a class="btn btn-default" target="_blank" href="' +
      url +
      '">Visit</a>' +
      '<a onclick="deleteBookmark(\'' +
      url +
      '\')" class="btn btn-danger"href=" # ">Delete</a>';
    +'</h3>' + '</div>';
  }
}
// validate form
function validateForm(siteName, siteURl) {
  if (!siteName || !siteURl) {
    alert('please fill the form');
    return false;
  }
  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteURl.match(regex)) {
    alert('please use a valid url');
    return false;
  }

  return true;
}
