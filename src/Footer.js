import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return(
     <footer>
        <h4 className>&copy; Best Books</h4>
     </footer>
    );
  }
}

export default Footer;
