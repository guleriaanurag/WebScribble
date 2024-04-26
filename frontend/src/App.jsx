import { useEffect } from 'react';
import './App.css'

// package imports
import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import { Flip, toast } from 'react-toastify';

// context imports
import AuthenticationContextProvider from './store/AuthenticationContext';
import ModalContextProvider from './store/ModalContextProvider';

// components import
import HomePage from './pages/Home';
import Introduction from './components/Introduction';
import BlogsLayout from './pages/BlogsLayout'
import CategoryBlogs, {loader as categoryBlogLoader} from './pages/CategoryBlogs';
import Blogs,{loader as blogLoader} from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';
import SignupForm from './pages/SignupForm'
import LoginForm from './pages/LoginForm';
import BlogLandingPage , {loader as blogLandingLoader} from './components/BlogLanding';
import EditBlogForm from './pages/EditBlogForm';
import CommentModal from './components/CommentModal';
import PageNotFound from './pages/NotFound';
import CommentEditModal, {loader as commentEditModalLoader} from './components/CommentEditModal';

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
              path: 'blog/:blogId',
              loader: blogLandingLoader,
              id: 'landing-loader',
              children:[
                {
                  index: true,
                  element: <BlogLandingPage />,
                  loader: blogLandingLoader,
                },
                {
                  path: 'edit-blog',
                  element: <EditBlogForm />
                },
                {
                  path: 'comment',
                  element: <CommentModal />
                },
                {
                  path: 'edit-comment/:commentId',
                  element: <CommentEditModal />,
                  loader: commentEditModalLoader
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
    },
    {
      path: '*',
      element: <PageNotFound />
    }
  ])

  // this toast is there because the server is deployed on a free tier service and takes a lot of inital time to start
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
      <ModalContextProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </ModalContextProvider>
    </AuthenticationContextProvider>
  );
}

export default App
