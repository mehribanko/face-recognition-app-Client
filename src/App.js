import React, {Component, useState} from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Logo from './components/logo/Logo';
import Imagelink from './components/imagelink/Imagelink';
import Rank from './components/rank/Rank';
import Particles from "react-tsparticles";
import FaceRecognition from './components/facedetec/FaceRecognition';
import Signin from './components/Signin/Signin';
import Signup from './components/signup/Signup';



const particlesOptions={
    fpsLimit: 400,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.5,
          size: 40,
        },
        push: {
          quantity: 2,
        },
        repulse: {
          distance: 100,
          duration: 0.2,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 120,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 40,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        random: true,
        value: 5,
      },
    },
    detectRetina: false,
};


const firstState={
    input:'',
    imageUrl:'',
    box:{},
    route: "signin",
    isSignedIn:false,
    user: {
      id:'',
      email: '',
      name:'',
      joined: ''
    }
  }

class App extends Component {

  constructor(){
    super();
    this.state=firstState;
    }
  

  loadUser=(data)=>{
    this.setState({ user:{
        id: data.id,
        email: data.email,
        name:data.name,
        entries: data.entries,
        joined: data.joined
     }
    })
  }

onInputChange=(event)=>{
 this.setState({input: event.target.value});
}

calcFaceLocation=(data)=>{
  const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
  const image=document.getElementById("inputimage");

  // because height and width value is going to be a string, we need to convert it to a number, so that we can do calculations on them
  const width=Number(image.width); 
  const height=Number(image.height);
// we will return an object which will shows a box around a person's face
  return {

    leftCol: clarifaiFace.left_col*width,
    topRow: clarifaiFace.top_row*height,
    rightCol: width-(clarifaiFace.right_col*width),
    bottomRow: height-(clarifaiFace.bottom_row*height)

  }
}


 displayFaceBox=(box)=>{
  this.setState({box: box})
}

onSubmit =()=> {

  this.setState({imageUrl: this.state.input});
  
  fetch("http://localhost:3001/getImageUrl", {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      input: this.state.input
    })
  })
  .then(response=> response.json())
    .then(response=> {
      if(response){
        fetch("http://localhost:3001/image", {
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response=>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(err=> console.log(err))
      }
        this.displayFaceBox(this.calcFaceLocation(response))
    }) 
    .catch(console.log);
}

  routeChangeHandler =(route)=>{
    if(route=="signout"){
      this.setState(firstState)
    }else if(route=="home"){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

render(){
  const {isSignedIn, route, box, imageUrl}=this.state; 
    return(
      <div className='App'>
       <Particles options={particlesOptions}/>
       <Navbar isSignedIn={isSignedIn} onRouteChange={this.routeChangeHandler}/>
       <Logo/>
       {route=="home"
        ?<div><Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <Imagelink onInputChange={this.onInputChange} 
        onSubmit={this.onSubmit}/>
        <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
        :(
          route=="signin"
          ?<Signin loadUser={this.loadUser} onRouteChange={this.routeChangeHandler}/>
          :<Signup loadUser={this.loadUser} onRouteChange={this.routeChangeHandler}/>
        )
         
       }
      </div>
    );
  }
}

export default App;