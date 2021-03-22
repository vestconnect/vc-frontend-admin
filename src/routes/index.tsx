import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import Login from '../pages/Login';
import Providers from '../pages/Providers';
import ProviderDetail from '../pages/ProviderDetail';
import ProviderProducts from '../pages/ProviderProducts';
import UserProducts from '../pages/UsersProducts';
import Contents from '../pages/Contents';
import ContentPhotos from '../pages/ContentPhotos';
import ContentVideos from '../pages/ContentVideos';
import Home from '../pages/Home';
import Users from '../pages/Users';
import Administrators from '../pages/Administrators';
import Settings from '../pages/Settings';
import Forgot from '../pages/Forgot';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/forgot" exact component={Forgot} />
            <Route path="/home" exact component={Home} isPrivate={true} />
            <Route path="/users" exact component={Users} isPrivate={true} />
            <Route path="/administrators" exact component={Administrators} isPrivate={true} />
            <Route path="/settings" exact component={Settings} isPrivate={true} />
            <Route path="/providers" exact component={Providers} isPrivate={true} />
            <Route path="/provider/detail/:id" exact component={ProviderDetail} isPrivate={true} />
            <Route path="/provider/products/:id" exact component={ProviderProducts} isPrivate={true} />
            <Route path="/providers/users/:id" exact component={UserProducts} isPrivate={true} />
            <Route path="/contents/:id" exact component={Contents} isPrivate={true} />
            <Route path="/productscontentphotos/:id" exact component={ContentPhotos} isPrivate={true} />
            <Route path="/productscontentvideos/:id" exact component={ContentVideos} isPrivate={true} />
        </Switch>
    );
}

export default Routes;