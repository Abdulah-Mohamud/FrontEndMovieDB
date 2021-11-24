import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container , Paper , Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formRoot: {
    '& > *': {
      margin: theme.spacing(1),
      //width: theme.spacing(32),
      //height: theme.spacing(16)
    }
  },

  databaseContent: {
    '& > *': {
      margin: theme.spacing(1),
      
    }
  },

}));


const searchBar = document.getElementById('searchBar');
let result = [];
console.log(result)


function Movie() {
    const paperStyle={padding:'50px 20px', width:600,margin:"10px auto"}
    const[film_id,setFilm_id]=useState(0)
    const[title,setTitle]=useState('')
    const[description,setDescription]=useState('')
    const[length,setLength]=useState(0)
    const[language_id,setLanguage_id]=useState(0)
    const[movies,setMovies]=useState([])
    const classes = useStyles();

  const handleClick=(e)=>{
    e.preventDefault()
    const movie={film_id:film_id,title:title,description:description,length:length,language_id:language_id}
    console.log(movie)
    fetch("http://localhost:8080/myNetflix/addmovie",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(movie)

      

  }).then(()=>{
    console.log("New Movie added")
    fetch("http://localhost:8080/myNetflix/movies")
    .then(res=>res.json())
    .then((result)=>{
      setMovies(result);
    })
  })
}

// aws database with live instance http://3.144.102.241:8080/myNetflix/movies
//get all
useEffect(()=>{
  fetch("http://localhost:8080/myNetflix/movies")
  .then(res=>res.json())
  .then((result)=>{
    setMovies(result);
  }
)

//delete film
// useEffect(() => {
//   fetch('http://localhost:8080/myNetflix/deletemovies', { method: 'DELETE' })
//       .then(() => setStatus('Delete successful'));

// }, []);

},[])
  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"Black"}}>Add New Movie</h1>
    {/* <form classname={classes.searchBarRoot}>
      <TextField type="text" name="title" id="title" placeholder="Search..." 
      value="searchTitle"
      onChange={(c)=>setTitle(c.target.value)}
      />
    </form> */}

    <form className={classes.formRoot} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Film_id" variant="outlined" fullWidth 
      value={film_id}
      onChange={(e)=>setFilm_id(e.target.value)}
      />
      <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth 
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />
      <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      />
      <TextField id="outlined-basic" label="Length" variant="outlined" fullWidth
      value={length}
      onChange={(e)=>setLength(e.target.value)}
      />      
      <TextField id="outlined-basic" label="Language ID" variant="outlined" fullWidth
      value={language_id}
      onChange={(e)=>setLanguage_id(e.target.value)}
      />
      
      <Button variant="contained" color="secondary" onClick={handleClick}>
      Submit
      </Button>
    </form>
   
    </Paper>
    <h1>Movies</h1>

    <Paper className={classes.databaseContent} elevation={3} style={paperStyle}>

      {movies.map(movie=>(
        <Paper elevation={6} style={{margin:"15px",padding:"15px", textAlign:"left"}} key={movie.film_id}>
         Film_id:{movie.film_id}<br/>
         Title:{movie.title}<br/>
         Description:{movie.description}<br />
         Length:{movie.length}<br/> 
         Language_id:{movie.language_id}

        </Paper>
      ))
}


    </Paper>



    </Container>
  );
}

export default Movie;