import React from 'react';

class Signup extends React.Component {

  constructor(props){
    super(props);
    this.state={
            email: '',
            name:'',
            password:''
    }
  }

  nameChangeHandler=(event)=>{
    this.setState({name: event.target.value})
  }

  emailChangeHandler=(event)=>{
    this.setState({email: event.target.value})
  }

  pwdChangeHandler=(event)=>{
    this.setState({password: event.target.value})
  }

  submitChangeHandler=()=>{
    fetch('http://localhost:3001/register', {
      method:'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response=>response.json())
    .then(user=>{
      if(user.id){
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })
   
  }

  render(){
    const {onRouteChange}=this.props
    return (
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw7 center">
          <main className="pa4 black-80">
            <div className="measure ">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign up</legend>
              <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                  <input
                  onChange={this.nameChangeHandler} 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90" 
                  type="name" 
                  name="name"  
                  id="name"/>
                </div>
  
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input 
                  onChange={this.emailChangeHandler}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address"/>
                </div>
  
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input
                  onChange={this.pwdChangeHandler} 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password"/>
                </div>
              </fieldset>
              <div className="">
                <input 
                onClick={this.submitChangeHandler} 
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" 
                type="submit" 
                value="Sign in"/>
              </div>
            </div>
          </main>
      </article>
    )

  }
  
}

export default Signup;