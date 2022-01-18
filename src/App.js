import logo from './logo.svg';
import './App.css';
const request= require("../src/utility/request");

// JSON.parse(localStorage.getItem('IAMuser')).permissions
function App() {
  let pages= {
    "pg01": "https://www.google.com/search?q=admin&rlz=1C1CHBD_enIN969IN969&oq=admin&aqs=chrome..69i57j0i67i433l2j0i67l2j0i67i433j0i20i263i433i512j0i67l2j0i433i512.3225j0j9&sourceid=chrome&ie=UTF-8",
    "pg02": "https://www.google.com/search?q=bi+analyst&rlz=1C1CHBD_enIN969IN969&sxsrf=AOaemvIo-qgRfiiQYNP_CxPnGNfXODCNDw%3A1642505690568&ei=2qXmYdqdIvrG4-EPuYOKoAQ&oq=BI+a&gs_lcp=Cgdnd3Mtd2l6EAEYADIECAAQQzIECAAQQzIECAAQQzIECAAQQzIECAAQQzIECAAQQzIICAAQgAQQsQMyBAgAEEMyBAgAEEMyBAgAEEM6BwgAEEcQsAM6BwgAELADEEM6CggAEOQCELADGAA6EgguEMcBENEDEMgDELADEEMYAToECCMQJzoLCC4QgAQQsQMQgwE6DgguEIAEELEDEMcBEKMCOgUIABCABDoICC4QsQMQgwE6BwgAELEDEEM6BwgAEIAEEApKBAhBGABKBAhGGAFQ2U5YmFpgoGpoB3ACeACAAYsBiAGHBZIBAzAuNZgBAKABAcgBE8ABAdoBBggAEAEYCdoBBggBEAEYCA&sclient=gws-wiz",
    "pg03": "https://www.google.com/search?q=data+scientist&rlz=1C1CHBD_enIN969IN969&sxsrf=AOaemvJVnT6PwpZ7EjtzlKB4wB7IARSEkQ%3A1642505527314&ei=N6XmYZbHEvaP4-EPhLu-iA8&oq=data+scien&gs_lcp=Cgdnd3Mtd2l6EAMYADIICAAQgAQQsQMyCAgAEIAEELEDMgUIABCABDIFCAAQgAQyCAgAEIAEELEDMggIABCABBCxAzIFCAAQgAQyBQgAEIAEMggIABCABBCxAzIICAAQgAQQsQM6BwgAEEcQsAM6BwgAELADEEM6EgguEMcBENEDEMgDELADEEMYADoSCC4QxwEQowIQyAMQsAMQQxgAOgQIIxAnOgUIABCRAjoOCC4QgAQQsQMQxwEQowI6CwguEIAEELEDEIMBOgQIABBDOgoIABCxAxCDARBDOgcIABCxAxBDOgsILhDHARDRAxCRAjoLCC4QgAQQxwEQ0QM6DgguEIAEELEDEMcBENEDOggIABCxAxCRAjoFCAAQsQM6CggAELEDELEDEAo6BAgAEAo6BwgAELEDEApKBAhBGABKBAhGGABQooUDWNSXA2CjnQNoBnACeAGAAaoBiAHoCpIBAzMuOZgBAKABAcgBC8ABAdoBBAgAGAg&sclient=gws-wiz",
    "pg04": "https://www.google.com/search?q=data+analyst&rlz=1C1CHBD_enIN969IN969&sxsrf=AOaemvLOOmiW41fzON9eLOlur_YZ8aajvg%3A1642505664373&ei=wKXmYY6cFuuD4-EP4MiKsAI&ved=0ahUKEwiO_Km1mrv1AhXrwTgGHWCkAiYQ4dUDCA4&uact=5&oq=data+analyst&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEJECMgUIABCRAjIICAAQsQMQkQIyCAgAEIAEELEDMgoIABCABBCHAhAUMgUIABCABDIHCAAQgAQQCjIICAAQgAQQsQMyBQgAEIAEMgUIABCABDoHCAAQRxCwAzoHCAAQsAMQQzoLCC4QgAQQxwEQ0QNKBAhBGABKBAhGGABQzAJY6wxglhdoAnACeACAAXeIAfQFkgEDMi41mAEAoAEByAEKwAEB&sclient=gws-wiz"
  }
  let handleRedirect= (e)=>{
    e.preventDefault();
    let permissions=JSON.parse(localStorage.getItem('IAMuser')).permissions;
    console.log(e.target.value);
    let permissions_allowed= permissions[e.target.value];
    if(!permissions_allowed){
      alert("You are not allowed to visit "+e.target.value)
    }
    else{
      let redirect_link=pages[e.target.value];
      window.location.href = redirect_link;
    }
    return;
  }
  let handleLogIn=async (e)=>{
    e.preventDefault();
    console.log(e.target.id.value);
    console.log(e.target.password.value);

    let x= await request("/users/login",{
      userid:e.target.id.value,
      password:e.target.password.value
    });

    if(x.status==="400"){
      alert(x.status_description);
    }
    else{
      localStorage.setItem("IAMuser", JSON.stringify(x));
    }
  }
  let handleSignUp=async (e)=>{
    e.preventDefault();
    console.log(e.target.id.value);
    console.log(e.target.password.value);
    console.log(e.target.role.value);

    let x= await request("/users/signup",{
      userid:e.target.id.value,
      password:e.target.password.value,
      user_type: e.target.role.value
    });

    if(x.status==="400"){
      alert(x.status_description);
    }
    else{
      localStorage.setItem("IAMuser", JSON.stringify(x));
    }
  }

  return (
    <div className="App">
      <div className="sign-in">
        <h1>Login</h1>
          <form className="sign-in-form" onSubmit={handleLogIn}>
            <input name="id" type="email" placeholder="Enter ID"></input>
            <input name="password" type="password" placeholder="Enter Password"></input>
            <button type="submit">Login</button>
          </form>
      </div>
      
      <div className="sign-up">
        <h1>Sign-up</h1>
          <form className="sign-in-form" onSubmit={handleSignUp}>
            <input name="id" type="email" placeholder="Enter your email ID"></input>
            <input name="password" type="password" placeholder="Choose Password"></input>
            <select name="role">
              <option value="" disabled selected>Select Role</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Data Analysist">Data Analysist</option>
              <option value="BI Analyst">BI Analyst</option>
              <option value="Admin">Admin</option>
            </select>
            <button type="submit">Sign-up</button>
          </form>
      </div>

      <div className="Goto page">
        <h1>Goto Page</h1>
          <button value="pg01" onClick={handleRedirect}>PG-01</button>
          <button value="pg02" onClick={handleRedirect}>PG-02</button>
          <button value="pg03" onClick={handleRedirect}>PG-03</button>
          <button value="pg04" onClick={handleRedirect}>PG-04</button>
      </div>
    </div>
  );
}

export default App;
