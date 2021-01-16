import Navigate from './Navigate';
import "../App.css"


const Layout = ({ title = "Title", description = "Description", children, className }) => (
    <div>
      <Navigate />
      <div className="jumbotron">
        <h2>{ title }</h2>
        <p className="lead">{ description }</p>
      </div>
      <div className={ className }>{ children }</div>
    </div>
)

export default Layout;
