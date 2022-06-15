import React,{ useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import { 
  Container,
  Row,
  Button,
  Nav,
  NavItem,
  NavLink,
  ListGroup,
  ListGroupItem,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
 } from 'reactstrap';
import Movie from './components/Movie'

function App() {

 const [moviesList, setMovies] = useState([]);

 useEffect(() => {
   async function loadData() {
    var data = await fetch('/new-movies');
    var json = await data.json();
    setMovies(json.movies);
}
loadData()
}, []);

const [compteurMovie, setCompteur] = useState(0);
const [wishList, setWish] = useState([]);
var handleClickAddMovie = async (status,name,img) => {
  if(status === false){
    setCompteur(compteurMovie+1)
      setWish( [...wishList, {name, img}] );
      await fetch('/wishlist-movie', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `name=${name}&img=${img}`
        })
  }if(status === true ){  
    if(compteurMovie > 0){
      setCompteur(compteurMovie-1) 
      setWish(wishList.filter(movie => movie.name !== name))
      const response = await fetch(`/wishlist-movie/${name}`, {
        method: 'DELETE'
      })

  }
}}
var removeWishlist = async (name)=> {
    setWish(wishList.filter(movie => movie.name !== name))
    const response = await fetch(`/wishlist-movie/${name}`, {
      method: 'DELETE'
    })
    if(compteurMovie > 0){
      setCompteur(compteurMovie-1) 
    }
  }

  var movieList = moviesList.map((movie,i) => {
    var inList = false
        if(wishList.find(e => e.name === movie.title)){
          inList = true
        }
      return(<Movie key={i} inList={inList} movieName={movie.title} movieDesc={movie.overview} movieImg={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} globalRating={movie.vote_average} globalCountRating={movie.vote_count} handleClickAddMovie={handleClickAddMovie}/>)
    })

  var movieWishlist = wishList.map(movie => {
     return(
     <ListGroup>
        <ListGroupItem>
          <div className="wishlist">
            <img src={movie.img} alt="movieImg" width="100"/>
            <div className="wishlistItem">
              {movie.name}
            </div>
            <FontAwesomeIcon style={{cursor:"pointer"}} onClick={ ()=>removeWishlist(movie.name) } className="wishlistItem" icon={faTrash} />
          </div>
        </ListGroupItem>
     </ListGroup>)})

  return (
    <div className='background'>
      <Container>
        <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
          <img src="./logo-movies.png" width="200" className="d-inline-block align-top" alt="logo"/>
        </div>
        <Nav style={{paddingTop:20, paddingBottom:20}}>
          <span className="navbar-brand">
            <img src="./logo.png" width="30" height="30" className="d-inline-block align-top" alt="logo" />
          </span>
          <NavItem>
            <NavLink style={{color:'white'}}>Last Releases</NavLink>
          </NavItem>
          <NavItem>
            <div>
              <Button id="UncontrolledPopover" type="button" style={{borderRadius:20}}>
               {compteurMovie} Film(s)
              </Button>
              <UncontrolledPopover placement="bottom" target="UncontrolledPopover">
                <PopoverHeader>
                  Wishlist
                </PopoverHeader>
                <PopoverBody>
                {compteurMovie>0?movieWishlist:<div> Likez un film pour l'ajouter à votre wishlist</div>}
                </PopoverBody>
              </UncontrolledPopover>
            </div>
          </NavItem>
        </Nav>
        <Row>
          {movieList}
        </Row>
      </Container>
    </div>
  );
}

export default App;
