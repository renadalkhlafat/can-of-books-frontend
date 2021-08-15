import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';

class MyFavoriteBooks extends React.Component {
  render() {
    return(
      <main style={{height:"100%" ,justifyContent:"center",alignItems:"center",margin:"25rem"}}>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      </main>
    )
  }
}

export default MyFavoriteBooks;
