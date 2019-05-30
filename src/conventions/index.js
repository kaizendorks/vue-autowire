import components from './components';
import views from './views';
import routes from './routes';

// Default conventions combine them all
export default Object.assign({},
  routes,
  components,
  views,
);
