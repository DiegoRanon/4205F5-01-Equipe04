import React, { useState } from "react";
import { Link } from "react-router-dom";



function MainNavigation(props) {

  



  return (

    <React.Fragment>
     {tiroirOuvert && <Backdrop onClick={fermerTiroir} />}
      <SideDrawer show={tiroirOuvert} onClick={fermerTiroir}>

      </SideDrawer> 


      <MainHeader>  

      </MainHeader>
    </React.Fragment>
  );
}

export default MainNavigation;
