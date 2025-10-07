import AdminJS from 'adminjs';
import AdminJSFastify from '@adminjs/fastify';
import * as AdminJSMongoose from '@adminjs/mongoose';
import * as Models from '../models/index.js';
import { authenticate, COOKIE_PASSWORD, sessionStore } from './config.js';
import { dark, light, noSidebar } from '@adminjs/themes';

AdminJS.registerAdapter(AdminJSMongoose);

export const admin = new AdminJS({
  resources: [
    {
      resource: Models.Customer,
      options: {
        listProperties: ['phone', 'role', 'isActivated'],
        // filterProperties: ['email', 'role'],
        filterProperties: ['role', 'isActivated'],
      },
    },
    { resource: Models.Branch },
    { resource: Models.Product },
    { resource: Models.Category },
    { resource: Models.Order },
    { resource: Models.Counter },
    { resource: Models.DeliveryPartner },
    { resource: Models.Admin },
  ],
  branding: {
    companyName: 'Grocery Delivery App',
    withMadeWithLove: false,
  },
  defaultTheme: dark.id,
  availableThemes: [dark, light, noSidebar],
  rootPath: '/admin',
});

export const buildAdminRouter = async (app) => {
  const adminRouter = await AdminJSFastify.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: COOKIE_PASSWORD, 
    },
    app,
    {
      store: sessionStore,
      saveUninitialized: false, 
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
    }
  );

  
};
