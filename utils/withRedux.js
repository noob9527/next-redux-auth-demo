import withRedux from 'next-redux-wrapper';
import configureStore from '@/config/configureStore';

export default withRedux.bind(null, configureStore);
