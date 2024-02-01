import { RouterProvider , createBrowserRouter } from 'react-router-dom';

import AuthenticationContextProvider from './store/AuthenticationContext';
import HomePage from './pages/Home';
import Introduction from './components/Introduction';
import BlogsLayout from './pages/BlogsLayout'
import CategoryBlogs, {loader as categoryBlogLoader} from './pages/CategoryBlogs';
import './App.css'
import Blogs,{loader as blogLoader} from './pages/Blogs';
import CreateBlog from './components/CreateBlog';
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm';
import BlogLandingPage , {loader as blogLandingLoader} from './components/BlogLanding';
import EditBlogForm from './components/EditBlogForm';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      children: [
        {
          index:true,
          element: <Introduction />
        },
        {
          path: 'blogs',
          element: <BlogsLayout />,
          children: [
            {
              index: true,
              loader: blogLoader,
              element: <Blogs />
            },
            {
              path: ':category',
              element: <CategoryBlogs />,
              loader: categoryBlogLoader
            },
            {
              path: 'post',
              element: <CreateBlog />,
              // action: createBlogAction
            },
            {
              path: 'blog/:id',
              loader: blogLandingLoader,
              id: 'landing-loader',
              children:[,
                {
                  index: true,
                  element: <BlogLandingPage />,
                  loader: blogLandingLoader
                },
                {
                  path: 'edit-blog',
                  element: <EditBlogForm />
                }
              ]
            },
          ]
        },
        {
          path: 'signup',
          element: <SignupForm />
        },
        {
          path: 'login',
          element: <LoginForm />
        }
      ]
    } 
  ])

  return(
    <AuthenticationContextProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </AuthenticationContextProvider>
  );
}

export default App
