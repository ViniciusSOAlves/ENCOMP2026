import classes from "./Header.module.css"


const Header = () => {
  return (
    
    <nav className={classes.navbar}>
      <div className={classes.containerLogo}>
        <img className={classes.imagem_logo} src="/Logo.png" alt="Logo"/>
        <div className={classes.escritoEncomp}>
          <p>ENCOMP</p>
        </div>
       </div>
      
        <div className={classes.navButtons}>
          <button>Componente 1</button>
          <button>Componente 2</button>
          <button>Componente 3</button>
        </div>
        
    </nav>
  );
}

export default Header