import { RouterProvider , createBrowserRouter } from 'react-router-dom';

import AuthenticationContextProvider from './store/AuthenticationContext';
import HomePage from './pages/Home';
import Introduction from './components/Introduction';
import BlogsLayout from './pages/BlogsLayout'
import CategoryBlogs, {loader as categoryBlogLoader} from './pages/CategoryBlogs';
import './App.css'
import Blogs,{loader as blogLoader} from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';
import SignupForm from './pages/SignupForm'
import LoginForm from './pages/LoginForm';
import BlogLandingPage , {loader as blogLandingLoader} from './components/BlogLanding';
import EditBlogForm from './pages/EditBlogForm';
import { Flip, toast } from 'react-toastify';
import { useEffect } from 'react';

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
              element: <Blogs />,
            },
            {
              path: ':category',
              element: <CategoryBlogs />,
              loader: categoryBlogLoader,
            },
            {
              path: 'post',
              element: <CreateBlog />,
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

  useEffect(()=>{
    toast.info('The server may take some time to respond. Please wait patiently 😊',{
      position: 'top-center',
      theme:'colored',
      autoClose: 4000,
      pauseOnHover: false,
      closeOnClick: true,
      transition: Flip
    })
  })

  return(
    <AuthenticationContextProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </AuthenticationContextProvider>
  );
}

export default App
