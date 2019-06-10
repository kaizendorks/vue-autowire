import components from './components';
import views from './views';
import routes from './routes';
import filters from './filters';
import directives from './directives';

// Default conventions combine them all
export default Object.assign({},
  routes,
  components,
  views,
  filters,
  directives
);
