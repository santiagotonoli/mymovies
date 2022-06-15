import React, { useState } from 'react';
import '../App.css';
import { 
  Button,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Badge,
  ButtonGroup
 } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar, faVideo} from '@fortawesome/free-solid-svg-icons'

function Movie(props) {


  const [viewclick, setViewclick] = useState(true)
  const [countWatchMovie, setCount] = useState(0)
  const [myRatingMovie, setRating] = useState(0)

  var handleClick = ()=> {
    if(props.inList === true){
      props.handleClickAddMovie(props.inList, props.movieName, props.movieImg);

    }
    if(props.inList === false){  
      props.handleClickAddMovie(props.inList, props.movieName, props.movieImg);

    }
 }


 var handleClick2 = ()=> {
  if(viewclick === false){
    setCount(countWatchMovie-1)
    setViewclick(true)
    console.log(viewclick)
  }
  if(viewclick === true){  
    setCount(countWatchMovie+1)
    setViewclick(false) 
    
  }
}
var handleClick3 = ()=> {
  if(viewclick === false){
  if(myRatingMovie > 0){
    setRating(myRatingMovie-1)
  }}
 
}
var handleClick4 = ()=> {
  if(viewclick === false){
  if(myRatingMovie < 10){
    setRating(myRatingMovie+1)
  }}
  }

 var colorLike= {}
 var colorView= {}
 if(props.inList === false){
  colorLike={cursor: "pointer", paddingLeft: "5px", fontSize: "20px"}
}else{
  colorLike={color: '#e74c3c', cursor: "pointer", paddingLeft: "5px", fontSize: "20px"}}
if(viewclick === true){
  colorView={cursor: "pointer", paddingLeft: "5px",  fontSize: "20px"}
}else{
  colorView={color: '#e74c3c', cursor: "pointer", paddingLeft: "5px" , fontSize: "20px"}}



var myRating = []
for(let i=0;i<10;i++){
  var colorStar = {}
  if(viewclick === false){
    if(i<myRatingMovie){
        colorStar = {color: '#f1c40f'}
    }
  }
  myRating.push(<FontAwesomeIcon style={colorStar} icon={faStar} onClick={ ()=>indexStar(i) } /> )
}
var indexStar = (index)=> {
    setRating(index+1)
   }


var myGlobalRating= Math.round(props.globalRating)
if(viewclick === false){
  myGlobalRating= Math.round((myRatingMovie+props.globalRating)/2)
}

var tabGlobalRating = []
  for(let i=0;i<10;i++){
      var color = {}
      if(i<myGlobalRating){
          color = {color: '#f1c40f'}
      }
      tabGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar}  /> )
  }
var countRating= props.globalCountRating

if(viewclick === false){
  countRating= countRating+1
}

  

  return (
    <Col xs="12" lg="6" xl="4">
    <Card style={{marginBottom:30, borderRadius:20}} className='cardBackground'>
    <CardImg top src={props.movieImg} alt={props.movieName} style={{borderTopLeftRadius:20, borderTopRightRadius:20}}/>
    <CardBody>
        <p>Like<FontAwesomeIcon style={colorLike} onClick={ ()=>handleClick() } icon={faHeart} /></p>
        <p>Nombre de vues  <FontAwesomeIcon icon={faVideo} style={colorView} onClick={ ()=>handleClick2() }/> <Badge color="secondary">{countWatchMovie}</Badge></p>
        <p>Mon avis 
        {myRating}
        <ButtonGroup style={{paddingLeft:"5px"}} size="sm">
            <Button onClick={ ()=>handleClick3() }color="secondary">-</Button>
            <Button onClick={ ()=>handleClick4() }color="secondary">+</Button>
        </ButtonGroup>
        </p>
        <p>Moyenne
        {tabGlobalRating}
       ({countRating})
        </p>
        <CardTitle style={{fontWeight:"bold"}}>{props.movieName}</CardTitle>
        <CardText>{props.movieDesc.slice(0,80)+"..."}</CardText>
    </CardBody>
    </Card>
    </Col>


  );
}

export default Movie;
